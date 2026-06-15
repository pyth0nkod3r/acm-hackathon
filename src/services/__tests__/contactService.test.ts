/**
 * Contact Service tests
 * Tests contact form submission, data formatting, and error handling
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactService } from '../contactService';
import { APIService } from '../api';
import type { ContactFormData } from '../../types/forms';

// Mock the base API service
vi.mock('../api', () => ({
  APIService: class MockAPIService {
    protected post = vi.fn();
  },
}));

// Mock API configuration
vi.mock('../../config/api', () => ({
  apiConfig: {
    formEndpoints: {
      contact: '/api/contact',
    },
  },
}));

describe('ContactService', () => {
  let contactService: ContactService;
  let mockPost: ReturnType<typeof vi.fn>;

  const mockContactData: ContactFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Inquiry about hackathon',
    message: 'I would like to know more about the registration process.',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    contactService = new ContactService();

    // Get reference to the mocked method
    const MockAPIService = APIService as any;
    const instance = new MockAPIService();
    mockPost = instance.post;

    // Replace the service's method with our mock
    contactService['post'] = mockPost;
  });

  describe('submitContact', () => {
    it('submits contact form successfully', async () => {
      mockPost.mockResolvedValue({
        success: true,
        data: { id: '123', status: 'sent' },
      });

      const result = await contactService.submitContact(mockContactData);

      expect(mockPost).toHaveBeenCalledWith('/api/contact', {
        fullName: 'John Doe',
        emailAddress: 'john@example.com',
        subject: 'Inquiry about hackathon',
        message: 'I would like to know more about the registration process.',
      });

      expect(result).toEqual({
        success: true,
        data: { id: '123', status: 'sent' },
      });
    });

    it('maps form fields to API payload correctly', async () => {
      mockPost.mockResolvedValue({
        success: true,
        data: { id: '124', status: 'sent' },
      });

      await contactService.submitContact(mockContactData);

      const submittedPayload = mockPost.mock.calls[0]![1];
      expect(submittedPayload.fullName).toBe('John Doe');
      expect(submittedPayload.emailAddress).toBe('john@example.com');
      expect(submittedPayload.subject).toBe('Inquiry about hackathon');
      expect(submittedPayload.message).toBeDefined();
    });

    it('handles API errors correctly', async () => {
      mockPost.mockResolvedValue({
        success: false,
        message: 'Invalid email format',
      });

      const result = await contactService.submitContact(mockContactData);

      expect(result).toEqual({
        success: false,
        message: 'Invalid email format',
      });
    });

    it('handles network errors correctly', async () => {
      mockPost.mockRejectedValue(new Error('Network error'));

      const result = await contactService.submitContact(mockContactData);

      expect(result).toEqual({
        success: false,
        message: 'Failed to submit contact form',
      });
    });

    it('validates name is too short', async () => {
      const shortNameData = {
        ...mockContactData,
        name: 'A',
      };

      const result = await contactService.submitContact(shortNameData);

      expect(result.success).toBe(false);
      expect(result.message).toMatch(/name/i);
    });

    it('validates email format', async () => {
      const invalidEmailData = {
        ...mockContactData,
        email: 'invalid-email',
      };

      const result = await contactService.submitContact(invalidEmailData);

      expect(result.success).toBe(false);
      expect(result.message).toMatch(/email/i);
    });

    it('validates message is too short', async () => {
      const shortMessageData = {
        ...mockContactData,
        message: 'Hi',
      };

      const result = await contactService.submitContact(shortMessageData);

      expect(result.success).toBe(false);
      expect(result.message).toMatch(/message/i);
    });

    it('validates subject is too short', async () => {
      const shortSubjectData = {
        ...mockContactData,
        subject: 'Hi',
      };

      const result = await contactService.submitContact(shortSubjectData);

      expect(result.success).toBe(false);
      expect(result.message).toMatch(/subject/i);
    });

    it('validates name is required', async () => {
      const noNameData = {
        ...mockContactData,
        name: '',
      };

      const result = await contactService.submitContact(noNameData);

      expect(result.success).toBe(false);
    });

    it('trims whitespace from input fields before submission', async () => {
      const dataWithWhitespace: ContactFormData = {
        name: '  John Doe  ',
        email: '  john@example.com  ',
        subject: '  Test Subject  ',
        message: '  This is a test message with whitespace.  ',
      };

      mockPost.mockResolvedValue({
        success: true,
        data: { id: '125', status: 'sent' },
      });

      await contactService.submitContact(dataWithWhitespace);

      const submittedPayload = mockPost.mock.calls[0]![1];
      expect(submittedPayload.fullName).toBe('John Doe');
      expect(submittedPayload.emailAddress).toBe('john@example.com');
      expect(submittedPayload.subject).toBe('Test Subject');
      expect(submittedPayload.message).toBe(
        'This is a test message with whitespace.'
      );
    });

    it('handles very long messages', async () => {
      const longMessage = 'A'.repeat(5000);
      const longMessageData = {
        ...mockContactData,
        message: longMessage,
      };

      mockPost.mockResolvedValue({
        success: true,
        data: { id: '126', status: 'sent' },
      });

      const result = await contactService.submitContact(longMessageData);

      // Service validates: message must be < 2000 chars, so this should fail
      expect(result.success).toBe(false);
    });

    it('handles special characters in input', async () => {
      const specialCharData: ContactFormData = {
        name: 'José María',
        email: 'jose.maria@example.com',
        subject: 'Inquiry about AfCFTA & Digital Trade',
        message:
          'Hello! I have questions about the hackathon. Can you help? Thanks! 🚀',
      };

      mockPost.mockResolvedValue({
        success: true,
        data: { id: '127', status: 'sent' },
      });

      const result = await contactService.submitContact(specialCharData);

      expect(result.success).toBe(true);
      expect(mockPost).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          fullName: 'José María',
          subject: 'Inquiry about AfCFTA & Digital Trade',
        })
      );
    });

    it('handles concurrent submissions', async () => {
      mockPost.mockResolvedValue({
        success: true,
        data: { id: '128', status: 'sent' },
      });

      const promises = [
        contactService.submitContact(mockContactData),
        contactService.submitContact(mockContactData),
        contactService.submitContact(mockContactData),
      ];

      const results = await Promise.all(promises);

      expect(results).toHaveLength(3);
      results.forEach(result => {
        expect(result.success).toBe(true);
      });
      expect(mockPost).toHaveBeenCalledTimes(3);
    });

    it('preserves line breaks in message', async () => {
      const messageWithLineBreaks = 'Line 1\nLine 2\n\nLine 4 more text here.';
      const dataWithLineBreaks: ContactFormData = {
        ...mockContactData,
        message: messageWithLineBreaks,
      };

      mockPost.mockResolvedValue({
        success: true,
        data: { id: '129', status: 'sent' },
      });

      await contactService.submitContact(dataWithLineBreaks);

      const submittedPayload = mockPost.mock.calls[0]![1];
      expect(submittedPayload.message).toBe(messageWithLineBreaks);
    });

    it('validates name maximum length', async () => {
      const tooLongName = {
        ...mockContactData,
        name: 'A'.repeat(101),
      };

      const result = await contactService.submitContact(tooLongName);

      expect(result.success).toBe(false);
      expect(result.message).toMatch(/name/i);
    });

    it('validates subject maximum length', async () => {
      const tooLongSubject = {
        ...mockContactData,
        subject: 'B'.repeat(201),
      };

      const result = await contactService.submitContact(tooLongSubject);

      expect(result.success).toBe(false);
      expect(result.message).toMatch(/subject/i);
    });
  });

  describe('validateContactData (private)', () => {
    it('validates complete valid data returns isValid true', () => {
      const result = contactService['validateContactData'](mockContactData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('rejects data with empty name', () => {
      const incompleteData = { ...mockContactData, name: '' };
      const result = contactService['validateContactData'](incompleteData);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('rejects data with invalid email', () => {
      const invalidEmailData = { ...mockContactData, email: 'invalid' };
      const result = contactService['validateContactData'](invalidEmailData);
      expect(result.isValid).toBe(false);
    });

    it('rejects data with short message', () => {
      const shortMessageData = { ...mockContactData, message: 'Hi' };
      const result = contactService['validateContactData'](shortMessageData);
      expect(result.isValid).toBe(false);
    });

    it('rejects data with short subject', () => {
      const shortSubjectData = { ...mockContactData, subject: 'Hi' };
      const result = contactService['validateContactData'](shortSubjectData);
      expect(result.isValid).toBe(false);
    });
  });

  describe('formatContactData (private)', () => {
    it('trims and lowercases email', () => {
      const formatted = contactService['formatContactData'](mockContactData);
      expect(formatted.email).toBe('john@example.com');
      expect(formatted.name).toBe('John Doe');
    });

    it('trims whitespace from all fields', () => {
      const padded: ContactFormData = {
        name: '  Jane  ',
        email: '  JANE@EXAMPLE.COM  ',
        subject: '  Hello world  ',
        message: '  A message about something important here.  ',
      };
      const formatted = contactService['formatContactData'](padded);
      expect(formatted.name).toBe('Jane');
      expect(formatted.email).toBe('jane@example.com');
      expect(formatted.subject).toBe('Hello world');
      expect(formatted.message).toBe(
        'A message about something important here.'
      );
    });
  });
});
