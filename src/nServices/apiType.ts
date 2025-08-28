interface TeamMember {
  teamMemberFullName: string;
  teamMemberEmail: string;
  teamMemberPhone: string;
  teamMemberRole: string;
  teamMemberLinkedIn: string;
}

export interface HackathonForm {
  teamName: string;
  teamSize: string;
  countryOfResidence: string;
  hackathonExperience: string;
  hackathonExperienceDesc: string;
  teamLeaderFullName: string;
  teamLeaderPhone: string;
  teamLeaderEmail: string;
  teamLeaderLinkedIn: string;
  teamLeaderRole: string;
  teamMembers: TeamMember[];
  challengeSolving: string;
  challengeAims: string;
  solutionEnvision: string;
  uniquelyPositioned: string;
  teamAvailability: string;
  teamAvailabilityDesc: string;
  dietaryRestrictions: string;
  dietaryRestrictionsDesc: string;
  declarations: string[];
  teamLeadSignature: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string | number;
    message?: unknown;
    statusCode?: number;
  }