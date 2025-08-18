/**
 * Mock API service for development and testing
 */

import type { ContactFormData, RegistrationFormData } from '../types/forms';
import type { APIResponse, FormSubmissionResponse } from '../types/api';

export class MockAPIService {
  private simulateNetworkDelay(): Promise<void> {
    const delay = Math.random() * 1000 + 500; // 500-1500ms delay
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  private generateMockId(): string {
    return `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Mock registration form submission
   */
  async submitRegistration(
    formData: RegistrationFormData
  ): Promise<APIResponse<FormSubmissionResponse>> {
    await this.simulateNetworkDelay();

    // Simulate random failures for testing
    if (Math.random() < 0.1) {
      // 10% chance of failure
      return {
        success: false,
        message: 'Mock server error for testing',
      };
    }

    // Simulate validation errors for specific test cases
    if (formData.teamName.toLowerCase().includes('test-error')) {
      return {
        success: false,
        message: 'Validation failed',
        messages: {
          teamName: 'Team name cannot contain "test-error"',
        },
      };
    }

    const mockResponse: FormSubmissionResponse = {
      id: this.generateMockId(),
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: mockResponse,
      message: 'Registration submitted successfully',
    };
  }

  /**
   * Mock contact form submission
   */
  async submitContact(
    formData: ContactFormData
  ): Promise<APIResponse<FormSubmissionResponse>> {
    await this.simulateNetworkDelay();

    // Simulate random failures for testing
    if (Math.random() < 0.05) {
      // 5% chance of failure
      return {
        success: false,
        message: 'Mock network error for testing',
      };
    }

    // Simulate validation errors for specific test cases
    if (formData.email.includes('test-error')) {
      return {
        success: false,
        message: 'Validation failed',
        messages: {
          email: 'Email cannot contain "test-error"',
        },
      };
    }

    const mockResponse: FormSubmissionResponse = {
      id: this.generateMockId(),
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: mockResponse,
      message: 'Message sent successfully',
    };
  }

  /**
   * Mock file upload validation
   */
  validateFileUpload(file: File): { isValid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/gif',
    ];

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File size must be less than 10MB',
      };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error:
          'File type not supported. Please upload PDF, DOC, DOCX, or image files.',
      };
    }

    return { isValid: true };
  }
}

// Export singleton instance
export const mockAPIService = new MockAPIService();
