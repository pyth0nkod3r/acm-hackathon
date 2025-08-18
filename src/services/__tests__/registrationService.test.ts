/**
 * Registration Service tests
 * Tests registration form submission, data formatting, and error handling
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegistrationService } from '../registrationService';
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

describe('RegistrationService', () => {
  let registrationService: RegistrationService;
  let mockPost: ReturnType<typeof vi.fn>;
  let mockPostFormData: ReturnType<typeof vi.fn>;

  const mockRegistrationData: RegistrationFormData = {
    teamName: 'Test Team',
    teamSize: 2,
    teamLeader: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      role: 'Team Leader',
      linkedin: 'https://linkedin.com/in/johndoe',
      country: 'Ghana',
      nationality: 'Ghanaian',
      age: 28,
      gender: 'Male',
    },
    teamMembers: [
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1234567891',
        role: 'Developer',
        linkedin: 'https://linkedin.com/in/janesmith',
        country: 'Nigeria',
        nationality: 'Nigerian',
        age: 26,
        gender: 'Female',
      },
    ],
    projectTitle: 'Digital Trade Platform',
    ideaSummary: 'A platform to facilitate digital trade across Africa',
    problemSolving: 'Solving cross-border payment challenges in African trade',
    technology: 'React, Node.js, Blockchain',
    alignment: 'Aligns with AfCFTA digital trade objectives',
    hasPrototype: true,
    prototypeURL: 'https://prototype.example.com',
    projectRepo: 'https://github.com/team/project',
    challengeAreas: ['Digital Trade Infrastructure', 'Cross-border Payments'],
    declarations: [
      'I confirm that all information provided is accurate and complete',
      'I agree to the terms and conditions of the hackathon',
    ],
    fileUpload: new File(['test'], 'test.pdf', { type: 'application/pdf' }),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    registrationService = new RegistrationService();

    // Get references to the mocked methods
    const MockAPIService = require('../api').APIService;
    const instance = new MockAPIService();
    mockPost = instance.post;
    mockPostFormData = instance.postFormData;

    // Replace the service's methods with our mocks
    registrationService['post'] = mockPost;
    registrationService['postFormData'] = mockPostFormData;
  });

  describe('submitRegistration', () => {
    it('submits registration with file upload successfully', async () => {
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

    it('submits registration without file upload successfully', async () => {
      const dataWithoutFile = { ...mockRegistrationData };
      delete dataWithoutFile.fileUpload;

      mockPost.mockResolvedValue({
        success: true,
        data: { id: '124', status: 'submitted' },
      });

      const result =
        await registrationService.submitRegistration(dataWithoutFile);

      expect(mockPost).toHaveBeenCalledWith(
        '/api/registration',
        expect.any(Object)
      );
      expect(result).toEqual({
        success: true,
        data: { id: '124', status: 'submitted' },
      });
    });

    it('formats registration data correctly for JSON submission', async () => {
      const dataWithoutFile = { ...mockRegistrationData };
      delete dataWithoutFile.fileUpload;

      mockPost.mockResolvedValue({
        success: true,
        data: { id: '125', status: 'submitted' },
      });

      await registrationService.submitRegistration(dataWithoutFile);

      expect(mockPost).toHaveBeenCalledWith('/api/registration', {
        teamName: 'Test Team',
        teamSize: 2,
        teamLeader: mockRegistrationData.teamLeader,
        teamMembers: mockRegistrationData.teamMembers,
        projectTitle: 'Digital Trade Platform',
        ideaSummary: 'A platform to facilitate digital trade across Africa',
        problemSolving:
          'Solving cross-border payment challenges in African trade',
        technology: 'React, Node.js, Blockchain',
        alignment: 'Aligns with AfCFTA digital trade objectives',
        hasPrototype: true,
        prototypeURL: 'https://prototype.example.com',
        projectRepo: 'https://github.com/team/project',
        challengeAreas: [
          'Digital Trade Infrastructure',
          'Cross-border Payments',
        ],
        declarations: [
          'I confirm that all information provided is accurate and complete',
          'I agree to the terms and conditions of the hackathon',
        ],
      });
    });

    it('formats registration data correctly for FormData submission', async () => {
      mockPostFormData.mockResolvedValue({
        success: true,
        data: { id: '126', status: 'submitted' },
      });

      await registrationService.submitRegistration(mockRegistrationData);

      const formDataCall = mockPostFormData.mock.calls[0];
      const formData = formDataCall[1] as FormData;

      expect(formData.get('teamName')).toBe('Test Team');
      expect(formData.get('teamSize')).toBe('2');
      expect(formData.get('projectTitle')).toBe('Digital Trade Platform');
      expect(formData.get('hasPrototype')).toBe('true');
      expect(formData.get('file')).toBeInstanceOf(File);

      // Check that complex objects are JSON stringified
      const teamLeaderData = JSON.parse(formData.get('teamLeader') as string);
      expect(teamLeaderData).toEqual(mockRegistrationData.teamLeader);

      const teamMembersData = JSON.parse(formData.get('teamMembers') as string);
      expect(teamMembersData).toEqual(mockRegistrationData.teamMembers);

      const challengeAreasData = JSON.parse(
        formData.get('challengeAreas') as string
      );
      expect(challengeAreasData).toEqual(mockRegistrationData.challengeAreas);
    });

    it('handles API errors correctly', async () => {
      mockPost.mockResolvedValue({
        success: false,
        message: 'Validation failed',
      });

      const dataWithoutFile = { ...mockRegistrationData };
      delete dataWithoutFile.fileUpload;

      const result =
        await registrationService.submitRegistration(dataWithoutFile);

      expect(result).toEqual({
        success: false,
        message: 'Validation failed',
      });
    });

    it('handles network errors correctly', async () => {
      mockPost.mockRejectedValue(new Error('Network error'));

      const dataWithoutFile = { ...mockRegistrationData };
      delete dataWithoutFile.fileUpload;

      const result =
        await registrationService.submitRegistration(dataWithoutFile);

      expect(result).toEqual({
        success: false,
        message: 'Failed to submit registration. Please try again.',
      });
    });

    it('handles file upload errors correctly', async () => {
      mockPostFormData.mockRejectedValue(new Error('File upload failed'));

      const result =
        await registrationService.submitRegistration(mockRegistrationData);

      expect(result).toEqual({
        success: false,
        message: 'Failed to submit registration. Please try again.',
      });
    });

    it('validates required fields', async () => {
      const incompleteData = {
        ...mockRegistrationData,
        teamName: '',
        teamLeader: {
          ...mockRegistrationData.teamLeader,
          email: '',
        },
      };

      const result =
        await registrationService.submitRegistration(incompleteData);

      expect(result).toEqual({
        success: false,
        message: 'Please fill in all required fields.',
      });
    });

    it('validates email format', async () => {
      const invalidEmailData = {
        ...mockRegistrationData,
        teamLeader: {
          ...mockRegistrationData.teamLeader,
          email: 'invalid-email',
        },
      };

      const result =
        await registrationService.submitRegistration(invalidEmailData);

      expect(result).toEqual({
        success: false,
        message: 'Please provide valid email addresses.',
      });
    });

    it('validates team member emails', async () => {
      const invalidTeamMemberEmailData = {
        ...mockRegistrationData,
        teamMembers: [
          {
            ...mockRegistrationData.teamMembers[0],
            email: 'invalid-email',
          },
        ],
      };

      const result = await registrationService.submitRegistration(
        invalidTeamMemberEmailData
      );

      expect(result).toEqual({
        success: false,
        message: 'Please provide valid email addresses.',
      });
    });

    it('validates challenge areas selection', async () => {
      const noChallengeAreasData = {
        ...mockRegistrationData,
        challengeAreas: [],
      };

      const result =
        await registrationService.submitRegistration(noChallengeAreasData);

      expect(result).toEqual({
        success: false,
        message: 'Please select at least one challenge area.',
      });
    });

    it('validates declarations acceptance', async () => {
      const noDeclarationsData = {
        ...mockRegistrationData,
        declarations: [],
      };

      const result =
        await registrationService.submitRegistration(noDeclarationsData);

      expect(result).toEqual({
        success: false,
        message: 'Please accept all required declarations.',
      });
    });

    it('validates file size limits', async () => {
      const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.pdf', {
        type: 'application/pdf',
      });

      const largeFileData = {
        ...mockRegistrationData,
        fileUpload: largeFile,
      };

      const result =
        await registrationService.submitRegistration(largeFileData);

      expect(result).toEqual({
        success: false,
        message: 'File size must be less than 10MB.',
      });
    });

    it('validates file types', async () => {
      const invalidFile = new File(['test'], 'test.exe', {
        type: 'application/x-executable',
      });

      const invalidFileData = {
        ...mockRegistrationData,
        fileUpload: invalidFile,
      };

      const result =
        await registrationService.submitRegistration(invalidFileData);

      expect(result).toEqual({
        success: false,
        message:
          'Please upload a valid document file (PDF, DOC, DOCX, PPT, PPTX).',
      });
    });

    it('handles prototype URL validation when prototype exists', async () => {
      const invalidPrototypeData = {
        ...mockRegistrationData,
        hasPrototype: true,
        prototypeURL: '',
      };

      const result =
        await registrationService.submitRegistration(invalidPrototypeData);

      expect(result).toEqual({
        success: false,
        message: 'Please provide a prototype URL when prototype exists.',
      });
    });

    it('allows empty prototype URL when no prototype exists', async () => {
      const noPrototypeData = {
        ...mockRegistrationData,
        hasPrototype: false,
        prototypeURL: '',
      };

      delete noPrototypeData.fileUpload;

      mockPost.mockResolvedValue({
        success: true,
        data: { id: '127', status: 'submitted' },
      });

      const result =
        await registrationService.submitRegistration(noPrototypeData);

      expect(result.success).toBe(true);
    });

    it('handles minimum team member age validation', async () => {
      const youngTeamMemberData = {
        ...mockRegistrationData,
        teamLeader: {
          ...mockRegistrationData.teamLeader,
          age: 16,
        },
      };

      const result =
        await registrationService.submitRegistration(youngTeamMemberData);

      expect(result).toEqual({
        success: false,
        message: 'All team members must be at least 18 years old.',
      });
    });

    it('handles team size validation', async () => {
      const oversizedTeamData = {
        ...mockRegistrationData,
        teamSize: 6,
        teamMembers: new Array(5).fill(mockRegistrationData.teamMembers[0]),
      };

      const result =
        await registrationService.submitRegistration(oversizedTeamData);

      expect(result).toEqual({
        success: false,
        message: 'Team size cannot exceed 5 members.',
      });
    });
  });

  describe('formatRegistrationData', () => {
    it('formats data for JSON submission correctly', () => {
      const dataWithoutFile = { ...mockRegistrationData };
      delete dataWithoutFile.fileUpload;

      const formatted =
        registrationService['formatRegistrationData'](dataWithoutFile);

      expect(formatted).toEqual({
        teamName: 'Test Team',
        teamSize: 2,
        teamLeader: mockRegistrationData.teamLeader,
        teamMembers: mockRegistrationData.teamMembers,
        projectTitle: 'Digital Trade Platform',
        ideaSummary: 'A platform to facilitate digital trade across Africa',
        problemSolving:
          'Solving cross-border payment challenges in African trade',
        technology: 'React, Node.js, Blockchain',
        alignment: 'Aligns with AfCFTA digital trade objectives',
        hasPrototype: true,
        prototypeURL: 'https://prototype.example.com',
        projectRepo: 'https://github.com/team/project',
        challengeAreas: [
          'Digital Trade Infrastructure',
          'Cross-border Payments',
        ],
        declarations: [
          'I confirm that all information provided is accurate and complete',
          'I agree to the terms and conditions of the hackathon',
        ],
      });
    });
  });

  describe('createFormData', () => {
    it('creates FormData correctly with file', () => {
      const formData =
        registrationService['createFormData'](mockRegistrationData);

      expect(formData.get('teamName')).toBe('Test Team');
      expect(formData.get('file')).toBeInstanceOf(File);
      expect(formData.get('teamLeader')).toBe(
        JSON.stringify(mockRegistrationData.teamLeader)
      );
    });
  });
});
