import { apiService } from "./api";
import type { HackathonForm, ApiResponse } from "./apiType";

export interface HackathonRegistrationResponse {
  id: string;
  status: "submitted" | "pending" | "approved" | "rejected";
  submittedAt: string;
  message?: string;
}

export class HackathonService {
  /**
   * Submits hackathon registration form data to the API
   */
  async submitRegistration(
    formData: HackathonForm
  ): Promise<ApiResponse<HackathonRegistrationResponse>> {
    try {
      // Validate required fields before submission
      this.validateFormData(formData);

      // Convert HackathonForm to FormData
      const form = new FormData();
      form.append("teamName", formData.teamName);
      form.append("teamSize", formData.teamSize);
      form.append("countryOfResidence", formData.countryOfResidence);
      form.append("hackathonExperience", formData.hackathonExperience);
      form.append("hackathonExperienceDesc", formData.hackathonExperienceDesc);
      form.append("teamLeaderFullName", formData.teamLeaderFullName);
      form.append("teamLeaderPhone", formData.teamLeaderPhone);
      form.append("teamLeaderEmail", formData.teamLeaderEmail);
      form.append("teamLeaderLinkedIn", formData.teamLeaderLinkedIn);
      form.append("teamLeaderRole", formData.teamLeaderRole);
      formData.teamMembers.forEach((member, index) => {
        form.append(`teamMembers[${index}][teamMemberFullName]`, member.teamMemberFullName);
        form.append(`teamMembers[${index}][teamMemberEmail]`, member.teamMemberEmail);
        form.append(`teamMembers[${index}][teamMemberPhone]`, member.teamMemberPhone);
        form.append(`teamMembers[${index}][teamMemberRole]`, member.teamMemberRole);
        form.append(`teamMembers[${index}][teamMemberLinkedIn]`, member.teamMemberLinkedIn);
      });
      form.append("challengeSolving", formData.challengeSolving);
      form.append("challengeAims", formData.challengeAims);
      form.append("solutionEnvision", formData.solutionEnvision);
      form.append("uniquelyPositioned", formData.uniquelyPositioned);
      form.append("teamAvailability", formData.teamAvailability);
      form.append("teamAvailabilityDesc", formData.teamAvailabilityDesc);
      form.append("dietaryRestrictions", formData.dietaryRestrictions);
      form.append("dietaryRestrictionsDesc", formData.dietaryRestrictionsDesc);
      formData.declarations.forEach((declaration, index) => {
        form.append(`declarations[${index}]`, declaration);
      });
      form.append("teamLeadSignature", formData.teamLeadSignature);

      console.log("Submitting hackathon registration data:", formData);

      // Submit to the API endpoint
      const response = await apiService.publicPost<HackathonRegistrationResponse>(
        "/api/hackathon",
        form
      );

      if (response.success) {
        console.log("Hackathon registration submitted successfully:", response);
      }

      return response;
    } catch (error) {
      console.error("Hackathon registration submission error:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit hackathon registration form. Please try again.",
      };
    }
  }

  /**
   * Validates required form data before submission
   */
  private validateFormData(data: HackathonForm): void {
    if (!data.teamName?.trim()) {
      throw new Error("Team name is required");
    }
    if (!data.teamLeaderFullName?.trim()) {
      throw new Error("Team leader name is required");
    }
    if (!data.teamLeaderEmail?.trim()) {
      throw new Error("Team leader email is required");
    }
    if (!data.teamLeaderPhone?.trim()) {
      throw new Error("Team leader phone is required");
    }
    if (!data.teamLeadSignature?.trim()) {
      throw new Error("Team lead signature is required");
    }
    if (!data.declarations?.length || data.declarations.length < 3) {
      throw new Error("All required declarations must be accepted");
    }
  }

  /**
   * Get registration status by ID
   */
  async getRegistrationStatus(
    registrationId: string
  ): Promise<ApiResponse<HackathonRegistrationResponse>> {
    try {
      const response = await apiService.publicPost<HackathonRegistrationResponse>(
        `/api/hackathon/registration/${registrationId}/status`
      );

      return response;
    } catch (error) {
      console.error("Error fetching registration status:", error);
      return {
        success: false,
        message: "Failed to fetch registration status",
      };
    }
  }
}

// Export singleton instance
export const hackathonService = new HackathonService();