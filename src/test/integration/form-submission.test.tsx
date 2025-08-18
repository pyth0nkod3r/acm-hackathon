/**
 * Integration tests for form submission workflows
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  renderWithProviders,
  mockApiResponses,
  createTestRegistrationData,
  createTestContactData,
  createMockFile,
} from './setup';
import { RegistrationForm } from '../../components/forms/RegistrationForm';
import { ContactForm } from '../../components/forms/ContactForm';
import { registrationService } from '../../services/registrationService';
import { contactService } from '../../services/contactService';

// Mock services
vi.mock('../../services/registrationService');
vi.mock('../../services/contactService');

describe('Form Submission Integration Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset fetch mock
    (global.fetch as any).mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Registration Form Submission', () => {
    it('should successfully submit registration form with valid data', async () => {
      // Mock successful API response
      const mockSubmit = vi
        .fn()
        .mockResolvedValue(mockApiResponses.registrationSuccess);
      vi.mocked(registrationService.submitRegistration).mockImplementation(
        mockSubmit
      );

      const onSubmit = vi.fn();
      renderWithProviders(<RegistrationForm onSubmit={onSubmit} />);

      // Fill out the form with valid data
      const testData = createTestRegistrationData();

      // Team information
      await user.type(screen.getByLabelText(/team name/i), testData.teamName);
      await user.selectOptions(
        screen.getByLabelText(/team size/i),
        testData.teamSize.toString()
      );

      // Team leader information
      await user.type(
        screen.getByLabelText(/leader name/i),
        testData.teamLeader.name
      );
      await user.type(
        screen.getByLabelText(/leader email/i),
        testData.teamLeader.email
      );
      await user.type(
        screen.getByLabelText(/leader phone/i),
        testData.teamLeader.phone
      );
      await user.type(
        screen.getByLabelText(/leader role/i),
        testData.teamLeader.role
      );
      await user.selectOptions(
        screen.getByLabelText(/leader country/i),
        testData.teamLeader.country
      );
      await user.type(
        screen.getByLabelText(/leader nationality/i),
        testData.teamLeader.nationality
      );
      await user.type(
        screen.getByLabelText(/leader age/i),
        testData.teamLeader.age.toString()
      );

      // Team member information (for team size 2)
      await user.type(
        screen.getByLabelText(/member 1 name/i),
        testData.teamMembers[0].name
      );
      await user.type(
        screen.getByLabelText(/member 1 email/i),
        testData.teamMembers[0].email
      );
      await user.type(
        screen.getByLabelText(/member 1 phone/i),
        testData.teamMembers[0].phone
      );
      await user.type(
        screen.getByLabelText(/member 1 role/i),
        testData.teamMembers[0].role
      );

      // Project information
      await user.type(
        screen.getByLabelText(/project title/i),
        testData.projectTitle
      );
      await user.type(
        screen.getByLabelText(/idea summary/i),
        testData.ideaSummary
      );
      await user.type(
        screen.getByLabelText(/problem solving/i),
        testData.problemSolving
      );
      await user.type(
        screen.getByLabelText(/technology/i),
        testData.technology
      );
      await user.type(screen.getByLabelText(/alignment/i), testData.alignment);

      // Challenge areas
      await user.click(screen.getByLabelText(testData.challengeAreas[0]));

      // Declarations
      await user.click(screen.getByLabelText(/terms and conditions/i));

      // Submit form
      const submitButton = screen.getByRole('button', {
        name: /submit application/i,
      });
      await user.click(submitButton);

      // Wait for submission
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            teamName: testData.teamName,
            projectTitle: testData.projectTitle,
          })
        );
      });

      // Verify success notification appears
      await waitFor(() => {
        expect(
          screen.getByText(/application submitted successfully/i)
        ).toBeInTheDocument();
      });
    });

    it('should handle registration form submission errors', async () => {
      // Mock API error response
      const mockSubmit = vi
        .fn()
        .mockResolvedValue(mockApiResponses.registrationError);
      vi.mocked(registrationService.submitRegistration).mockImplementation(
        mockSubmit
      );

      const onSubmit = vi.fn();
      renderWithProviders(<RegistrationForm onSubmit={onSubmit} />);

      // Fill out form with invalid data (missing required fields)
      await user.type(screen.getByLabelText(/team name/i), 'T'); // Too short

      // Submit form
      const submitButton = screen.getByRole('button', {
        name: /submit application/i,
      });
      await user.click(submitButton);

      // Wait for error handling
      await waitFor(() => {
        expect(screen.getByText(/team name is required/i)).toBeInTheDocument();
      });

      // Verify error notification appears
      await waitFor(() => {
        expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
      });
    });

    it('should handle file upload in registration form', async () => {
      const mockSubmit = vi
        .fn()
        .mockResolvedValue(mockApiResponses.registrationSuccess);
      vi.mocked(registrationService.submitRegistration).mockImplementation(
        mockSubmit
      );

      const onSubmit = vi.fn();
      renderWithProviders(<RegistrationForm onSubmit={onSubmit} />);

      // Fill out basic form data
      const testData = createTestRegistrationData();
      await user.type(screen.getByLabelText(/team name/i), testData.teamName);

      // Upload file
      const fileInput = screen.getByLabelText(/upload supporting document/i);
      const mockFile = createMockFile();
      await user.upload(fileInput, mockFile);

      // Verify file is selected
      expect(fileInput.files[0]).toBe(mockFile);
      expect(fileInput.files).toHaveLength(1);

      // Submit form (with minimal required data)
      // ... fill other required fields ...
      const submitButton = screen.getByRole('button', {
        name: /submit application/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            fileUpload: mockFile,
          })
        );
      });
    });

    it('should handle network errors during registration submission', async () => {
      // Mock network error
      const mockSubmit = vi.fn().mockRejectedValue(new Error('Network error'));
      vi.mocked(registrationService.submitRegistration).mockImplementation(
        mockSubmit
      );

      const onSubmit = vi.fn();
      renderWithProviders(<RegistrationForm onSubmit={onSubmit} />);

      // Fill out form with valid data
      const testData = createTestRegistrationData();
      await user.type(screen.getByLabelText(/team name/i), testData.teamName);
      // ... fill other required fields ...

      // Submit form
      const submitButton = screen.getByRole('button', {
        name: /submit application/i,
      });
      await user.click(submitButton);

      // Wait for error handling
      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });
    });
  });

  describe('Contact Form Submission', () => {
    it('should successfully submit contact form with valid data', async () => {
      // Mock successful API response
      const mockSubmit = vi
        .fn()
        .mockResolvedValue(mockApiResponses.contactSuccess);
      vi.mocked(contactService.submitContact).mockImplementation(mockSubmit);

      const onSubmit = vi.fn();
      renderWithProviders(<ContactForm onSubmit={onSubmit} />);

      // Fill out the form with valid data
      const testData = createTestContactData();

      await user.type(screen.getByLabelText(/name/i), testData.name);
      await user.type(screen.getByLabelText(/email/i), testData.email);
      await user.type(screen.getByLabelText(/subject/i), testData.subject);
      await user.type(screen.getByLabelText(/message/i), testData.message);

      // Submit form
      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Wait for submission
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            name: testData.name,
            email: testData.email,
            subject: testData.subject,
            message: testData.message,
          })
        );
      });

      // Verify success notification appears
      await waitFor(() => {
        expect(
          screen.getByText(/message sent successfully/i)
        ).toBeInTheDocument();
      });
    });

    it('should handle contact form validation errors', async () => {
      renderWithProviders(<ContactForm />);

      // Try to submit form without filling required fields
      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Wait for validation errors
      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/subject is required/i)).toBeInTheDocument();
        expect(screen.getByText(/message is required/i)).toBeInTheDocument();
      });
    });

    it('should handle contact form submission errors', async () => {
      // Mock API error response
      const mockSubmit = vi
        .fn()
        .mockResolvedValue(mockApiResponses.contactError);
      vi.mocked(contactService.submitContact).mockImplementation(mockSubmit);

      const onSubmit = vi.fn();
      renderWithProviders(<ContactForm onSubmit={onSubmit} />);

      // Fill out form with invalid email
      await user.type(screen.getByLabelText(/name/i), 'Test User');
      await user.type(screen.getByLabelText(/email/i), 'invalid-email');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'Test message');

      // Submit form
      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Wait for error handling
      await waitFor(() => {
        expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      });

      // Verify error notification appears
      await waitFor(() => {
        expect(
          screen.getByText(/contact form submission failed/i)
        ).toBeInTheDocument();
      });
    });

    it('should show loading state during form submission', async () => {
      // Mock delayed API response
      const mockSubmit = vi
        .fn()
        .mockImplementation(
          () =>
            new Promise(resolve =>
              setTimeout(() => resolve(mockApiResponses.contactSuccess), 1000)
            )
        );
      vi.mocked(contactService.submitContact).mockImplementation(mockSubmit);

      const onSubmit = vi.fn();
      renderWithProviders(<ContactForm onSubmit={onSubmit} isLoading={true} />);

      // Verify loading state
      const submitButton = screen.getByRole('button', { name: /sending/i });
      expect(submitButton).toBeDisabled();
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  describe('Form Accessibility', () => {
    it('should have proper ARIA labels and roles in registration form', () => {
      renderWithProviders(<RegistrationForm />);

      // Check for proper form structure
      expect(screen.getByRole('form')).toBeInTheDocument();

      // Check for required field indicators
      expect(screen.getAllByText('*')).toHaveLength(expect.any(Number));

      // Check for proper labeling
      expect(screen.getByLabelText(/team name/i)).toHaveAttribute(
        'aria-required',
        'true'
      );
      expect(screen.getByLabelText(/leader email/i)).toHaveAttribute(
        'type',
        'email'
      );
    });

    it('should have proper ARIA labels and roles in contact form', () => {
      renderWithProviders(<ContactForm />);

      // Check for proper form structure
      expect(screen.getByRole('form')).toBeInTheDocument();

      // Check for proper labeling
      expect(screen.getByLabelText(/name/i)).toHaveAttribute(
        'aria-required',
        'true'
      );
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
      expect(screen.getByLabelText(/message/i)).toHaveAttribute(
        'aria-required',
        'true'
      );
    });
  });
});
