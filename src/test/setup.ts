import '@testing-library/jest-dom';
import { vi, beforeEach, afterEach } from 'vitest';

// Mock matchMedia globally
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

// Mock AbortSignal.timeout globally for JSDOM using constructor proxy
if (typeof AbortSignal !== 'undefined') {
  const OriginalAbortSignal = AbortSignal;
  const MockAbortSignal = function (this: any, ...args: any[]) {
    return Reflect.construct(OriginalAbortSignal, args, MockAbortSignal);
  } as any;

  Object.setPrototypeOf(MockAbortSignal, OriginalAbortSignal);
  MockAbortSignal.prototype = OriginalAbortSignal.prototype;

  MockAbortSignal.timeout = vi.fn().mockImplementation((timeout: number) => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller.signal;
  });

  Object.defineProperty(global, 'AbortSignal', {
    value: MockAbortSignal,
    writable: true,
    configurable: true,
  });
  if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'AbortSignal', {
      value: MockAbortSignal,
      writable: true,
      configurable: true,
    });
  }
}

// Global test setup for integration tests
beforeEach(() => {
  // Re-establish global AbortSignal.timeout mock implementation before each test
  if (
    typeof AbortSignal !== 'undefined' &&
    'timeout' in AbortSignal &&
    typeof (AbortSignal as any).timeout.mockImplementation === 'function'
  ) {
    (AbortSignal as any).timeout.mockImplementation((timeout: number) => {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), timeout);
      return controller.signal;
    });
  }

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
