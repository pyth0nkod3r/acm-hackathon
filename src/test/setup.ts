import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Global test setup for integration tests
beforeEach(() => {
  // Clear all mocks before each test
  vi.clearAllMocks();

  // Reset DOM
  document.body.innerHTML = '';
  document.head.innerHTML = '';

  // Reset window properties
  Object.defineProperty(window, 'location', {
    value: {
      pathname: '/',
      search: '',
      hash: '',
      href: 'http://localhost:3000/',
    },
    writable: true,
  });
});

afterEach(() => {
  // Clean up after each test
  vi.restoreAllMocks();
});
