/**
 * Service factory and exports
 */

import {
  registrationService,
  RegistrationService,
} from './registrationService';
import { contactService, ContactService } from './contactService';
import { mockAPIService, MockAPIService } from './mockService';
import type { ContactFormData, RegistrationFormData } from '../types/forms';
import type { APIResponse, FormSubmissionResponse } from '../types/api';

// Environment configuration
const isDevelopment = import.meta.env.DEV;
const useMockAPI =
  import.meta.env.VITE_USE_MOCK_API === 'true' || isDevelopment;

/**
 * Form submission service interface
 */
export interface IFormSubmissionService {
  submitRegistration(
    formData: RegistrationFormData
  ): Promise<APIResponse<FormSubmissionResponse>>;
  submitContact(
    formData: ContactFormData
  ): Promise<APIResponse<FormSubmissionResponse>>;
}

/**
 * Real API service implementation
 */
class RealFormSubmissionService implements IFormSubmissionService {
  async submitRegistration(
    formData: RegistrationFormData
  ): Promise<APIResponse<FormSubmissionResponse>> {
    return registrationService.submitRegistration(formData);
  }

  async submitContact(
    formData: ContactFormData
  ): Promise<APIResponse<FormSubmissionResponse>> {
    return contactService.submitContact(formData);
  }
}

/**
 * Mock API service implementation
 */
class MockFormSubmissionService implements IFormSubmissionService {
  async submitRegistration(
    formData: RegistrationFormData
  ): Promise<APIResponse<FormSubmissionResponse>> {
    return mockAPIService.submitRegistration(formData);
  }

  async submitContact(
    formData: ContactFormData
  ): Promise<APIResponse<FormSubmissionResponse>> {
    return mockAPIService.submitContact(formData);
  }
}

/**
 * Service factory that returns appropriate service based on environment
 */
export const createFormSubmissionService = (): IFormSubmissionService => {
  if (useMockAPI) {
    console.log('🔧 Using mock API service for development');
    return new MockFormSubmissionService();
  }

  console.log('🌐 Using real API service');
  return new RealFormSubmissionService();
};

// Export the service instance
export const formSubmissionService = createFormSubmissionService();

// Export individual services for direct use if needed
export { registrationService, contactService, mockAPIService };
export type { RegistrationService, ContactService, MockAPIService };

// Export error logging service
export { errorLogger } from './errorLogger';

// Export utility functions
export const validateFileUpload = (file: File) => {
  return mockAPIService.validateFileUpload(file);
};

/**
 * Service health check
 */
export const checkServiceHealth = async (): Promise<{
  status: 'healthy' | 'unhealthy';
  message: string;
}> => {
  try {
    // For mock service, always return healthy
    if (useMockAPI) {
      return {
        status: 'healthy',
        message: 'Mock API service is running',
      };
    }

    // For real service, we could implement a health check endpoint
    // For now, just return healthy if we can create the service
    const service = createFormSubmissionService();
    if (service) {
      return {
        status: 'healthy',
        message: 'API service is configured',
      };
    }

    return {
      status: 'unhealthy',
      message: 'Failed to initialize API service',
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      message: `Service error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
};
