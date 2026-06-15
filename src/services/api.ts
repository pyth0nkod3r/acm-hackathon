/**
 * Base API service with error handling and retry logic
 */

import type {
  APIResponse,
  APIErrorType,
  NetworkError,
  ServerError,
  ValidationError,
} from '../types/api';
import {
  apiConfig,
  apiCredentials,
  REQUEST_TIMEOUT,
  RETRY_CONFIG,
} from '../config/api';

export class APIService {
  private baseUrl: string;
  private credentials: { username: string; password: string };

  constructor() {
    this.baseUrl = apiConfig.apiBaseUrl;
    this.credentials = apiCredentials;
  }

  /**
   * Makes an HTTP request with retry logic and error handling
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<APIResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    // Set up default headers
    const headers: Record<string, string> = {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers as Record<string, string>),
    };

    // Add basic auth if credentials are provided
    if (this.credentials.username && this.credentials.password) {
      const auth = btoa(
        `${this.credentials.username}:${this.credentials.password}`
      );
      headers['Authorization'] = `Basic ${auth}`;
    }

    const requestOptions: RequestInit = {
      ...options,
      headers,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT),
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw await this.handleHttpError(response);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      // Handle timeout and network errors
      if (error instanceof DOMException && error.name === 'TimeoutError') {
        const networkError: NetworkError = {
          type: 'network',
          message: 'Request timeout',
        };

        if (retryCount < RETRY_CONFIG.maxRetries) {
          return this.retryRequest(endpoint, options, retryCount + 1);
        }

        return {
          success: false,
          message: networkError.message,
        };
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        const networkError: NetworkError = {
          type: 'network',
          message: 'Network connection failed',
        };

        if (retryCount < RETRY_CONFIG.maxRetries) {
          return this.retryRequest(endpoint, options, retryCount + 1);
        }

        return {
          success: false,
          message: networkError.message,
        };
      }

      // Re-throw API errors
      if (this.isAPIError(error)) {
        if (
          error.type === 'server' &&
          'code' in error &&
          typeof error.code === 'string' &&
          Number(error.code) >= 500 &&
          retryCount < RETRY_CONFIG.maxRetries
        ) {
          return this.retryRequest(endpoint, options, retryCount + 1);
        }

        return {
          success: false,
          message: error.message,
        };
      }

      // Unknown error
      return {
        success: false,
        message: 'An unexpected error occurred',
      };
    }
  }

  /**
   * Handles HTTP error responses and extracts a helpful message
   */
  private async handleHttpError(response: Response): Promise<APIErrorType> {
    const status = response.status;

    // Try to parse the JSON body (it might be empty or not JSON at all)
    let errorData: unknown = {};
    try {
      errorData = await response.json();
    } catch {
      /* ignore – leave errorData as empty object */
    }

    // Extract the most useful message string we can find
    const pickMessage = (data: unknown, fallback: string): string => {
      if (!data) return fallback;
      if (typeof data === 'string') return data;
      if (typeof (data as any).message === 'string')
        return (data as any).message;
      if (typeof (data as any).error === 'string') return (data as any).error;
      if (typeof (data as any).detail === 'string') return (data as any).detail;

      // Otherwise look for the first string value in the object
      const firstString = Object.values(data as Record<string, unknown>).find(
        v => typeof v === 'string'
      );
      return (firstString as string) ?? fallback;
    };

    // 4xx – client errors (validation, authentication, etc.)
    if (status >= 400 && status < 500) {
      // 422 – validation errors with field messages
      if (
        status === 422 &&
        typeof errorData === 'object' &&
        errorData !== null &&
        'messages' in errorData
      ) {
        const firstField = Object.keys((errorData as any).messages)[0];
        if (firstField) {
          const validationError: ValidationError = {
            type: 'validation',
            field: firstField,
            message: (errorData as any).messages[firstField],
          };
          return validationError;
        }
      }

      const serverError: ServerError = {
        type: 'server',
        message: pickMessage(errorData, `Client error: ${status}`),
        code: status.toString(),
      };
      return serverError;
    }

    // 5xx – server errors
    if (status >= 500) {
      const serverError: ServerError = {
        type: 'server',
        message: pickMessage(errorData, `Server error: ${status}`),
        code: status.toString(),
      };
      return serverError;
    }

    // Fallback – should rarely be reached
    const serverError: ServerError = {
      type: 'server',
      message: `HTTP error: ${status}`,
      code: status.toString(),
    };
    return serverError;
  }

  /**
   * Retries a request with exponential backoff
   */
  private async retryRequest<T>(
    endpoint: string,
    options: RequestInit,
    retryCount: number
  ): Promise<APIResponse<T>> {
    const delay =
      RETRY_CONFIG.retryDelay *
      Math.pow(RETRY_CONFIG.retryDelayMultiplier, retryCount - 1);

    await new Promise(resolve => setTimeout(resolve, delay));

    return this.makeRequest<T>(endpoint, options, retryCount);
  }

  /**
   * Type guard to check if an error is an API error
   */
  private isAPIError(error: unknown): error is APIErrorType {
    return Boolean(
      error &&
        typeof error === 'object' &&
        'type' in error &&
        'message' in error
    );
  }

  /**
   * Makes a GET request
   */
  protected async get<T>(endpoint: string): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'GET' });
  }

  /**
   * Makes a POST request
   */
  protected async post<T>(
    endpoint: string,
    data?: unknown
  ): Promise<APIResponse<T>> {
    const requestOptions: RequestInit = {
      method: 'POST',
    };

    if (data !== undefined && data !== null) {
      requestOptions.body = JSON.stringify(data);
    } else {
      (requestOptions as any).body = undefined;
    }

    return this.makeRequest<T>(endpoint, requestOptions);
  }

  /**
   * Makes a POST request with FormData (for file uploads)
   */
  protected async postFormData<T>(
    endpoint: string,
    formData: FormData
  ): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let the browser set it with boundary
      },
    });
  }
}
