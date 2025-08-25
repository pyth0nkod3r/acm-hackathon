/**
 * Registration form submission service
 */

import { APIService } from './api';
import type { RegistrationFormData } from '../types/forms';
import type { APIResponse, FormSubmissionResponse } from '../types/api';
import { apiConfig } from '../config/api';

export class RegistrationService extends APIService {
  /**
   * Submits registration form data
   */
  async submitRegistration(
    formData: RegistrationFormData
  ): Promise<APIResponse<FormSubmissionResponse>> {
    try {
      // Format and validate form data before submission
      const formattedData = this.formatRegistrationData(formData);

      // Validate required fields
      const validationResult = this.validateRegistrationData(formattedData);
      if (!validationResult.isValid) {
        return {
          success: false,
          message: validationResult.errors[0]?.message || 'Validation failed',
          messages: validationResult.errors.reduce(
            (acc, error) => {
              acc[error.field] = error.message;
              return acc;
            },
            {} as Record<string, string>
          ),
        };
      }

      // Handle file upload if present
      if (formData.fileUpload) {
        return this.submitRegistrationWithFile(
          formattedData,
          formData.fileUpload
        );
      }

      // Submit without file
      return this.post<FormSubmissionResponse>(
        apiConfig.formEndpoints.registration,
        formattedData
      );
    } catch {
      return {
        success: false,
        message: 'Failed to submit registration form',
      };
    }
  }

  /**
   * Submits registration with file upload
   */
  private async submitRegistrationWithFile(
    formData: Omit<RegistrationFormData, 'fileUpload'>,
    file: File
  ): Promise<APIResponse<FormSubmissionResponse>> {
    const formDataObj = new FormData();

    // Add form fields
    formDataObj.append('data', JSON.stringify(formData));

    // Add file
    formDataObj.append('file', file);

    return this.postFormData<FormSubmissionResponse>(
      apiConfig.formEndpoints.registration,
      formDataObj
    );
  }

  /**
   * Formats registration data for API submission
   */
  private formatRegistrationData(
    data: RegistrationFormData
  ): Omit<RegistrationFormData, 'fileUpload'> {
    const formatted: Omit<RegistrationFormData, 'fileUpload'> = {
      teamName: data.teamName.trim(),
      teamSize: data.teamSize,
      teamLeader: this.formatTeamMember(data.teamLeader),
      teamMembers: data.teamMembers.map(member =>
        this.formatTeamMember(member)
      ),
      projectTitle: data.projectTitle.trim(),
      ideaSummary: data.ideaSummary.trim(),
      problemSolving: data.problemSolving.trim(),
      technology: data.technology.trim(),
      alignment: data.alignment.trim(),
      hasPrototype: data.hasPrototype,
      challengeAreas: data.challengeAreas.filter(
        area => area.trim().length > 0
      ),
      declarations: data.declarations.filter(
        declaration => declaration.trim().length > 0
      ),
    };

    // Only add optional fields if they have values
    if (data.prototypeURL?.trim()) {
      formatted.prototypeURL = data.prototypeURL.trim();
    }

    if (data.projectRepo?.trim()) {
      formatted.projectRepo = data.projectRepo.trim();
    }

    return formatted;
  }

  /**
   * Formats team member data
   */
  private formatTeamMember(member: {
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
    linkedin?: string;
    country?: string;
    nationality?: string;
    age?: number | string;
    gender?: string;
  }) {
    const formatted: {
      name: string;
      email: string;
      phone: string;
      role: string;
      country: string;
      nationality: string;
      age: number;
      linkedin?: string;
      gender?: string;
    } = {
      name: member.name?.trim() || '',
      email: member.email?.trim().toLowerCase() || '',
      phone: member.phone?.trim() || '',
      role: member.role?.trim() || '',
      country: member.country?.trim() || '',
      nationality: member.nationality?.trim() || '',
      age: parseInt(member.age?.toString() || '0', 10),
    };

    if (member.linkedin?.trim()) {
      formatted.linkedin = member.linkedin.trim();
    }

    if (member.gender?.trim()) {
      formatted.gender = member.gender.trim();
    }

    return formatted;
  }

  /**
   * Validates registration data
   */
  private validateRegistrationData(
    data: Omit<RegistrationFormData, 'fileUpload'>
  ) {
    const errors: Array<{ field: string; message: string }> = [];

    // Team validation
    if (!data.teamName || data.teamName.length < 2) {
      errors.push({
        field: 'teamName',
        message: 'Team name must be at least 2 characters long',
      });
    }

    if (data.teamSize < 1 || data.teamSize > 5) {
      errors.push({
        field: 'teamSize',
        message: 'Team size must be between 1 and 5 members',
      });
    }

    // Team leader validation
    if (!this.isValidTeamMember(data.teamLeader)) {
      errors.push({
        field: 'teamLeader',
        message: 'Team leader information is incomplete',
      });
    }

    // Team members validation
    if (data.teamMembers.length !== data.teamSize - 1) {
      errors.push({
        field: 'teamMembers',
        message: `Expected ${data.teamSize - 1} team members, got ${data.teamMembers.length}`,
      });
    }

    data.teamMembers.forEach((member, index) => {
      if (!this.isValidTeamMember(member)) {
        errors.push({
          field: `teamMembers[${index}]`,
          message: `Team member ${index + 1} information is incomplete`,
        });
      }
    });

    // Project validation
    if (!data.projectTitle || data.projectTitle.length < 5) {
      errors.push({
        field: 'projectTitle',
        message: 'Project title must be at least 5 characters long',
      });
    }

    if (!data.ideaSummary || data.ideaSummary.length < 50) {
      errors.push({
        field: 'ideaSummary',
        message: 'Idea summary must be at least 50 characters long',
      });
    }

    if (!data.problemSolving || data.problemSolving.length < 50) {
      errors.push({
        field: 'problemSolving',
        message:
          'Problem solving description must be at least 50 characters long',
      });
    }

    if (!data.technology || data.technology.length < 10) {
      errors.push({
        field: 'technology',
        message: 'Technology description must be at least 10 characters long',
      });
    }

    if (!data.alignment || data.alignment.length < 50) {
      errors.push({
        field: 'alignment',
        message: 'Alignment description must be at least 50 characters long',
      });
    }

    // Challenge areas validation
    if (data.challengeAreas.length === 0) {
      errors.push({
        field: 'challengeAreas',
        message: 'At least one challenge area must be selected',
      });
    }

    // Declarations validation
    if (data.declarations.length === 0) {
      errors.push({
        field: 'declarations',
        message: 'All required declarations must be accepted',
      });
    }

    // URL validation
    if (data.prototypeURL && !this.isValidUrl(data.prototypeURL)) {
      errors.push({
        field: 'prototypeURL',
        message: 'Prototype URL is not valid',
      });
    }

    if (data.projectRepo && !this.isValidUrl(data.projectRepo)) {
      errors.push({
        field: 'projectRepo',
        message: 'Project repository URL is not valid',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validates team member data
   */
  private isValidTeamMember(member: {
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
    country?: string;
    nationality?: string;
    age?: number | string;
  }): boolean {
    return !!(
      member.name &&
      member.email &&
      this.isValidEmail(member.email) &&
      member.phone &&
      member.role &&
      member.country &&
      member.nationality &&
      member.age &&
      Number(member.age) >= 16 &&
      Number(member.age) <= 100
    );
  }

  /**
   * Validates email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates URL format
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const registrationService = new RegistrationService();
