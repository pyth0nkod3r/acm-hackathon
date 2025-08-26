/**
 * Registration form submission service
 */

import { APIService } from './api';
import type { RegistrationFormData } from '../lib/validations';
import type {
  APIResponse,
  PartnerRegistrationRequest,
  PartnerRegistrationResponse,
} from '../types/api';
import { apiConfig } from '../config/api';

export class RegistrationService extends APIService {
  /**
   * Submits registration form data to the new API
   */
  async submitRegistration(
    formData: RegistrationFormData
  ): Promise<APIResponse<PartnerRegistrationResponse>> {
    try {
      // Transform the form data to match the new API format
      const apiData = this.transformToAPIFormat(formData);

      // Submit to the new API endpoint
      return this.post<PartnerRegistrationResponse>(
        apiConfig.formEndpoints.registration,
        apiData
      );
    } catch (error) {
      console.error('Registration submission error:', error);
      return {
        success: false,
        message: 'Failed to submit registration form',
      };
    }
  }

  /**
   * Transforms RegistrationFormData to PartnerRegistrationRequest format
   */
  private transformToAPIFormat(
    data: RegistrationFormData
  ): PartnerRegistrationRequest {
    // Extract first and last name from team leader
    const nameParts = data.teamLeader.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    return {
      // Personal Information
      firstName,
      lastName,
      phoneNumber: data.teamLeader.phone,
      emailAddress: data.teamLeader.email,
      gender: data.teamLeader.gender || '',
      // Optional fields - only include if they exist
      ...(data.teamLeader.dateOfBirth && {
        dateOfBirth: data.teamLeader.dateOfBirth,
      }),
      ...(data.teamLeader.nationality && {
        nationality: data.teamLeader.nationality,
      }),
      ...(data.teamLeader.stateCity && {
        stateCity: data.teamLeader.stateCity,
      }),
      ...(data.teamLeader.educationLevel && {
        educationLevel: data.teamLeader.educationLevel,
      }),
      ...(data.teamLeader.fieldOfStudy && {
        fieldOfStudy: data.teamLeader.fieldOfStudy,
      }),
      ...(data.teamLeader.occupation && {
        occupation: data.teamLeader.occupation,
      }),
      ...(data.teamLeader.organization && {
        organization: data.teamLeader.organization,
      }),
      ...(data.teamLeader.portfolio && {
        portfolio: data.teamLeader.portfolio,
      }),
      ...(data.teamLeader.linkedin && { linkedin: data.teamLeader.linkedin }),

      // Team Information
      teamName: data.teamName,
      teamSize: data.teamSize,
      // Optional team fields - provide defaults or omit if not available
      applicationType: 'hackathon',
      teamRoles: data.teamMembers.map(member => member.role),
      teamIntroduction: `Team ${data.teamName} with ${data.teamSize} members`,

      // Project Information
      projectTitle: data.projectTitle,
      ideaSummary: data.ideaSummary,
      problemSolving: data.problemSolving,
      technology: data.technology,
      alignment: data.alignment,
      hasPrototype: data.hasPrototype,
      ...(data.prototypeURL && { prototypeURL: data.prototypeURL }),
      ...(data.projectRepo && { projectRepo: data.projectRepo }),

      // Skills and Interests - provide defaults since these don't exist in RegistrationFormData
      technicalSkills: ['To be specified'],
      creativeSkills: ['To be specified'],
      challengeAreas: data.challengeAreas,

      // Experience - provide defaults since these don't exist in RegistrationFormData
      hackathonExperience: 'To be specified',
      hackathonExperienceDetails: 'To be specified',
      motivation: 'To be specified',

      // Logistics - provide defaults since these don't exist in RegistrationFormData
      travelSupport: false,
      accommodationSupport: false,
      dietaryPreferences: 'No specific preferences',
      accessibilityNeeds: 'None specified',

      // Consent
      declarations: data.declarations,
      digitalSignature: 'Digital signature provided',
    };
  }
}

// Export singleton instance
export const registrationService = new RegistrationService();
