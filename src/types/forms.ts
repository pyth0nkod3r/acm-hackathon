/**
 * Form data structures for the hackathon application
 */

export interface TeamMember {
  name: string;
  email: string;
  phone: string;
  role: string;
  linkedin?: string;
  country: string;
  nationality: string;
  age: number;
  gender?: string;
  // Optional fields used by registration service and validation schema
  dateOfBirth?: string;
  stateCity?: string;
  educationLevel?: string;
  fieldOfStudy?: string;
  occupation?: string;
  organization?: string;
  portfolio?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormError {
  field: string;
  message: string;
  type: 'validation' | 'network' | 'server';
}

export interface FormValidationResult {
  isValid: boolean;
  errors: FormError[];
}
