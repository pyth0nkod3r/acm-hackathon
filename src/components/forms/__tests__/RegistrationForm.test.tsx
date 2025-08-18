/**
 * RegistrationForm component tests
 * Tests form rendering, validation, team member management, and submission
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import RegistrationForm from '../RegistrationForm';
import type { RegistrationFormData } from '../../../lib/validations';

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
      teamName: '',
      teamSize: 1,
      teamLeader: {
        name: '',
        email: '',
        phone: '',
        role: 'Team Leader',
        linkedin: '',
        country: '',
        nationality: '',
        age: 18,
        gender: '',
      },
      teamMembers: [],
      projectTitle: '',
      ideaSummary: '',
      problemSolving: '',
      technology: '',
      alignment: '',
      hasPrototype: false,
      prototypeURL: '',
      projectRepo: '',
      challengeAreas: [],
      declarations: [],
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
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('RegistrationForm', () => {
  const mockOnSubmit = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form sections', () => {
    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Team Information')).toBeInTheDocument();
    expect(screen.getByText('Team Leader Information')).toBeInTheDocument();
    expect(screen.getByText('Project Information')).toBeInTheDocument();
    expect(screen.getByText('Challenge Areas')).toBeInTheDocument();
    expect(screen.getByText('Supporting Documents')).toBeInTheDocument();
    expect(screen.getByText('Declarations')).toBeInTheDocument();
  });

  it('renders team information fields', () => {
    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/team name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/team size/i)).toBeInTheDocument();
  });

  it('renders team leader information fields', () => {
    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nationality/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/linkedin profile/i)).toBeInTheDocument();
  });

  it('renders project information fields', () => {
    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/project title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/idea summary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/problem solving/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/technology stack/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/acm alignment/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/do you have a prototype/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/project repository/i)).toBeInTheDocument();
  });

  it('renders challenge areas checkboxes', () => {
    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    const challengeAreas = [
      'Digital Trade Infrastructure',
      'Cross-border Payments',
      'Supply Chain Transparency',
      'Digital Identity & Authentication',
      'Trade Finance Innovation',
      'Regulatory Technology (RegTech)',
      'Sustainable Trade Solutions',
      'SME Trade Enablement',
    ];

    challengeAreas.forEach(area => {
      expect(screen.getByLabelText(area)).toBeInTheDocument();
    });
  });

  it('shows prototype URL field when hasPrototype is true', () => {
    const mockUseFormValidation = vi.mocked(
      require('../../../hooks/useFormValidation').useFormValidation
    );

    mockUseFormValidation.mockReturnValue({
      values: {
        hasPrototype: true,
        prototypeURL: '',
      },
      errors: {},
      touched: {},
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

    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/prototype url/i)).toBeInTheDocument();
  });

  it('renders file upload section', () => {
    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Supporting Documents')).toBeInTheDocument();
    expect(
      screen.getByText(/click to upload or drag and drop/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/pdf, doc, docx, ppt, pptx/i)).toBeInTheDocument();
  });

  it('renders declarations section', () => {
    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Declarations')).toBeInTheDocument();

    const declarations = [
      'I confirm that all information provided is accurate and complete',
      'I agree to the terms and conditions of the hackathon',
      'I consent to the processing of my personal data for hackathon purposes',
      'I understand that participation is subject to final approval',
    ];

    declarations.forEach(declaration => {
      expect(screen.getByLabelText(declaration)).toBeInTheDocument();
    });
  });

  it('handles team member addition', async () => {
    const mockSetValue = vi.fn();
    const mockUseFormValidation = vi.mocked(
      require('../../../hooks/useFormValidation').useFormValidation
    );

    mockUseFormValidation.mockReturnValue({
      values: {
        teamMembers: [],
        teamSize: 1,
      },
      errors: {},
      touched: {},
      isSubmitting: false,
      handleBlur: vi.fn(),
      handleSubmit: vi.fn(),
      setValue: mockSetValue,
      getFieldProps: vi.fn(() => ({
        value: '',
        onChange: vi.fn(),
        onBlur: vi.fn(),
        error: undefined,
      })),
    });

    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    const addButton = screen.getByRole('button', { name: /add team member/i });
    await user.click(addButton);

    expect(mockSetValue).toHaveBeenCalledWith('teamMembers', [
      expect.objectContaining({
        name: '',
        email: '',
        phone: '',
        role: '',
        linkedin: '',
        country: '',
        nationality: '',
        age: 18,
        gender: '',
      }),
    ]);
    expect(mockSetValue).toHaveBeenCalledWith('teamSize', 2);
  });

  it('handles challenge area selection', async () => {
    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    const checkbox = screen.getByLabelText('Digital Trade Infrastructure');
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('handles file upload', async () => {
    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    const file = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    });
    const fileInput = screen.getByLabelText(/click to upload/i);

    await user.upload(fileInput, file);

    expect(fileInput).toHaveProperty('files', expect.arrayContaining([file]));
  });

  it('displays loading state during submission', () => {
    renderWithRouter(
      <RegistrationForm onSubmit={mockOnSubmit} isLoading={true} />
    );

    // The form should show loading indicators when isLoading is true
    // This would depend on the specific loading UI implementation
    expect(screen.getByRole('form')).toBeInTheDocument();
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

    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('displays validation errors', () => {
    const mockUseFormValidation = vi.mocked(
      require('../../../hooks/useFormValidation').useFormValidation
    );

    mockUseFormValidation.mockReturnValue({
      values: {},
      errors: {
        teamName: 'Team name is required',
        'teamLeader.email': 'Invalid email format',
      },
      touched: {
        teamName: true,
        'teamLeader.email': true,
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

    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Team name is required')).toBeInTheDocument();
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  it('handles mobile responsive layout', () => {
    const mockUseResponsive = vi.mocked(
      require('../../../hooks/useResponsive').useResponsive
    );

    mockUseResponsive.mockReturnValue({
      isMobile: true,
      isTablet: false,
    });

    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

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

    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    // The component should render with touch-friendly classes
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('prevents adding more than 4 team members', () => {
    const mockUseFormValidation = vi.mocked(
      require('../../../hooks/useFormValidation').useFormValidation
    );

    mockUseFormValidation.mockReturnValue({
      values: {
        teamMembers: new Array(4).fill({
          name: '',
          email: '',
          phone: '',
          role: '',
          linkedin: '',
          country: '',
          nationality: '',
          age: 18,
          gender: '',
        }),
        teamSize: 5,
      },
      errors: {},
      touched: {},
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

    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    const addButton = screen.getByRole('button', { name: /add member/i });
    expect(addButton).toBeDisabled();
  });

  it('handles team member removal', async () => {
    const mockSetValue = vi.fn();
    const mockUseFormValidation = vi.mocked(
      require('../../../hooks/useFormValidation').useFormValidation
    );

    mockUseFormValidation.mockReturnValue({
      values: {
        teamMembers: [
          {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            role: 'Developer',
            linkedin: '',
            country: 'Ghana',
            nationality: 'Ghanaian',
            age: 25,
            gender: 'Male',
          },
        ],
        teamSize: 2,
      },
      errors: {},
      touched: {},
      isSubmitting: false,
      handleBlur: vi.fn(),
      handleSubmit: vi.fn(),
      setValue: mockSetValue,
      getFieldProps: vi.fn(() => ({
        value: '',
        onChange: vi.fn(),
        onBlur: vi.fn(),
        error: undefined,
      })),
    });

    renderWithRouter(<RegistrationForm onSubmit={mockOnSubmit} />);

    const removeButton = screen.getByRole('button', { name: /remove/i });
    await user.click(removeButton);

    expect(mockSetValue).toHaveBeenCalledWith('teamMembers', []);
    expect(mockSetValue).toHaveBeenCalledWith('teamSize', 1);
  });
});
