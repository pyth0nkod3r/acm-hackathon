/**
 * API Service tests
 * Tests HTTP requests, error handling, retry logic, and authentication
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { APIService } from '../api';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock AbortSignal.timeout
Object.defineProperty(AbortSignal, 'timeout', {
  value: vi.fn().mockImplementation((timeout: number) => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller.signal;
  }),
});

// Mock API configuration
vi.mock('../../config/api', () => ({
  apiConfig: {
    apiBaseUrl: 'https://api.example.com',
  },
  apiCredentials: {
    username: 'testuser',
    password: 'testpass',
  },
  REQUEST_TIMEOUT: 5000,
  RETRY_CONFIG: {
    maxRetries: 3,
    retryDelay: 1000,
    retryDelayMultiplier: 2,
  },
}));

class TestAPIService extends APIService {
  // Expose protected methods for testing
  public testGet<T>(endpoint: string) {
    return this.get<T>(endpoint);
  }

  public testPost<T>(endpoint: string, data?: any) {
    return this.post<T>(endpoint, data);
  }

  public testPostFormData<T>(endpoint: string, formData: FormData) {
    return this.postFormData<T>(endpoint, formData);
  }
}

describe('APIService', () => {
  let apiService: TestAPIService;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    apiService = new TestAPIService();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('GET requests', () => {
    it('makes successful GET request', async () => {
      const mockResponse = { data: 'test data' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await apiService.testGet('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Basic dGVzdHVzZXI6dGVzdHBhc3M=', // base64 of testuser:testpass
          }),
        })
      );

      expect(result).toEqual({
        success: true,
        data: mockResponse,
      });
    });

    it('handles 404 errors correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: 'Not found' }),
      });

      const result = await apiService.testGet('/nonexistent');

      expect(result).toEqual({
        success: false,
        message: 'Not found',
      });
    });

    it('handles 500 server errors correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: 'Internal server error' }),
      });

      const result = await apiService.testGet('/error');

      expect(result).toEqual({
        success: false,
        message: 'Internal server error',
      });
    });

    it('handles network errors with retry', async () => {
      // First 3 attempts fail with network error
      mockFetch
        .mockRejectedValueOnce(new TypeError('Failed to fetch'))
        .mockRejectedValueOnce(new TypeError('Failed to fetch'))
        .mockRejectedValueOnce(new TypeError('Failed to fetch'))
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ data: 'success after retry' }),
        });

      const resultPromise = apiService.testGet('/retry-test');

      // Advance timers to trigger retries
      await vi.runAllTimersAsync();

      const result = await resultPromise;

      expect(mockFetch).toHaveBeenCalledTimes(4);
      expect(result).toEqual({
        success: true,
        data: { data: 'success after retry' },
      });
    });

    it('gives up after max retries', async () => {
      // All attempts fail
      mockFetch.mockRejectedValue(new TypeError('Failed to fetch'));

      const resultPromise = apiService.testGet('/always-fails');

      await vi.runAllTimersAsync();

      const result = await resultPromise;

      expect(mockFetch).toHaveBeenCalledTimes(4); // Initial + 3 retries
      expect(result).toEqual({
        success: false,
        message: 'Network connection failed',
      });
    });

    it('handles timeout errors', async () => {
      mockFetch.mockRejectedValueOnce(
        new DOMException('Timeout', 'TimeoutError')
      );

      const result = await apiService.testGet('/timeout');

      expect(result).toEqual({
        success: false,
        message: 'Request timeout',
      });
    });
  });

  describe('POST requests', () => {
    it('makes successful POST request with data', async () => {
      const requestData = { name: 'test', email: 'test@example.com' };
      const mockResponse = { id: 1, ...requestData };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await apiService.testPost('/create', requestData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/create',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestData),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );

      expect(result).toEqual({
        success: true,
        data: mockResponse,
      });
    });

    it('makes POST request without data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      const result = await apiService.testPost('/action');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/action',
        expect.objectContaining({
          method: 'POST',
          body: undefined,
        })
      );

      expect(result).toEqual({
        success: true,
        data: { success: true },
      });
    });

    it('handles validation errors (422)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 422,
        json: () =>
          Promise.resolve({
            messages: {
              email: 'Email is required',
              name: 'Name must be at least 2 characters',
            },
          }),
      });

      const result = await apiService.testPost('/validate', {});

      expect(result).toEqual({
        success: false,
        message: 'Email is required',
      });
    });
  });

  describe('FormData POST requests', () => {
    it('makes successful FormData POST request', async () => {
      const formData = new FormData();
      formData.append(
        'file',
        new Blob(['test'], { type: 'text/plain' }),
        'test.txt'
      );
      formData.append('name', 'test file');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 1, filename: 'test.txt' }),
      });

      const result = await apiService.testPostFormData('/upload', formData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/upload',
        expect.objectContaining({
          method: 'POST',
          body: formData,
          headers: expect.not.objectContaining({
            'Content-Type': expect.any(String),
          }),
        })
      );

      expect(result).toEqual({
        success: true,
        data: { id: 1, filename: 'test.txt' },
      });
    });
  });

  describe('Authentication', () => {
    it('includes basic auth header when credentials are provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      });

      await apiService.testGet('/protected');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Basic dGVzdHVzZXI6dGVzdHBhc3M=',
          }),
        })
      );
    });
  });

  describe('Error handling', () => {
    it('handles malformed JSON responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error('Invalid JSON')),
      });

      const result = await apiService.testGet('/malformed');

      expect(result).toEqual({
        success: false,
        message: 'HTTP error: 500',
      });
    });

    it('handles unknown errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Unknown error'));

      const result = await apiService.testGet('/unknown-error');

      expect(result).toEqual({
        success: false,
        message: 'An unexpected error occurred',
      });
    });

    it('handles non-Error exceptions', async () => {
      mockFetch.mockRejectedValueOnce('String error');

      const result = await apiService.testGet('/string-error');

      expect(result).toEqual({
        success: false,
        message: 'An unexpected error occurred',
      });
    });
  });

  describe('Retry logic', () => {
    it('uses exponential backoff for retries', async () => {
      const startTime = Date.now();
      vi.setSystemTime(startTime);

      mockFetch
        .mockRejectedValueOnce(new TypeError('Failed to fetch'))
        .mockRejectedValueOnce(new TypeError('Failed to fetch'))
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ data: 'success' }),
        });

      const resultPromise = apiService.testGet('/backoff-test');

      // First retry after 1000ms
      vi.advanceTimersByTime(1000);
      await Promise.resolve();

      // Second retry after 2000ms (1000 * 2)
      vi.advanceTimersByTime(2000);
      await Promise.resolve();

      const result = await resultPromise;

      expect(result.success).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it('does not retry on client errors (4xx)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ message: 'Bad request' }),
      });

      const result = await apiService.testGet('/bad-request');

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: 'Bad request',
      });
    });

    it('retries on server errors (5xx)', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: () => Promise.resolve({ message: 'Server error' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ data: 'recovered' }),
        });

      const resultPromise = apiService.testGet('/server-error');

      await vi.runAllTimersAsync();

      const result = await resultPromise;

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        success: true,
        data: { data: 'recovered' },
      });
    });
  });

  describe('Request timeout', () => {
    it('includes timeout signal in requests', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      });

      await apiService.testGet('/timeout-test');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      );
    });
  });
});
