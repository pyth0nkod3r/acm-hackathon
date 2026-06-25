import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from 'axios';
import type { ApiResponse } from './apiType';

const USERNAME = import.meta.env.VITE_API_USERNAME || 'admin';
const PASSWORD = import.meta.env.VITE_API_PASSWORD || 'secret';
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://api.africacreativemarketglobal.com';
const TIMEOUT = 10000; // 10 seconds timeout

// Create public axios instance
const publicApiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`,
  },
});

// Response interceptor for publicApiClient
publicApiClient.interceptors.response.use(
  (response: AxiosResponse) => ({
    ...response,
    data: {
      success: true,
      data: response.data,
      statusCode: response.status,
    } as ApiResponse<unknown>,
  }),
  (error: AxiosError) => {
    return Promise.reject({
      success: false,
      error: error.response?.status || 'Network Error',
      message: error.response?.data || error.message,
      statusCode: error.response?.status,
    } as ApiResponse<never>);
  }
);

// Simplified API service for public POST requests with FormData
export const apiService = {
  async publicPost<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await publicApiClient.post<ApiResponse<T>>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.error(`Error in public POST request to ${url}:`, error);
      throw error;
    }
  },
};
