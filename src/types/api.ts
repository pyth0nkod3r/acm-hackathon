/**
 * API response and error types
 */

export interface APICredentials {
  username: string;
  password: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  messages?: Record<string, string>;
}

export interface FormSubmissionResponse {
  id: string;
  status: 'submitted' | 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface NetworkError {
  type: 'network';
  message: string;
  status?: number;
}

export interface ValidationError {
  type: 'validation';
  field: string;
  message: string;
}

export interface ServerError {
  type: 'server';
  message: string;
  code?: string;
}

export type APIErrorType = NetworkError | ValidationError | ServerError;
