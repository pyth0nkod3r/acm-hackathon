/**
 * Contact Service tests
 * Tests contact form submission, data formatting, and error handling
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactService } from '../contactService';
import type { ContactFormData } from '../../lib/validations';

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
    const MockAPIService = require('../api').APIService;
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
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Inquiry about hackathon',
        message: 'I would like to know more about the registration process.',
        timestamp: expect.any(String),
        userAgent: expect.any(String),
      });

      expect(result).toEqual({
        success: true,
        data: { id: '123', status: 'sent' },
      });
    });

    it('includes timestamp and user agent in submission', async () => {
      mockPost.mockResolvedValue({
        success: true,
        data: { id: '124', status: 'sent' },
      });

      const beforeSubmission = new Date().toISOString();
      await contactService.submitContact(mockContactData);
      const afterSubmission = new Date().toISOString();

      const submittedData = mockPost.mock.calls[0][1];
      expect(submittedData.timestamp).toBeDefined();
      expect(submittedData.timestamp).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
      );
      expect(submittedData.timestamp >= beforeSubmission).toBe(true);
      expect(submittedData.timestamp <= afterSubmission).toBe(true);
      expect(submittedData.userAgent).toBeDefined();
      expect(typeof submittedData.userAgent).toBe('string');
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
        message: 'Failed to send message. Please try again.',
      });
    });

    it('validates required fields', async () => {
      const incompleteData = {
        ...mockContactData,
        name: '',
        email: '',
      };

      const result = await contactService.submitContact(incompleteData);

      expect(result).toEqual({
        success: false,
        message: 'Please fill in all required fields.',
      });
    });

    it('validates email format', async () => {
      const invalidEmailData = {
        ...mockContactData,
        email: 'invalid-email',
      };

      const result = await contactService.submitContact(invalidEmailData);

      expect(result).toEqual({
        success: false,
        message: 'Please provide a valid email address.',
      });
    });

    it('validates message length', async () => {
      const shortMessageData = {
        ...mockContactData,
        message: 'Hi',
      };

      const result = await contactService.submitContact(shortMessageData);

      expect(result).toEqual({
        success: false,
        message: 'Message must be at least 10 characters long.',
      });
    });

    it('validates subject length', async () => {
      const shortSubjectData = {
        ...mockContactData,
        subject: 'Hi',
      };

      const result = await contactService.submitContact(shortSubjectData);

      expect(result).toEqual({
        success: false,
        message: 'Subject must be at least 5 characters long.',
      });
    });

    it('validates name length', async () => {
      const shortNameData = {
        ...mockContactData,
        name: 'A',
      };

      const result = await contactService.submitContact(shortNameData);

      expect(result).toEqual({
        success: false,
        message: 'Name must be at least 2 characters long.',
      });
    });

    it('trims whitespace from input fields', async () => {
      const dataWithWhitespace = {
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

      const submittedData = mockPost.mock.calls[0][1];
      expect(submittedData.name).toBe('John Doe');
      expect(submittedData.email).toBe('john@example.com');
      expect(submittedData.subject).toBe('Test Subject');
      expect(submittedData.message).toBe(
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

      expect(result.success).toBe(true);
      expect(mockPost).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          message: longMessage,
        })
      );
    });

    it('handles special characters in input', async () => {
      const specialCharData = {
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
          name: 'José María',
          subject: 'Inquiry about AfCFTA & Digital Trade',
          message:
            'Hello! I have questions about the hackathon. Can you help? Thanks! 🚀',
        })
      );
    });

    it('validates against potential XSS attacks', async () => {
      const xssData = {
        name: '<script>alert("xss")</script>',
        email: 'test@example.com',
        subject: '<img src="x" onerror="alert(1)">',
        message: 'This is a test message with potential XSS content.',
      };

      const result = await contactService.submitContact(xssData);

      expect(result).toEqual({
        success: false,
        message: 'Invalid characters detected in form data.',
      });
    });

    it('validates against SQL injection attempts', async () => {
      const sqlInjectionData = {
        name: "'; DROP TABLE users; --",
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message.',
      };

      const result = await contactService.submitContact(sqlInjectionData);

      expect(result).toEqual({
        success: false,
        message: 'Invalid characters detected in form data.',
      });
    });

    it('handles empty strings after trimming', async () => {
      const emptyAfterTrimData = {
        name: '   ',
        email: '   ',
        subject: '   ',
        message: '   ',
      };

      const result = await contactService.submitContact(emptyAfterTrimData);

      expect(result).toEqual({
        success: false,
        message: 'Please fill in all required fields.',
      });
    });

    it('validates maximum field lengths', async () => {
      const tooLongData = {
        name: 'A'.repeat(101), // Assuming max 100 chars
        email: 'test@example.com',
        subject: 'B'.repeat(201), // Assuming max 200 chars
        message: 'This is a valid message.',
      };

      const result = await contactService.submitContact(tooLongData);

      expect(result).toEqual({
        success: false,
        message: 'One or more fields exceed maximum length limits.',
      });
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
      const messageWithLineBreaks = 'Line 1\nLine 2\n\nLine 4';
      const dataWithLineBreaks = {
        ...mockContactData,
        message: messageWithLineBreaks,
      };

      mockPost.mockResolvedValue({
        success: true,
        data: { id: '129', status: 'sent' },
      });

      await contactService.submitContact(dataWithLineBreaks);

      const submittedData = mockPost.mock.calls[0][1];
      expect(submittedData.message).toBe(messageWithLineBreaks);
    });
  });

  describe('formatContactData', () => {
    it('formats contact data correctly', () => {
      const formatted = contactService['formatContactData'](mockContactData);

      expect(formatted).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Inquiry about hackathon',
        message: 'I would like to know more about the registration process.',
        timestamp: expect.any(String),
        userAgent: expect.any(String),
      });
    });

    it('includes current timestamp', () => {
      const beforeFormat = new Date().toISOString();
      const formatted = contactService['formatContactData'](mockContactData);
      const afterFormat = new Date().toISOString();

      expect(formatted.timestamp).toBeDefined();
      expect(formatted.timestamp >= beforeFormat).toBe(true);
      expect(formatted.timestamp <= afterFormat).toBe(true);
    });

    it('includes user agent', () => {
      const formatted = contactService['formatContactData'](mockContactData);

      expect(formatted.userAgent).toBeDefined();
      expect(typeof formatted.userAgent).toBe('string');
    });
  });

  describe('validateContactData', () => {
    it('validates complete valid data', () => {
      const isValid = contactService['validateContactData'](mockContactData);
      expect(isValid).toBe(true);
    });

    it('rejects data with missing required fields', () => {
      const incompleteData = { ...mockContactData, name: '' };
      const isValid = contactService['validateContactData'](incompleteData);
      expect(isValid).toBe(false);
    });

    it('rejects data with invalid email', () => {
      const invalidEmailData = { ...mockContactData, email: 'invalid' };
      const isValid = contactService['validateContactData'](invalidEmailData);
      expect(isValid).toBe(false);
    });

    it('rejects data with short message', () => {
      const shortMessageData = { ...mockContactData, message: 'Hi' };
      const isValid = contactService['validateContactData'](shortMessageData);
      expect(isValid).toBe(false);
    });
  });
});
