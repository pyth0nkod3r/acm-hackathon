/**
 * API response and error types
 */

export interface APICredentials {
  username: string;
  password: string;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  messages?: Record<string, string>;
}

export interface FormSubmissionResponse {
  id: string;
  status: 'submitted' | 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface NetworkError {
  type: 'network';
  message: string;
  status?: number;
}

export interface ValidationError {
  type: 'validation';
  field: string;
  message: string;
}

export interface ServerError {
  type: 'server';
  message: string;
  code?: string;
}

export interface PartnerRegistrationRequest {
  // Personal Information (Team Leader)
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  altPhoneNumber?: string;
  altEmailAddress?: string;
  company?: string; // Team name
  gender?: string;
  industry?: string;
  attendingDays?: string[];

  // Additional personal fields
  dateOfBirth?: string;
  nationality?: string;
  stateCity?: string;
  educationLevel?: string;
  fieldOfStudy?: string;
  occupation?: string;
  organization?: string;
  portfolio?: string;
  linkedin?: string;

  // Team Information
  teamName?: string;
  teamSize?: number;
  applicationType?: string;
  teamRoles?: string[];
  teamIntroduction?: string;

  // Project Information
  projectTitle?: string;
  ideaSummary?: string;
  problemSolving?: string;
  technology?: string;
  alignment?: string;
  hasPrototype?: boolean;
  prototypeURL?: string;
  projectRepo?: string;

  // Skills and Interests
  technicalSkills?: string[];
  creativeSkills?: string[];
  challengeAreas?: string[];

  // Experience
  hackathonExperience?: string;
  hackathonExperienceDetails?: string;
  motivation?: string;

  // Logistics
  travelSupport?: boolean;
  accommodationSupport?: boolean;
  dietaryPreferences?: string;
  accessibilityNeeds?: string;

  // Additional hackathon-specific fields
  countryOfResidence?: string;
  availabilityDetails?: string;

  // Consent
  declarations?: string[];
  teamLeadSignature?: string;
}

export interface PartnerRegistrationResponse {
  id: string;
  status: 'submitted' | 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  message?: string;
}

export type APIErrorType = NetworkError | ValidationError | ServerError;
