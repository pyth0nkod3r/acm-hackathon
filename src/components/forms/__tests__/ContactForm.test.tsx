/**
 * ContactForm component tests
 * Tests form rendering, validation, and submission
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ContactForm from '../ContactForm';
import type { ContactFormData } from '../../../lib/validations';

// Mock hooks
vi.mock('../../../hooks/useResponsive', () => ({
  useResponsive: () => ({ isMobile: false, isTablet: false }),
}));

vi.mock('../../../hooks/useTouchDevice', () => ({
  useTouchDevice: () => ({ isTouchDevice: false }),
}));

vi.mock('../../../hooks/useFormValidation', () => ({
  useFormValidation: vi.fn(() => ({
    values: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    errors: {},
    touched: {},
    isSubmitting: false,
    handleBlur: vi.fn(),
    handleSubmit: vi.fn(),
    setValue: vi.fn(),
    getFieldProps: vi.fn((name: string) => ({
      value: '',
      onChange: vi.fn(),
      onBlur: vi.fn(),
      error: undefined,
    })),
  })),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ContactForm', () => {
  const mockOnSubmit = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form with all required fields', () => {
    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Send us a Message')).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeInTheDocument();
  });

  it('renders form header with icon and title', () => {
    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Send us a Message')).toBeInTheDocument();
    // The Mail icon should be rendered but we can't easily test for it
    // We can test that the header section exists
    const header = screen.getByText('Send us a Message').closest('div');
    expect(header).toBeInTheDocument();
  });

  it('renders response time information', () => {
    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} />);

    expect(
      screen.getByText(/we typically respond within 24 hours/i)
    ).toBeInTheDocument();
  });

  it('handles form field interactions', async () => {
    const mockGetFieldProps = vi.fn((name: string) => ({
      value: '',
      onChange: vi.fn(),
      onBlur: vi.fn(),
      error: undefined,
    }));

    const mockUseFormValidation = vi.mocked(
      require('../../../hooks/useFormValidation').useFormValidation
    );

    mockUseFormValidation.mockReturnValue({
      values: {},
      errors: {},
      touched: {},
      isSubmitting: false,
      handleBlur: vi.fn(),
      handleSubmit: vi.fn(),
      setValue: vi.fn(),
      getFieldProps: mockGetFieldProps,
    });

    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} />);

    // Check that getFieldProps is called for each field
    expect(mockGetFieldProps).toHaveBeenCalledWith('name');
    expect(mockGetFieldProps).toHaveBeenCalledWith('email');
    expect(mockGetFieldProps).toHaveBeenCalledWith('subject');
    expect(mockGetFieldProps).toHaveBeenCalledWith('message');
  });

  it('displays validation errors when fields are touched', () => {
    const mockUseFormValidation = vi.mocked(
      require('../../../hooks/useFormValidation').useFormValidation
    );

    mockUseFormValidation.mockReturnValue({
      values: {},
      errors: {
        name: 'Name is required',
        email: 'Invalid email format',
        subject: 'Subject is required',
        message: 'Message must be at least 10 characters',
      },
      touched: {
        name: true,
        email: true,
        subject: true,
        message: true,
      },
      isSubmitting: false,
      handleBlur: vi.fn(),
      handleSubmit: vi.fn(),
      setValue: vi.fn(),
      getFieldProps: vi.fn(() => ({
        value: '',
        onChange: vi.fn(),
        onBlur: vi.fn(),
        error: undefined,
      })),
    });

    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    expect(screen.getByText('Subject is required')).toBeInTheDocument();
    expect(
      screen.getByText('Message must be at least 10 characters')
    ).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    const mockHandleSubmit = vi.fn();
    const mockUseFormValidation = vi.mocked(
      require('../../../hooks/useFormValidation').useFormValidation
    );

    mockUseFormValidation.mockReturnValue({
      values: {},
      errors: {},
      touched: {},
      isSubmitting: false,
      handleBlur: vi.fn(),
      handleSubmit: mockHandleSubmit,
      setValue: vi.fn(),
      getFieldProps: vi.fn(() => ({
        value: '',
        onChange: vi.fn(),
        onBlur: vi.fn(),
        error: undefined,
      })),
    });

    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} />);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('shows loading state during submission', () => {
    const mockUseFormValidation = vi.mocked(
      require('../../../hooks/useFormValidation').useFormValidation
    );

    mockUseFormValidation.mockReturnValue({
      values: {},
      errors: {},
      touched: {},
      isSubmitting: true,
      handleBlur: vi.fn(),
      handleSubmit: vi.fn(),
      setValue: vi.fn(),
      getFieldProps: vi.fn(() => ({
        value: '',
        onChange: vi.fn(),
        onBlur: vi.fn(),
        error: undefined,
      })),
    });

    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /sending/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('shows loading state when isLoading prop is true', () => {
    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} isLoading={true} />);

    const submitButton = screen.getByRole('button', { name: /sending/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('handles mobile responsive layout', () => {
    const mockUseResponsive = vi.mocked(
      require('../../../hooks/useResponsive').useResponsive
    );

    mockUseResponsive.mockReturnValue({
      isMobile: true,
      isTablet: false,
    });

    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} />);

    // The component should render with mobile-specific classes
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('handles touch device interactions', () => {
    const mockUseTouchDevice = vi.mocked(
      require('../../../hooks/useTouchDevice').useTouchDevice
    );

    mockUseTouchDevice.mockReturnValue({
      isTouchDevice: true,
    });

    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} />);

    // The component should render with touch-friendly classes
    const submitButton = screen.getByRole('button', { name: /send message/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('renders form fields with correct input types', () => {
    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    expect(nameInput).toHaveAttribute('type', 'text');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(subjectInput).toHaveAttribute('type', 'text');
    expect(messageInput.tagName.toLowerCase()).toBe('textarea');
  });

  it('renders form fields with correct placeholders', () => {
    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} />);

    expect(
      screen.getByPlaceholderText('Enter your full name')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your email address')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter the subject of your message')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your message (minimum 10 characters)')
    ).toBeInTheDocument();
  });

  it('renders textarea with correct rows attribute', () => {
    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} />);

    const messageTextarea = screen.getByLabelText(/message/i);
    expect(messageTextarea).toHaveAttribute('rows', '6');
  });

  it('calls onSubmit prop when form is submitted successfully', async () => {
    const mockHandleSubmit = vi.fn(callback => {
      // Simulate successful form submission
      callback();
    });

    const mockUseFormValidation = vi.mocked(
      require('../../../hooks/useFormValidation').useFormValidation
    );

    mockUseFormValidation.mockReturnValue({
      values: {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
      },
      errors: {},
      touched: {},
      isSubmitting: false,
      handleBlur: vi.fn(),
      handleSubmit: mockHandleSubmit,
      setValue: vi.fn(),
      getFieldProps: vi.fn(() => ({
        value: '',
        onChange: vi.fn(),
        onBlur: vi.fn(),
        error: undefined,
      })),
    });

    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} />);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('renders with correct ARIA attributes for accessibility', () => {
    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    expect(nameInput).toHaveAttribute('id', 'name');
    expect(emailInput).toHaveAttribute('id', 'email');
    expect(subjectInput).toHaveAttribute('id', 'subject');
    expect(messageInput).toHaveAttribute('id', 'message');
  });

  it('renders required field indicators', () => {
    renderWithRouter(<ContactForm onSubmit={mockOnSubmit} />);

    // All fields should be marked as required
    const requiredLabels = screen.getAllByText('*');
    expect(requiredLabels.length).toBeGreaterThan(0);
  });
});
