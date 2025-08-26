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
   * Submits registration form data to the API
   */
  async submitRegistration(
    formData: RegistrationFormData
  ): Promise<APIResponse<PartnerRegistrationResponse>> {
    try {
      // Validate required fields before submission
      this.validateFormData(formData);

      // Transform the form data to match the API format
      const apiData = this.transformToAPIFormat(formData);

      console.log('Submitting registration data:', apiData);

      // Submit to the API endpoint
      const response = await this.post<PartnerRegistrationResponse>(
        apiConfig.formEndpoints.registration,
        apiData
      );

      if (response.success) {
        console.log('Registration submitted successfully:', response);
      }

      return response;
    } catch (error) {
      console.error('Registration submission error:', error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to submit registration form. Please try again.',
      };
    }
  }

  /**
   * Validates required form data before submission
   */
  private validateFormData(data: RegistrationFormData): void {
    if (!data.teamLeader?.name?.trim()) {
      throw new Error('Team leader name is required');
    }
    if (!data.teamLeader?.email?.trim()) {
      throw new Error('Team leader email is required');
    }
    if (!data.teamLeader?.phone?.trim()) {
      throw new Error('Team leader phone is required');
    }
    if (!data.teamName?.trim()) {
      throw new Error('Team name is required');
    }
    if (!data.digitalSignature?.trim()) {
      throw new Error('Digital signature is required');
    }
    if (!data.declarations?.length || data.declarations.length < 3) {
      throw new Error('All required declarations must be accepted');
    }
  }

  /**
   * Transforms RegistrationFormData to PartnerRegistrationRequest format
   * Maps the hackathon registration form fields to the API format
   */
  private transformToAPIFormat(
    data: RegistrationFormData
  ): PartnerRegistrationRequest {
    // Extract first and last name from team leader
    const nameParts = data.teamLeader.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Prepare team member information
    const allTeamMembers = [data.teamLeader, ...(data.teamMembers || [])];
    const teamRoles = allTeamMembers.map(member => member.role);

    // Prepare attending days (hackathon days)
    const attendingDays = data.allMembersAvailable
      ? ['September 16', 'September 17', 'September 18', 'September 19']
      : ['TBD - Some members unavailable'];

    return {
      // Personal Information (Team Leader)
      firstName,
      lastName,
      phoneNumber: data.teamLeader.phone,
      emailAddress: data.teamLeader.email,
      company: data.teamName, // Using team name as company
      gender: '', // Not collected in current form
      industry: 'Creative Technology', // Default for hackathon
      attendingDays,

      // Optional personal fields
      ...(data.teamLeader.linkedin && {
        linkedin: data.teamLeader.linkedin,
      }),

      // Team Information
      teamName: data.teamName,
      teamSize: data.teamSize,
      applicationType: 'hackathon',
      teamRoles,
      teamIntroduction: `${data.teamName} - ${data.creativeIndustryChallenge}`,

      // Project Information (mapped from idea summary fields)
      projectTitle: `${data.teamName} Solution`,
      ideaSummary: data.solutionVision,
      problemSolving: data.distributionChallenge,
      technology: 'To be determined during hackathon',
      alignment: data.teamPositioning,
      hasPrototype: false, // Hackathon teams haven't built yet

      // Skills and Interests
      technicalSkills: teamRoles.filter(role =>
        ['Developer', 'Data Scientist'].includes(role)
      ),
      creativeSkills: teamRoles.filter(role =>
        ['Designer', 'Creative Lead'].includes(role)
      ),
      challengeAreas: [data.creativeIndustryChallenge],

      // Experience
      hackathonExperience: data.hackathonExperience,
      hackathonExperienceDetails:
        data.hackathonExperienceDetails || 'No previous experience',
      motivation: `Passionate about solving: ${data.creativeIndustryChallenge}`,

      // Logistics
      travelSupport: !data.allMembersAvailable, // May need support if not all available
      accommodationSupport: false, // Not specified in form
      dietaryPreferences: data.hasDietaryRestrictions
        ? data.dietaryNeeds || 'Special dietary requirements'
        : 'No special requirements',
      accessibilityNeeds: 'None specified',

      // Additional context
      countryOfResidence: data.countryOfResidence,
      availabilityDetails:
        data.availabilityExplanation || 'All members available',

      // Consent
      declarations: data.declarations,
      digitalSignature: data.digitalSignature,
    };
  }
}

// Export singleton instance
export const registrationService = new RegistrationService();
