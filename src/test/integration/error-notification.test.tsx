/**
 * Integration tests for error handling and notification scenarios
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, mockApiResponses } from './setup';
import {
  NotificationProvider,
  useNotification,
} from '../../contexts/NotificationContext';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';
import { RegistrationForm } from '../../components/forms/RegistrationForm';
import { ContactForm } from '../../components/forms/ContactForm';
import { registrationService } from '../../services/registrationService';
import { contactService } from '../../services/contactService';
import React from 'react';

// Mock services
vi.mock('../../services/registrationService');
vi.mock('../../services/contactService');

// Test component that uses notifications
const NotificationTestComponent: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();

  return (
    <div>
      <button onClick={() => showSuccess('Success message')}>
        Show Success
      </button>
      <button onClick={() => showError('Error message')}>Show Error</button>
      <button onClick={() => showWarning('Warning message')}>
        Show Warning
      </button>
      <button onClick={() => showInfo('Info message')}>Show Info</button>
    </div>
  );
};

// Test component that throws errors
const ErrorThrowingComponent: React.FC<{ shouldThrow?: boolean }> = ({
  shouldThrow = false,
}) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('Error Handling and Notification Integration Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console.error to avoid noise in tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Notification System', () => {
    it('should display success notifications', async () => {
      renderWithProviders(<NotificationTestComponent />);

      const successButton = screen.getByText('Show Success');
      await user.click(successButton);

      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
      });

      // Verify notification styling
      const notification = screen
        .getByText('Success message')
        .closest('[data-sonner-toast]');
      expect(notification).toHaveAttribute('data-type', 'success');
    });

    it('should display error notifications', async () => {
      renderWithProviders(<NotificationTestComponent />);

      const errorButton = screen.getByText('Show Error');
      await user.click(errorButton);

      await waitFor(() => {
        expect(screen.getByText('Error message')).toBeInTheDocument();
      });

      // Verify notification styling
      const notification = screen
        .getByText('Error message')
        .closest('[data-sonner-toast]');
      expect(notification).toHaveAttribute('data-type', 'error');
    });

    it('should display warning notifications', async () => {
      renderWithProviders(<NotificationTestComponent />);

      const warningButton = screen.getByText('Show Warning');
      await user.click(warningButton);

      await waitFor(() => {
        expect(screen.getByText('Warning message')).toBeInTheDocument();
      });

      // Verify notification styling
      const notification = screen
        .getByText('Warning message')
        .closest('[data-sonner-toast]');
      expect(notification).toHaveAttribute('data-type', 'warning');
    });

    it('should display info notifications', async () => {
      renderWithProviders(<NotificationTestComponent />);

      const infoButton = screen.getByText('Show Info');
      await user.click(infoButton);

      await waitFor(() => {
        expect(screen.getByText('Info message')).toBeInTheDocument();
      });

      // Verify notification styling
      const notification = screen
        .getByText('Info message')
        .closest('[data-sonner-toast]');
      expect(notification).toHaveAttribute('data-type', 'info');
    });

    it('should auto-dismiss notifications after specified duration', async () => {
      renderWithProviders(<NotificationTestComponent />);

      const successButton = screen.getByText('Show Success');
      await user.click(successButton);

      // Notification should be visible initially
      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
      });

      // Wait for auto-dismiss (default 5 seconds, but we'll mock shorter)
      await waitFor(
        () => {
          expect(screen.queryByText('Success message')).not.toBeInTheDocument();
        },
        { timeout: 6000 }
      );
    });

    it('should allow manual dismissal of notifications', async () => {
      renderWithProviders(<NotificationTestComponent />);

      const successButton = screen.getByText('Show Success');
      await user.click(successButton);

      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
      });

      // Find and click dismiss button
      const dismissButton = screen.getByRole('button', { name: /close/i });
      await user.click(dismissButton);

      await waitFor(() => {
        expect(screen.queryByText('Success message')).not.toBeInTheDocument();
      });
    });

    it('should stack multiple notifications', async () => {
      renderWithProviders(<NotificationTestComponent />);

      // Show multiple notifications
      await user.click(screen.getByText('Show Success'));
      await user.click(screen.getByText('Show Error'));
      await user.click(screen.getByText('Show Warning'));

      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
        expect(screen.getByText('Error message')).toBeInTheDocument();
        expect(screen.getByText('Warning message')).toBeInTheDocument();
      });

      // Verify all notifications are visible
      const notifications = screen.getAllByRole('status');
      expect(notifications).toHaveLength(3);
    });
  });

  describe('Error Boundary Integration', () => {
    it('should catch and display component errors', async () => {
      const onError = vi.fn();

      renderWithProviders(
        <ErrorBoundary onError={onError}>
          <ErrorThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      await waitFor(() => {
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
        expect(onError).toHaveBeenCalledWith(
          expect.any(Error),
          expect.any(Object),
          expect.any(String)
        );
      });
    });

    it('should provide error recovery options', async () => {
      const onError = vi.fn();

      renderWithProviders(
        <ErrorBoundary onError={onError}>
          <ErrorThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      await waitFor(() => {
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
      });

      // Look for retry button
      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toBeInTheDocument();

      // Click retry button
      await user.click(retryButton);

      // Should attempt to recover
      await waitFor(() => {
        expect(
          screen.queryByText(/something went wrong/i)
        ).not.toBeInTheDocument();
      });
    });

    it('should isolate errors when isolateErrors is true', async () => {
      const onError = vi.fn();

      renderWithProviders(
        <div>
          <div>Working component</div>
          <ErrorBoundary isolateErrors={true} onError={onError}>
            <ErrorThrowingComponent shouldThrow={true} />
          </ErrorBoundary>
          <div>Another working component</div>
        </div>
      );

      await waitFor(() => {
        // Error boundary should catch the error
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

        // Other components should still work
        expect(screen.getByText('Working component')).toBeInTheDocument();
        expect(
          screen.getByText('Another working component')
        ).toBeInTheDocument();
      });
    });

    it('should log errors for debugging', async () => {
      const onError = vi.fn();
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      renderWithProviders(
        <ErrorBoundary onError={onError}>
          <ErrorThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      await waitFor(() => {
        expect(onError).toHaveBeenCalledWith(
          expect.objectContaining({ message: 'Test error' }),
          expect.any(Object),
          expect.any(String)
        );
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Form Error Handling', () => {
    it('should handle registration form API errors with notifications', async () => {
      // Mock API error response
      const mockSubmit = vi
        .fn()
        .mockResolvedValue(mockApiResponses.registrationError);
      vi.mocked(registrationService.submitRegistration).mockImplementation(
        mockSubmit
      );

      const onSubmit = vi.fn();
      renderWithProviders(<RegistrationForm onSubmit={onSubmit} />);

      // Fill out form with minimal data
      await user.type(screen.getByLabelText(/team name/i), 'Test Team');

      // Submit form
      const submitButton = screen.getByRole('button', {
        name: /submit application/i,
      });
      await user.click(submitButton);

      // Wait for error notification
      await waitFor(() => {
        expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
      });

      // Verify field-specific error messages
      await waitFor(() => {
        expect(screen.getByText(/team name is required/i)).toBeInTheDocument();
      });
    });

    it('should handle contact form API errors with notifications', async () => {
      // Mock API error response
      const mockSubmit = vi
        .fn()
        .mockResolvedValue(mockApiResponses.contactError);
      vi.mocked(contactService.submitContact).mockImplementation(mockSubmit);

      const onSubmit = vi.fn();
      renderWithProviders(<ContactForm onSubmit={onSubmit} />);

      // Fill out form with invalid data
      await user.type(screen.getByLabelText(/name/i), 'Test User');
      await user.type(screen.getByLabelText(/email/i), 'invalid-email');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'Test message');

      // Submit form
      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Wait for error notification
      await waitFor(() => {
        expect(
          screen.getByText(/contact form submission failed/i)
        ).toBeInTheDocument();
      });

      // Verify field-specific error messages
      await waitFor(() => {
        expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      });
    });

    it('should handle network errors with retry functionality', async () => {
      // Mock network error
      const mockSubmit = vi
        .fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce(mockApiResponses.contactSuccess);

      vi.mocked(contactService.submitContact).mockImplementation(mockSubmit);

      const onSubmit = vi.fn();
      renderWithProviders(<ContactForm onSubmit={onSubmit} />);

      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'Test User');
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'Test message');

      // Submit form (first attempt - should fail)
      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Wait for error notification
      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });

      // Retry submission
      await user.click(submitButton);

      // Wait for success notification
      await waitFor(() => {
        expect(
          screen.getByText(/message sent successfully/i)
        ).toBeInTheDocument();
      });
    });

    it('should validate forms before submission and show validation errors', async () => {
      renderWithProviders(<ContactForm />);

      // Try to submit empty form
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

      // Form should not be submitted
      expect(contactService.submitContact).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility in Error Scenarios', () => {
    it('should announce errors to screen readers', async () => {
      renderWithProviders(<NotificationTestComponent />);

      const errorButton = screen.getByText('Show Error');
      await user.click(errorButton);

      await waitFor(() => {
        const notification = screen.getByText('Error message');
        expect(notification.closest('[role="status"]')).toBeInTheDocument();
      });
    });

    it('should focus on error messages for keyboard users', async () => {
      renderWithProviders(<ContactForm />);

      // Submit empty form to trigger validation errors
      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        // First error field should receive focus
        const nameInput = screen.getByLabelText(/name/i);
        expect(nameInput).toHaveFocus();
      });
    });

    it('should provide clear error descriptions', async () => {
      renderWithProviders(
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      await waitFor(() => {
        const errorMessage = screen.getByText(/something went wrong/i);
        expect(errorMessage).toBeInTheDocument();

        // Should provide helpful information
        expect(screen.getByText(/please try refreshing/i)).toBeInTheDocument();
      });
    });

    it('should maintain keyboard navigation during error states', async () => {
      renderWithProviders(
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      await waitFor(() => {
        const retryButton = screen.getByRole('button', { name: /try again/i });
        expect(retryButton).toBeInTheDocument();
      });

      // Should be able to navigate to retry button with keyboard
      await user.keyboard('{Tab}');
      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toHaveFocus();
    });
  });
});
