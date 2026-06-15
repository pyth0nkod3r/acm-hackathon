/**
 * Registration Service tests
 * Tests registration form submission, data formatting, and error handling
 * Aligned with the 2026 RegistrationFormData schema and RegistrationService implementation.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegistrationService } from '../registrationService';
import { APIService } from '../api';
import type { RegistrationFormData } from '../../lib/validations';

// Mock the base API service
vi.mock('../api', () => ({
  APIService: class MockAPIService {
    protected post = vi.fn();
    protected postFormData = vi.fn();
  },
}));

// Mock API configuration
vi.mock('../../config/api', () => ({
  apiConfig: {
    formEndpoints: {
      registration: '/api/registration',
    },
  },
}));

// ---------------------------------------------------------------------------
// Helpers: minimal valid team member (matches teamMemberSchema: name, email,
// phone, role, linkedin only)
// ---------------------------------------------------------------------------
const validTeamMember = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  phone: '+1234567891',
  role: 'Software Developer',
  linkedin: 'https://linkedin.com/in/janesmith',
};

// ---------------------------------------------------------------------------
// Minimal valid registration payload matching RegistrationFormData (2026)
// ---------------------------------------------------------------------------
const mockRegistrationData: RegistrationFormData = {
  // Section 1 – Team information
  teamName: 'Test Team',
  teamSize: 2,
  countryOfResidence: 'Zambia',
  hackathonExperience: 'no',

  // Section 2 – Team lead
  teamLeader: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    role: 'Team Leader',
    linkedin: 'https://linkedin.com/in/johndoe',
  },

  // Section 3 – Team members (optional in schema)
  teamMembers: [validTeamMember],

  // Section 4 – Idea summary
  creativeIndustryChallenge:
    'High data costs prevent African youth from accessing online gaming.',
  distributionChallenge:
    'The lack of affordable data plans and poor infrastructure creates a barrier that prevents millions of young Africans from accessing competitive gaming platforms and esports communities.',
  solutionVision:
    'Build a lightweight, low-bandwidth gaming platform optimised for African mobile networks that can run on limited data and deliver a smooth esports experience.',
  teamPositioning:
    'Our team combines software engineering, UX and gaming strategy to build Africa-first connectivity solutions.',

  // Section 5 – Logistics
  allMembersAvailable: true,
  hasDietaryRestrictions: false,

  // Section 6 – Declarations & signature
  declarations: [
    'I confirm all information provided is accurate and complete.',
    'I agree to the terms and conditions of the ACM Hackathon 2026.',
    'I acknowledge that all team members are between 20 and 35 years of age.',
  ],
  teamLeadSignature: 'John Doe',
};

describe('RegistrationService', () => {
  let registrationService: RegistrationService;
  let mockPostFormData: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    registrationService = new RegistrationService();

    // Get references to the mocked methods
    const MockAPIService = APIService as any;
    const instance = new MockAPIService();
    mockPostFormData = instance.postFormData;

    // Replace the service's method with our mock
    registrationService['postFormData'] = mockPostFormData;
  });

  // -------------------------------------------------------------------------
  describe('submitRegistration', () => {
    it('submits registration successfully via FormData', async () => {
      mockPostFormData.mockResolvedValue({
        success: true,
        data: { id: '123', status: 'submitted' },
      });

      const result =
        await registrationService.submitRegistration(mockRegistrationData);

      expect(mockPostFormData).toHaveBeenCalledWith(
        '/api/registration',
        expect.any(FormData)
      );
      expect(result).toEqual({
        success: true,
        data: { id: '123', status: 'submitted' },
      });
    });

    it('transforms team information into FormData fields', async () => {
      mockPostFormData.mockResolvedValue({ success: true });

      await registrationService.submitRegistration(mockRegistrationData);

      const formDataCall = mockPostFormData.mock.calls[0]!;
      const formData = formDataCall[1] as FormData;

      expect(formData.get('teamName')).toBe('Test Team');
      expect(formData.get('teamSize')).toBe('2');
      expect(formData.get('countryOfResidence')).toBe('Zambia');
      expect(formData.get('hackathonExperience')).toBe('No');
    });

    it('transforms team leader into FormData fields', async () => {
      mockPostFormData.mockResolvedValue({ success: true });

      await registrationService.submitRegistration(mockRegistrationData);

      const formDataCall = mockPostFormData.mock.calls[0]!;
      const formData = formDataCall[1] as FormData;

      expect(formData.get('teamLeaderFullName')).toBe('John Doe');
      expect(formData.get('teamLeaderEmail')).toBe('john@example.com');
      expect(formData.get('teamLeaderPhone')).toBe('+1234567890');
      expect(formData.get('teamLeaderRole')).toBe('Team Leader');
    });

    it('transforms team member into indexed FormData fields', async () => {
      mockPostFormData.mockResolvedValue({ success: true });

      await registrationService.submitRegistration(mockRegistrationData);

      const formDataCall = mockPostFormData.mock.calls[0]!;
      const formData = formDataCall[1] as FormData;

      // teamSize=2, so 1 member expected at index 0
      expect(formData.get('teamMembers[0][teamMemberFullName]')).toBe(
        'Jane Smith'
      );
      expect(formData.get('teamMembers[0][teamMemberEmail]')).toBe(
        'jane@example.com'
      );
    });

    it('transforms idea summary fields into FormData', async () => {
      mockPostFormData.mockResolvedValue({ success: true });

      await registrationService.submitRegistration(mockRegistrationData);

      const formDataCall = mockPostFormData.mock.calls[0]!;
      const formData = formDataCall[1] as FormData;

      expect(formData.get('challengeSolving')).toBeTruthy();
      expect(formData.get('challengeAims')).toBeTruthy();
      expect(formData.get('solutionEnvision')).toBeTruthy();
      expect(formData.get('uniquelyPositioned')).toBeTruthy();
    });

    it('transforms declarations into indexed FormData fields', async () => {
      mockPostFormData.mockResolvedValue({ success: true });

      await registrationService.submitRegistration(mockRegistrationData);

      const formDataCall = mockPostFormData.mock.calls[0]!;
      const formData = formDataCall[1] as FormData;

      expect(formData.get('declarations[0]')).toBeTruthy();
      expect(formData.get('declarations[1]')).toBeTruthy();
      expect(formData.get('declarations[2]')).toBeTruthy();
      expect(formData.get('teamLeadSignature')).toBe('John Doe');
    });

    it('converts hackathonExperience "yes" to "Yes" in FormData', async () => {
      mockPostFormData.mockResolvedValue({ success: true });

      const dataWithExperience: RegistrationFormData = {
        ...mockRegistrationData,
        hackathonExperience: 'yes',
        hackathonExperienceDetails: 'Built a fintech app at HackLagos 2024.',
      };

      await registrationService.submitRegistration(dataWithExperience);

      const formDataCall = mockPostFormData.mock.calls[0]!;
      const formData = formDataCall[1] as FormData;

      expect(formData.get('hackathonExperience')).toBe('Yes');
      expect(formData.get('hackathonExperienceDesc')).toBe(
        'Built a fintech app at HackLagos 2024.'
      );
    });

    it('handles API error response correctly', async () => {
      mockPostFormData.mockResolvedValue({
        success: false,
        message: 'Server validation failed',
      });

      const result =
        await registrationService.submitRegistration(mockRegistrationData);

      expect(result).toEqual({
        success: false,
        message: 'Server validation failed',
      });
    });

    it('handles network errors correctly', async () => {
      mockPostFormData.mockRejectedValue(new Error('Network error'));

      const result =
        await registrationService.submitRegistration(mockRegistrationData);

      expect(result).toEqual({
        success: false,
        message: 'Network error',
      });
    });

    it('returns error when team leader name is missing', async () => {
      const incompleteData: RegistrationFormData = {
        ...mockRegistrationData,
        teamLeader: { ...mockRegistrationData.teamLeader, name: '' },
      };

      const result =
        await registrationService.submitRegistration(incompleteData);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Team leader name is required');
    });

    it('returns error when team leader email is missing', async () => {
      const incompleteData: RegistrationFormData = {
        ...mockRegistrationData,
        teamLeader: { ...mockRegistrationData.teamLeader, email: '' },
      };

      const result =
        await registrationService.submitRegistration(incompleteData);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Team leader email is required');
    });

    it('returns error when team leader phone is missing', async () => {
      const incompleteData: RegistrationFormData = {
        ...mockRegistrationData,
        teamLeader: { ...mockRegistrationData.teamLeader, phone: '' },
      };

      const result =
        await registrationService.submitRegistration(incompleteData);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Team leader phone is required');
    });

    it('returns error when team name is missing', async () => {
      const incompleteData: RegistrationFormData = {
        ...mockRegistrationData,
        teamName: '',
      };

      const result =
        await registrationService.submitRegistration(incompleteData);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Team name is required');
    });

    it('returns error when digital signature is missing', async () => {
      const incompleteData: RegistrationFormData = {
        ...mockRegistrationData,
        teamLeadSignature: '',
      };

      const result =
        await registrationService.submitRegistration(incompleteData);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Digital signature is required');
    });

    it('returns error when fewer than 3 declarations are provided', async () => {
      const incompleteData: RegistrationFormData = {
        ...mockRegistrationData,
        declarations: ['Only one declaration accepted.', 'And a second one.'],
      };

      const result =
        await registrationService.submitRegistration(incompleteData);

      expect(result.success).toBe(false);
      expect(result.message).toContain(
        'All required declarations must be accepted'
      );
    });

    it('returns error when declarations array is empty', async () => {
      const incompleteData: RegistrationFormData = {
        ...mockRegistrationData,
        declarations: [],
      };

      const result =
        await registrationService.submitRegistration(incompleteData);

      expect(result.success).toBe(false);
    });

    it('includes empty hackathonExperienceDesc when hackathonExperience is "no"', async () => {
      mockPostFormData.mockResolvedValue({ success: true });

      await registrationService.submitRegistration(mockRegistrationData);

      const formDataCall = mockPostFormData.mock.calls[0]!;
      const formData = formDataCall[1] as FormData;

      // hackathonExperience is 'no', so desc should be empty string
      expect(formData.get('hackathonExperienceDesc')).toBe('');
    });

    it('converts allMembersAvailable boolean to "Yes"/"No" string', async () => {
      mockPostFormData.mockResolvedValue({ success: true });

      const withUnavailable: RegistrationFormData = {
        ...mockRegistrationData,
        allMembersAvailable: false,
        availabilityExplanation: 'One member travels June 30.',
      };

      await registrationService.submitRegistration(withUnavailable);

      const formDataCall = mockPostFormData.mock.calls[0]!;
      const formData = formDataCall[1] as FormData;

      expect(formData.get('teamAvailability')).toBe('No');
    });

    it('converts hasDietaryRestrictions boolean to "Yes"/"No" string', async () => {
      mockPostFormData.mockResolvedValue({ success: true });

      const withDietary: RegistrationFormData = {
        ...mockRegistrationData,
        hasDietaryRestrictions: true,
        dietaryNeeds: 'Vegan',
      };

      await registrationService.submitRegistration(withDietary);

      const formDataCall = mockPostFormData.mock.calls[0]!;
      const formData = formDataCall[1] as FormData;

      expect(formData.get('dietaryRestrictions')).toBe('Yes');
      expect(formData.get('dietaryRestrictionsDesc')).toBe('Vegan');
    });
  });

  // -------------------------------------------------------------------------
  describe('validateFormData (private)', () => {
    it('does not throw for valid complete data', () => {
      expect(() =>
        registrationService['validateFormData'](mockRegistrationData)
      ).not.toThrow();
    });

    it('throws when team leader name is empty', () => {
      const bad: RegistrationFormData = {
        ...mockRegistrationData,
        teamLeader: { ...mockRegistrationData.teamLeader, name: '' },
      };
      expect(() => registrationService['validateFormData'](bad)).toThrow(
        'Team leader name is required'
      );
    });

    it('throws when team leader email is empty', () => {
      const bad: RegistrationFormData = {
        ...mockRegistrationData,
        teamLeader: { ...mockRegistrationData.teamLeader, email: '' },
      };
      expect(() => registrationService['validateFormData'](bad)).toThrow(
        'Team leader email is required'
      );
    });

    it('throws when team name is empty', () => {
      const bad: RegistrationFormData = {
        ...mockRegistrationData,
        teamName: '   ',
      };
      expect(() => registrationService['validateFormData'](bad)).toThrow(
        'Team name is required'
      );
    });

    it('throws when digital signature is empty', () => {
      const bad: RegistrationFormData = {
        ...mockRegistrationData,
        teamLeadSignature: '',
      };
      expect(() => registrationService['validateFormData'](bad)).toThrow(
        'Digital signature is required'
      );
    });

    it('throws when fewer than 3 declarations provided', () => {
      const bad: RegistrationFormData = {
        ...mockRegistrationData,
        declarations: ['Only one.', 'Only two.'],
      };
      expect(() => registrationService['validateFormData'](bad)).toThrow(
        'All required declarations must be accepted'
      );
    });
  });

  // -------------------------------------------------------------------------
  describe('transformToFormData (private)', () => {
    it('creates a FormData instance', () => {
      const fd = registrationService['transformToFormData'](mockRegistrationData);
      expect(fd).toBeInstanceOf(FormData);
    });

    it('includes teamName in FormData', () => {
      const fd = registrationService['transformToFormData'](mockRegistrationData);
      expect(fd.get('teamName')).toBe('Test Team');
    });

    it('includes teamLeaderFullName in FormData', () => {
      const fd = registrationService['transformToFormData'](mockRegistrationData);
      expect(fd.get('teamLeaderFullName')).toBe('John Doe');
    });

    it('includes teamLeadSignature in FormData', () => {
      const fd = registrationService['transformToFormData'](mockRegistrationData);
      expect(fd.get('teamLeadSignature')).toBe('John Doe');
    });

    it('populates member slots up to teamSize - 1', () => {
      const fd = registrationService['transformToFormData'](mockRegistrationData);
      // teamSize=2, expects index 0 only
      expect(fd.get('teamMembers[0][teamMemberFullName]')).toBe('Jane Smith');
      // index 1 should not exist (teamSize-1 = 1 member)
      expect(fd.get('teamMembers[1][teamMemberFullName]')).toBeNull();
    });

    it('sets empty strings for missing optional member slots', () => {
      // teamSize=3 but only 1 member supplied
      const data: RegistrationFormData = {
        ...mockRegistrationData,
        teamSize: 3,
        teamMembers: [validTeamMember],
      };
      const fd = registrationService['transformToFormData'](data);
      // index 0: from supplied member
      expect(fd.get('teamMembers[0][teamMemberFullName]')).toBe('Jane Smith');
      // index 1: should fall back to empty string
      expect(fd.get('teamMembers[1][teamMemberFullName]')).toBe('');
    });
  });
});
