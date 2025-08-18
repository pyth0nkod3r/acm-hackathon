/**
 * Form validation utility tests
 * Tests validation functions and error handling
 */

import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isRequired,
  hasMinLength,
  hasMaxLength,
  isValidAge,
  sanitizeString,
  sanitizePhone,
  validateTeamMember,
  validateFileUpload,
  createFormError,
  createValidationResult,
} from '../formValidation';

describe('Form Validation Utilities', () => {
  describe('isValidEmail', () => {
    it('validates correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'user123@test-domain.com',
        'a@b.co',
      ];

      validEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(true);
      });
    });

    it('rejects invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        '',
        'user name@example.com',
      ];

      invalidEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(false);
      });
    });

    it('handles edge cases', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('   ')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('validates correct phone numbers', () => {
      const validPhones = [
        '+1234567890',
        '+442079460958',
        '+2341234567890',
        '1234567890',
        '5551234567',
      ];

      validPhones.forEach(phone => {
        expect(isValidPhone(phone)).toBe(true);
      });
    });

    it('rejects invalid phone numbers', () => {
      const invalidPhones = ['abc123', '+', '', 'phone number'];

      invalidPhones.forEach(phone => {
        expect(isValidPhone(phone)).toBe(false);
      });
    });

    it('handles formatted phone numbers', () => {
      expect(isValidPhone('+44 20 7946 0958')).toBe(true);
      expect(isValidPhone('(555) 123-4567')).toBe(true);
      expect(isValidPhone('555-123-4567')).toBe(true);
    });
  });

  describe('isValidUrl', () => {
    it('validates correct URLs', () => {
      const validURLs = [
        'https://example.com',
        'http://test.org',
        'https://www.example.com/path',
        'https://example.com:8080',
        'https://sub.domain.example.com',
        'https://example.com/path?query=value',
        'https://example.com/path#fragment',
      ];

      validURLs.forEach(url => {
        expect(isValidUrl(url)).toBe(true);
      });
    });

    it('rejects invalid URLs', () => {
      const invalidURLs = ['not-a-url', '', 'example.com'];

      invalidURLs.forEach(url => {
        expect(isValidUrl(url)).toBe(false);
      });
    });
  });

  describe('isRequired', () => {
    it('validates required fields correctly', () => {
      expect(isRequired('test')).toBe(true);
      expect(isRequired('a')).toBe(true);
      expect(isRequired(123)).toBe(true);
      expect(isRequired(0)).toBe(true);
      expect(isRequired(false)).toBe(true);
    });

    it('rejects empty required fields', () => {
      expect(isRequired('')).toBe(false);
      expect(isRequired('   ')).toBe(false);
      expect(isRequired(null)).toBe(false);
      expect(isRequired(undefined)).toBe(false);
    });
  });

  describe('hasMinLength', () => {
    it('validates minimum length correctly', () => {
      expect(hasMinLength('hello', 3)).toBe(true);
      expect(hasMinLength('hello', 5)).toBe(true);
      expect(hasMinLength('test', 4)).toBe(true);
    });

    it('rejects strings below minimum length', () => {
      expect(hasMinLength('hi', 3)).toBe(false);
      expect(hasMinLength('', 1)).toBe(false);
      expect(hasMinLength('test', 10)).toBe(false);
    });

    it('handles whitespace correctly', () => {
      expect(hasMinLength('  hello  ', 5)).toBe(true);
      expect(hasMinLength('  hi  ', 5)).toBe(false);
    });
  });

  describe('hasMaxLength', () => {
    it('validates maximum length correctly', () => {
      expect(hasMaxLength('hello', 10)).toBe(true);
      expect(hasMaxLength('hello', 5)).toBe(true);
      expect(hasMaxLength('', 5)).toBe(true);
    });

    it('rejects strings above maximum length', () => {
      expect(hasMaxLength('hello world', 5)).toBe(false);
      expect(hasMaxLength('test', 3)).toBe(false);
    });

    it('handles whitespace correctly', () => {
      expect(hasMaxLength('  hello  ', 5)).toBe(true);
      expect(hasMaxLength('  hello world  ', 5)).toBe(false);
    });
  });

  describe('isValidAge', () => {
    it('validates correct ages', () => {
      expect(isValidAge(18, 18, 100)).toBe(true);
      expect(isValidAge(25, 18, 100)).toBe(true);
      expect(isValidAge(100, 18, 100)).toBe(true);
      expect(isValidAge(21, 21, 65)).toBe(true);
    });

    it('rejects ages below minimum', () => {
      expect(isValidAge(17, 18, 100)).toBe(false);
      expect(isValidAge(16, 18, 100)).toBe(false);
      expect(isValidAge(0, 18, 100)).toBe(false);
    });

    it('rejects ages above maximum', () => {
      expect(isValidAge(101, 18, 100)).toBe(false);
      expect(isValidAge(150, 18, 100)).toBe(false);
      expect(isValidAge(66, 18, 65)).toBe(false);
    });

    it('uses default age limits when not provided', () => {
      expect(isValidAge(25)).toBe(true);
      expect(isValidAge(15)).toBe(false);
      expect(isValidAge(101)).toBe(false);
    });
  });

  describe('sanitizeString', () => {
    it('trims whitespace and normalizes spaces', () => {
      expect(sanitizeString('  hello world  ')).toBe('hello world');
      expect(sanitizeString('\n\ttest\n\t')).toBe('test');
      expect(sanitizeString('hello    world')).toBe('hello world');
    });

    it('preserves safe content', () => {
      expect(sanitizeString('Hello world')).toBe('Hello world');
      expect(sanitizeString('Email: test@example.com')).toBe(
        'Email: test@example.com'
      );
      expect(sanitizeString('Price: $19.99')).toBe('Price: $19.99');
    });

    it('handles edge cases', () => {
      expect(sanitizeString('')).toBe('');
      expect(sanitizeString('   ')).toBe('');
    });
  });

  describe('sanitizePhone', () => {
    it('removes formatting characters', () => {
      expect(sanitizePhone('555-123-4567')).toBe('5551234567');
      expect(sanitizePhone('(555) 123-4567')).toBe('5551234567');
      expect(sanitizePhone('555 123 4567')).toBe('5551234567');
      expect(sanitizePhone('+1 (555) 123-4567')).toBe('+15551234567');
    });

    it('preserves valid characters', () => {
      expect(sanitizePhone('+1234567890')).toBe('+1234567890');
      expect(sanitizePhone('1234567890')).toBe('1234567890');
    });

    it('handles edge cases', () => {
      expect(sanitizePhone('')).toBe('');
      expect(sanitizePhone('abc')).toBe('abc');
    });
  });

  describe('createFormError', () => {
    it('creates form error with default type', () => {
      const error = createFormError('email', 'Invalid email');
      expect(error).toEqual({
        field: 'email',
        message: 'Invalid email',
        type: 'validation',
      });
    });

    it('creates form error with custom type', () => {
      const error = createFormError('name', 'Network error', 'network');
      expect(error).toEqual({
        field: 'name',
        message: 'Network error',
        type: 'network',
      });
    });
  });

  describe('createValidationResult', () => {
    it('creates valid result when no errors', () => {
      const result = createValidationResult([]);
      expect(result).toEqual({
        isValid: true,
        errors: [],
      });
    });

    it('creates invalid result when errors exist', () => {
      const errors = [createFormError('email', 'Invalid email')];
      const result = createValidationResult(errors);
      expect(result).toEqual({
        isValid: false,
        errors,
      });
    });
  });

  describe('validateTeamMember', () => {
    const validMember = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      role: 'Developer',
      country: 'USA',
      nationality: 'American',
      age: 25,
      linkedin: 'https://linkedin.com/in/johndoe',
    };

    it('validates correct team member', () => {
      const errors = validateTeamMember(validMember);
      expect(errors).toHaveLength(0);
    });

    it('validates team member without optional fields', () => {
      const memberWithoutLinkedIn = { ...validMember };
      delete memberWithoutLinkedIn.linkedin;

      const errors = validateTeamMember(memberWithoutLinkedIn);
      expect(errors).toHaveLength(0);
    });

    it('returns errors for invalid team member', () => {
      const invalidMember = {
        name: '',
        email: 'invalid-email',
        phone: '123',
        role: '',
        country: '',
        nationality: '',
        age: 15,
        linkedin: 'invalid-url',
      };

      const errors = validateTeamMember(invalidMember);
      expect(errors.length).toBeGreaterThan(0);

      const errorFields = errors.map(e => e.field);
      expect(errorFields).toContain('name');
      expect(errorFields).toContain('email');
      expect(errorFields).toContain('role');
      expect(errorFields).toContain('country');
      expect(errorFields).toContain('nationality');
      expect(errorFields).toContain('age');
      expect(errorFields).toContain('linkedin');
    });

    it('uses field prefix correctly', () => {
      const invalidMember = {
        name: '',
        email: '',
        phone: '',
        role: '',
        country: '',
        nationality: '',
        age: 15,
      };
      const errors = validateTeamMember(invalidMember, 'teamMember.0');

      expect(errors[0].field).toBe('teamMember.0.name');
    });
  });

  describe('validateFileUpload', () => {
    it('validates correct file', () => {
      const file = new File(['test content'], 'test.pdf', {
        type: 'application/pdf',
      });
      Object.defineProperty(file, 'size', { value: 1024 * 1024 }); // 1MB

      const errors = validateFileUpload(file);
      expect(errors).toHaveLength(0);
    });

    it('rejects file that is too large', () => {
      const file = new File(['test content'], 'test.pdf', {
        type: 'application/pdf',
      });
      Object.defineProperty(file, 'size', { value: 11 * 1024 * 1024 }); // 11MB

      const errors = validateFileUpload(file);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('fileUpload');
      expect(errors[0].message).toContain('File size must be less than');
    });

    it('rejects unsupported file type', () => {
      const file = new File(['test content'], 'test.txt', {
        type: 'text/plain',
      });
      Object.defineProperty(file, 'size', { value: 1024 }); // 1KB

      const errors = validateFileUpload(file);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('fileUpload');
      expect(errors[0].message).toContain('File type not supported');
    });
  });

  describe('Integration tests', () => {
    it('validates complete form data correctly', () => {
      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        age: 25,
        website: 'https://johndoe.com',
        bio: 'Software developer with 5 years of experience',
      };

      expect(isRequired(formData.name)).toBe(true);
      expect(isValidEmail(formData.email)).toBe(true);
      expect(isValidPhone(formData.phone)).toBe(true);
      expect(isValidAge(formData.age)).toBe(true);
      expect(isValidUrl(formData.website)).toBe(true);
      expect(hasMinLength(formData.bio, 10)).toBe(true);
      expect(hasMaxLength(formData.bio, 500)).toBe(true);
    });

    it('sanitizes and validates user input', () => {
      const userInput = '  John Doe  ';
      const sanitized = sanitizeString(userInput);

      expect(sanitized).toBe('John Doe');
      expect(isRequired(sanitized)).toBe(true);
      expect(hasMinLength(sanitized, 2)).toBe(true);
    });

    it('sanitizes and validates phone numbers', () => {
      const phoneInput = '(555) 123-4567';
      const sanitized = sanitizePhone(phoneInput);

      expect(sanitized).toBe('5551234567');
      expect(isValidPhone(sanitized)).toBe(true);
    });
  });
});
