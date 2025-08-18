/**
 * API configuration and endpoints
 */

import type { AppConfig } from '../types/config';

// Environment variables with fallbacks
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://api.hackathon.africacreativemarket-global.com';
const API_USERNAME = import.meta.env.VITE_API_USERNAME || '';
const API_PASSWORD = import.meta.env.VITE_API_PASSWORD || '';

export const apiConfig: AppConfig = {
  apiBaseUrl: API_BASE_URL,
  formEndpoints: {
    registration: '/api/registration',
    contact: '/api/contact',
  },
  features: {
    enableAnimations: true,
    enableFormValidation: true,
  },
};

export const apiCredentials = {
  username: API_USERNAME,
  password: API_PASSWORD,
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;

// Retry configuration
export const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // Base delay in milliseconds
  retryDelayMultiplier: 2, // Exponential backoff multiplier
};
