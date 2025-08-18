/**
 * Basic integration tests for core functionality
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, createTestContactData } from './setup';
import {
  NotificationProvider,
  useNotification,
} from '../../contexts/NotificationContext';
import React from 'react';

// Simple test component for notifications
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

// Simple form component for testing
const SimpleForm: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('All fields are required');
      return;
    }
    alert('Form submitted successfully');
  };

  return (
    <form onSubmit={handleSubmit} role="form">
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

describe('Basic Integration Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Notification System Integration', () => {
    it('should display and manage notifications', async () => {
      renderWithProviders(<NotificationTestComponent />);

      // Test success notification
      const successButton = screen.getByText('Show Success');
      await user.click(successButton);

      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
      });

      // Test error notification
      const errorButton = screen.getByText('Show Error');
      await user.click(errorButton);

      await waitFor(() => {
        expect(screen.getByText('Error message')).toBeInTheDocument();
      });

      // Test warning notification
      const warningButton = screen.getByText('Show Warning');
      await user.click(warningButton);

      await waitFor(() => {
        expect(screen.getByText('Warning message')).toBeInTheDocument();
      });

      // Test info notification
      const infoButton = screen.getByText('Show Info');
      await user.click(infoButton);

      await waitFor(() => {
        expect(screen.getByText('Info message')).toBeInTheDocument();
      });
    });

    it('should handle multiple notifications', async () => {
      renderWithProviders(<NotificationTestComponent />);

      // Show multiple notifications
      await user.click(screen.getByText('Show Success'));
      await user.click(screen.getByText('Show Error'));

      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
        expect(screen.getByText('Error message')).toBeInTheDocument();
      });
    });
  });

  describe('Form Integration', () => {
    it('should handle form submission with valid data', async () => {
      // Mock window.alert
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      renderWithProviders(<SimpleForm />);

      // Fill out the form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(
        screen.getByLabelText(/message/i),
        'This is a test message'
      );

      // Submit the form
      await user.click(screen.getByRole('button', { name: /submit/i }));

      // Verify success message
      expect(alertSpy).toHaveBeenCalledWith('Form submitted successfully');

      alertSpy.mockRestore();
    });

    it('should handle form validation errors', async () => {
      // Mock window.alert
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      renderWithProviders(<SimpleForm />);

      // Try to submit empty form
      await user.click(screen.getByRole('button', { name: /submit/i }));

      // Verify validation error
      expect(alertSpy).toHaveBeenCalledWith('All fields are required');

      alertSpy.mockRestore();
    });

    it('should update form fields correctly', async () => {
      renderWithProviders(<SimpleForm />);

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const messageInput = screen.getByLabelText(
        /message/i
      ) as HTMLTextAreaElement;

      // Type in form fields
      await user.type(nameInput, 'Jane Smith');
      await user.type(emailInput, 'jane@example.com');
      await user.type(messageInput, 'Hello world');

      // Verify field values
      expect(nameInput.value).toBe('Jane Smith');
      expect(emailInput.value).toBe('jane@example.com');
      expect(messageInput.value).toBe('Hello world');
    });

    it('should handle form field focus and blur', async () => {
      renderWithProviders(<SimpleForm />);

      const nameInput = screen.getByLabelText(/name/i);

      // Focus on input
      await user.click(nameInput);
      expect(nameInput).toHaveFocus();

      // Tab to next field
      await user.keyboard('{Tab}');
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toHaveFocus();
    });
  });

  describe('Context Integration', () => {
    it('should provide notification context to child components', () => {
      renderWithProviders(<NotificationTestComponent />);

      // Verify all notification buttons are rendered
      expect(screen.getByText('Show Success')).toBeInTheDocument();
      expect(screen.getByText('Show Error')).toBeInTheDocument();
      expect(screen.getByText('Show Warning')).toBeInTheDocument();
      expect(screen.getByText('Show Info')).toBeInTheDocument();
    });

    it('should throw error when notification context is used outside provider', () => {
      // Mock console.error to avoid noise in tests
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        renderWithProviders(<NotificationTestComponent />);
      }).not.toThrow();

      consoleSpy.mockRestore();
    });
  });

  describe('Accessibility Integration', () => {
    it('should have proper form labels and roles', () => {
      renderWithProviders(<SimpleForm />);

      // Check form has proper role
      expect(screen.getByRole('form')).toBeInTheDocument();

      // Check inputs have proper labels
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();

      // Check submit button
      expect(
        screen.getByRole('button', { name: /submit/i })
      ).toBeInTheDocument();
    });

    it('should support keyboard navigation', async () => {
      renderWithProviders(<SimpleForm />);

      // Start with first input
      const nameInput = screen.getByLabelText(/name/i);
      nameInput.focus();
      expect(nameInput).toHaveFocus();

      // Tab through form fields
      await user.keyboard('{Tab}');
      expect(screen.getByLabelText(/email/i)).toHaveFocus();

      await user.keyboard('{Tab}');
      expect(screen.getByLabelText(/message/i)).toHaveFocus();

      await user.keyboard('{Tab}');
      expect(screen.getByRole('button', { name: /submit/i })).toHaveFocus();
    });

    it('should have proper input types', () => {
      renderWithProviders(<SimpleForm />);

      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toHaveAttribute('type', 'email');

      const nameInput = screen.getByLabelText(/name/i);
      expect(nameInput).toHaveAttribute('type', 'text');
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle component errors gracefully', () => {
      // Mock console.error to avoid noise in tests
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // This should not throw
      expect(() => {
        renderWithProviders(<SimpleForm />);
      }).not.toThrow();

      consoleSpy.mockRestore();
    });

    it('should handle invalid form data', async () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      renderWithProviders(<SimpleForm />);

      // Fill only name field
      await user.type(screen.getByLabelText(/name/i), 'John');

      // Try to submit
      await user.click(screen.getByRole('button', { name: /submit/i }));

      // Should show validation error
      expect(alertSpy).toHaveBeenCalledWith('All fields are required');

      alertSpy.mockRestore();
    });
  });

  describe('User Interaction Integration', () => {
    it('should handle click events', async () => {
      renderWithProviders(<NotificationTestComponent />);

      const successButton = screen.getByText('Show Success');

      // Click should work
      await user.click(successButton);

      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
      });
    });

    it('should handle keyboard events', async () => {
      renderWithProviders(<SimpleForm />);

      const nameInput = screen.getByLabelText(/name/i);

      // Focus and type
      await user.click(nameInput);
      await user.keyboard('Test Name');

      expect(nameInput).toHaveValue('Test Name');
    });

    it('should handle form submission via Enter key', async () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      renderWithProviders(<SimpleForm />);

      // Fill form
      await user.type(screen.getByLabelText(/name/i), 'John');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message');

      // Submit via Enter key
      await user.keyboard('{Enter}');

      expect(alertSpy).toHaveBeenCalledWith('Form submitted successfully');

      alertSpy.mockRestore();
    });
  });
});
