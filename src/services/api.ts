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
      'Content-Type': 'application/json',
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
   * Handles HTTP error responses
   */
  private async handleHttpError(response: Response): Promise<APIErrorType> {
    const status = response.status;

    try {
      const errorData = await response.json();

      if (status >= 400 && status < 500) {
        // Client errors (validation, authentication, etc.)
        if (status === 422 && errorData.messages) {
          // Validation errors
          const firstField = Object.keys(errorData.messages)[0];
          if (firstField) {
            const validationError: ValidationError = {
              type: 'validation',
              field: firstField,
              message: errorData.messages[firstField],
            };
            return validationError;
          }
        }

        const serverError: ServerError = {
          type: 'server',
          message: errorData.message || `Client error: ${status}`,
          code: status.toString(),
        };
        return serverError;
      }

      if (status >= 500) {
        // Server errors
        const serverError: ServerError = {
          type: 'server',
          message: errorData.message || `Server error: ${status}`,
          code: status.toString(),
        };
        return serverError;
      }
    } catch {
      // Failed to parse error response
    }

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
  private isAPIError(error: any): error is APIErrorType {
    return (
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
    data?: any
  ): Promise<APIResponse<T>> {
    const requestOptions: RequestInit = {
      method: 'POST',
    };

    if (data) {
      requestOptions.body = JSON.stringify(data);
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
