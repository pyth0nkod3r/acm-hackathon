/**
 * Integration test setup utilities
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from '../../contexts';
import { vi } from 'vitest';

// Mock IntersectionObserver for animation tests
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock ResizeObserver for responsive tests
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo for navigation tests
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Mock fetch for API tests
global.fetch = vi.fn();

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
}

export function renderWithProviders(
  ui: ReactElement,
  options: CustomRenderOptions = {}
) {
  const { initialEntries = ['/'], ...renderOptions } = options;

  function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(
      BrowserRouter,
      null,
      React.createElement(NotificationProvider, null, children)
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Mock API responses
export const mockApiResponses = {
  registrationSuccess: {
    success: true,
    data: {
      id: 'test-registration-123',
      status: 'submitted' as const,
      submittedAt: new Date().toISOString(),
    },
  },
  registrationError: {
    success: false,
    message: 'Registration failed',
    messages: {
      teamName: 'Team name is required',
    },
  },
  contactSuccess: {
    success: true,
    data: {
      id: 'test-contact-123',
      status: 'submitted' as const,
      submittedAt: new Date().toISOString(),
    },
  },
  contactError: {
    success: false,
    message: 'Contact form submission failed',
    messages: {
      email: 'Invalid email address',
    },
  },
};

// Test data factories
export const createTestRegistrationData = (overrides = {}) => ({
  teamName: 'Test Team',
  teamSize: 2,
  teamLeader: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    role: 'Developer',
    country: 'Nigeria',
    nationality: 'Nigerian',
    age: 25,
  },
  teamMembers: [
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1234567891',
      role: 'Designer',
      country: 'Ghana',
      nationality: 'Ghanaian',
      age: 24,
    },
  ],
  projectTitle: 'Test Project',
  ideaSummary:
    'This is a test idea summary that is long enough to pass validation requirements.',
  problemSolving:
    'This is a test problem solving description that is long enough to pass validation.',
  technology: 'React, TypeScript, Node.js',
  alignment:
    'This project aligns with ACM goals by improving digital trade infrastructure.',
  hasPrototype: false,
  challengeAreas: ['Digital Trade Infrastructure'],
  declarations: ['I agree to the terms and conditions'],
  ...overrides,
});

export const createTestContactData = (overrides = {}) => ({
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Subject',
  message: 'This is a test message that is long enough to pass validation.',
  ...overrides,
});

// Wait for async operations
export const waitForAsync = () =>
  new Promise(resolve => setTimeout(resolve, 0));

// Mock file for upload tests
export const createMockFile = (name = 'test.pdf', type = 'application/pdf') => {
  const file = new File(['test content'], name, { type });
  return file;
};
