/**
 * Form validation utilities
 */

import { FormError, FormValidationResult } from '../types/forms';

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone number validation regex (international format)
 */
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

/**
 * URL validation regex
 */
const URL_REGEX =
  /^https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)?$/;

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim());
};

/**
 * Validates phone number format
 */
export const isValidPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return PHONE_REGEX.test(cleanPhone);
};

/**
 * Validates URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return URL_REGEX.test(url);
  } catch {
    return false;
  }
};

/**
 * Validates required field
 */
export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Validates minimum length
 */
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

/**
 * Validates maximum length
 */
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

/**
 * Validates age range
 */
export const isValidAge = (age: number, min = 16, max = 100): boolean => {
  return age >= min && age <= max;
};

/**
 * Validates file size
 */
export const isValidFileSize = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

/**
 * Validates file type
 */
export const isValidFileType = (
  file: File,
  allowedTypes: string[]
): boolean => {
  return allowedTypes.includes(file.type);
};

/**
 * Sanitizes string input
 */
export const sanitizeString = (input: string): string => {
  return input.trim().replace(/\s+/g, ' ');
};

/**
 * Sanitizes email input
 */
export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

/**
 * Sanitizes phone input
 */
export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[\s\-\(\)]/g, '');
};

/**
 * Creates a form error object
 */
export const createFormError = (
  field: string,
  message: string,
  type: 'validation' | 'network' | 'server' = 'validation'
): FormError => {
  return { field, message, type };
};

/**
 * Creates a validation result object
 */
export const createValidationResult = (
  errors: FormError[]
): FormValidationResult => {
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validates a team member object
 */
export const validateTeamMember = (
  member: any,
  fieldPrefix = ''
): FormError[] => {
  const errors: FormError[] = [];
  const prefix = fieldPrefix ? `${fieldPrefix}.` : '';

  if (!isRequired(member.name)) {
    errors.push(createFormError(`${prefix}name`, 'Name is required'));
  } else if (!hasMinLength(member.name, 2)) {
    errors.push(
      createFormError(
        `${prefix}name`,
        'Name must be at least 2 characters long'
      )
    );
  } else if (!hasMaxLength(member.name, 100)) {
    errors.push(
      createFormError(`${prefix}name`, 'Name must be less than 100 characters')
    );
  }

  if (!isRequired(member.email)) {
    errors.push(createFormError(`${prefix}email`, 'Email is required'));
  } else if (!isValidEmail(member.email)) {
    errors.push(
      createFormError(`${prefix}email`, 'Please enter a valid email address')
    );
  }

  if (!isRequired(member.phone)) {
    errors.push(createFormError(`${prefix}phone`, 'Phone number is required'));
  } else if (!isValidPhone(member.phone)) {
    errors.push(
      createFormError(`${prefix}phone`, 'Please enter a valid phone number')
    );
  }

  if (!isRequired(member.role)) {
    errors.push(createFormError(`${prefix}role`, 'Role is required'));
  } else if (!hasMinLength(member.role, 2)) {
    errors.push(
      createFormError(
        `${prefix}role`,
        'Role must be at least 2 characters long'
      )
    );
  }

  if (!isRequired(member.country)) {
    errors.push(createFormError(`${prefix}country`, 'Country is required'));
  }

  if (!isRequired(member.nationality)) {
    errors.push(
      createFormError(`${prefix}nationality`, 'Nationality is required')
    );
  }

  if (!isRequired(member.age)) {
    errors.push(createFormError(`${prefix}age`, 'Age is required'));
  } else if (!isValidAge(member.age)) {
    errors.push(
      createFormError(`${prefix}age`, 'Age must be between 16 and 100')
    );
  }

  if (member.linkedin && !isValidUrl(member.linkedin)) {
    errors.push(
      createFormError(`${prefix}linkedin`, 'Please enter a valid LinkedIn URL')
    );
  }

  return errors;
};

/**
 * Validates file upload
 */
export const validateFileUpload = (file: File): FormError[] => {
  const errors: FormError[] = [];
  const maxSizeInMB = 10;
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/gif',
  ];

  if (!isValidFileSize(file, maxSizeInMB)) {
    errors.push(
      createFormError(
        'fileUpload',
        `File size must be less than ${maxSizeInMB}MB`
      )
    );
  }

  if (!isValidFileType(file, allowedTypes)) {
    errors.push(
      createFormError(
        'fileUpload',
        'File type not supported. Please upload PDF, DOC, DOCX, or image files.'
      )
    );
  }

  return errors;
};

/**
 * Debounce function for validation
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
