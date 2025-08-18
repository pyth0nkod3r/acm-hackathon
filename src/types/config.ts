/**
 * Application configuration types
 */

export interface AppConfig {
  apiBaseUrl: string;
  formEndpoints: {
    registration: string;
    contact: string;
  };
  features: {
    enableAnimations: boolean;
    enableFormValidation: boolean;
  };
}

export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  VITE_API_BASE_URL?: string;
  VITE_API_USERNAME?: string;
  VITE_API_PASSWORD?: string;
}

export interface BuildConfig {
  version: string;
  buildDate: string;
  gitCommit?: string;
}
