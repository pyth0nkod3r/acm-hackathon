/**
 * Registration form submission service
 */

import { APIService } from './api';
import type { RegistrationFormData } from '../lib/validations';
import type { APIResponse, PartnerRegistrationResponse } from '../types/api';
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

      // Convert to FormData required by the ACM Hackathon API
      const fd = this.transformToFormData(formData);

      console.log('Submitting registration data:', Object.fromEntries(fd));

      // POST multipart/formdata to the endpoint
      const response = await this.postFormData<PartnerRegistrationResponse>(
        apiConfig.formEndpoints.registration,
        fd
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
    if (!data.teamLeadSignature?.trim()) {
      throw new Error('Digital signature is required');
    }
    if (!data.declarations?.length || data.declarations.length < 3) {
      throw new Error('All required declarations must be accepted');
    }
  }
  /**
   * Transforms RegistrationFormData into the exact FormData structure
   * expected by the ACM Hackathon endpoint.
   */
  private transformToFormData(data: RegistrationFormData): FormData {
    const fd = new FormData();

    /* ───────────────────────── Section 1 – Team information ───────────────────────── */
    fd.append('teamName', data.teamName);
    fd.append('teamSize', String(data.teamSize));
    fd.append('countryOfResidence', data.countryOfResidence);

    // Yes/No stored as "Yes" / "No" for API
    const yesNo = (b: boolean | 'yes' | 'no') =>
      b === true || b === 'yes' ? 'Yes' : 'No';

    fd.append('hackathonExperience', yesNo(data.hackathonExperience));
    // ALWAYS include the “…Desc” key – empty string when not applicable
    fd.append(
      'hackathonExperienceDesc',
      data.hackathonExperience === 'yes'
        ? (data.hackathonExperienceDetails ?? '')
        : ''
    );

    /* ───────────────────────── Section 2 – Team lead ───────────────────────── */
    fd.append('teamLeaderFullName', data.teamLeader.name);
    fd.append('teamLeaderPhone', data.teamLeader.phone);
    fd.append('teamLeaderEmail', data.teamLeader.email);
    fd.append('teamLeaderRole', data.teamLeader.role);
    fd.append('teamLeaderLinkedIn', data.teamLeader.linkedin ?? '');

    /* ───────────────────────── Section 3 – Team members ───────────────────────── */
    // Backend expects indexes 0…teamSize-2
    const expectedMembers = Math.max(0, data.teamSize - 1);
    for (let i = 0; i < expectedMembers; i++) {
      const m = data.teamMembers?.[i] ?? {
        name: '',
        email: '',
        phone: '',
        role: '',
        linkedin: '',
      };
      fd.append(`teamMembers[${i}][teamMemberFullName]`, m.name);
      fd.append(`teamMembers[${i}][teamMemberEmail]`, m.email);
      fd.append(`teamMembers[${i}][teamMemberPhone]`, m.phone);
      fd.append(`teamMembers[${i}][teamMemberRole]`, m.role);
      fd.append(`teamMembers[${i}][teamMemberLinkedIn]`, m.linkedin ?? '');
    }

    /* ───────────────────────── Section 4 – Idea summary ───────────────────────── */
    fd.append('challengeSolving', data.creativeIndustryChallenge);
    fd.append('challengeAims', data.distributionChallenge);
    fd.append('solutionEnvision', data.solutionVision);
    fd.append('uniquelyPositioned', data.teamPositioning);

    /* ───────────────────────── Section 5 – Logistics ───────────────────────── */
    fd.append('teamAvailability', yesNo(data.allMembersAvailable));
    fd.append(
      'teamAvailabilityDesc',
      data.allMembersAvailable ? (data.availabilityExplanation ?? '') : ''
    );

    fd.append('dietaryRestrictions', yesNo(data.hasDietaryRestrictions));
    fd.append(
      'dietaryRestrictionsDesc',
      data.hasDietaryRestrictions ? (data.dietaryNeeds ?? '') : ''
    );

    /* ───────────────────────── Section 6 – Declarations & signature ───────────────── */
    data.declarations.forEach((d, idx) => fd.append(`declarations[${idx}]`, d));
    fd.append('teamLeadSignature', data.teamLeadSignature);

    return fd;
  }
}

// Export singleton instance
export const registrationService = new RegistrationService();
