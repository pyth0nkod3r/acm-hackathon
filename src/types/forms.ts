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
}

export interface RegistrationFormData {
  teamName: string;
  teamSize: number;
  teamLeader: TeamMember;
  teamMembers: TeamMember[];
  projectTitle: string;
  ideaSummary: string;
  problemSolving: string;
  technology: string;
  alignment: string;
  hasPrototype: boolean;
  prototypeURL?: string;
  projectRepo?: string;
  challengeAreas: string[];
  declarations: string[];
  fileUpload?: File;
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
