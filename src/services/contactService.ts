/**
 * Contact form submission service
 */

import { APIService } from './api';
import type { ContactFormData } from '../types/forms';
import type { APIResponse, FormSubmissionResponse } from '../types/api';
import { apiConfig } from '../config/api';

export class ContactService extends APIService {
  /**
   * Submits contact form data
   */
  async submitContact(
    formData: ContactFormData
  ): Promise<APIResponse<FormSubmissionResponse>> {
    try {
      // Format and validate form data before submission
      const formattedData = this.formatContactData(formData);

      // Validate required fields
      const validationResult = this.validateContactData(formattedData);
      if (!validationResult.isValid) {
        return {
          success: false,
          message: validationResult.errors[0]?.message || 'Validation failed',
          messages: validationResult.errors.reduce(
            (acc, error) => {
              acc[error.field] = error.message;
              return acc;
            },
            {} as Record<string, string>
          ),
        };
      }

      // Submit form data
      return this.post<FormSubmissionResponse>(
        apiConfig.formEndpoints.contact,
        formattedData
      );
    } catch {
      return {
        success: false,
        message: 'Failed to submit contact form',
      };
    }
  }

  /**
   * Formats contact data for API submission
   */
  private formatContactData(data: ContactFormData): ContactFormData {
    return {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    };
  }

  /**
   * Validates contact form data
   */
  private validateContactData(data: ContactFormData) {
    const errors: Array<{ field: string; message: string }> = [];

    // Name validation
    if (!data.name || data.name.length < 2) {
      errors.push({
        field: 'name',
        message: 'Name must be at least 2 characters long',
      });
    }

    if (data.name.length > 100) {
      errors.push({
        field: 'name',
        message: 'Name must be less than 100 characters',
      });
    }

    // Email validation
    if (!data.email) {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!this.isValidEmail(data.email)) {
      errors.push({
        field: 'email',
        message: 'Please enter a valid email address',
      });
    }

    // Subject validation
    if (!data.subject || data.subject.length < 5) {
      errors.push({
        field: 'subject',
        message: 'Subject must be at least 5 characters long',
      });
    }

    if (data.subject.length > 200) {
      errors.push({
        field: 'subject',
        message: 'Subject must be less than 200 characters',
      });
    }

    // Message validation
    if (!data.message || data.message.length < 10) {
      errors.push({
        field: 'message',
        message: 'Message must be at least 10 characters long',
      });
    }

    if (data.message.length > 2000) {
      errors.push({
        field: 'message',
        message: 'Message must be less than 2000 characters',
      });
    }

    // Check for spam-like content
    if (
      this.containsSpamContent(data.message) ||
      this.containsSpamContent(data.subject)
    ) {
      errors.push({
        field: 'message',
        message: 'Message contains inappropriate content',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validates email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Basic spam content detection
   */
  private containsSpamContent(text: string): boolean {
    const spamKeywords = [
      'viagra',
      'casino',
      'lottery',
      'winner',
      'congratulations',
      'click here',
      'free money',
      'make money fast',
      'work from home',
      'guaranteed',
    ];

    const lowerText = text.toLowerCase();
    return spamKeywords.some(keyword => lowerText.includes(keyword));
  }
}

// Export singleton instance
export const contactService = new ContactService();
