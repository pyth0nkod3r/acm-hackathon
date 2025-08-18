/**
 * useNotification hook tests
 * Tests notification hook functionality and context integration
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useNotification } from '../useNotification';

// Mock the NotificationContext
vi.mock('../../contexts/NotificationContext', () => ({
  useNotification: vi.fn(),
}));

describe('useNotification', () => {
  const mockShowSuccess = vi.fn();
  const mockShowError = vi.fn();
  const mockShowWarning = vi.fn();
  const mockShowInfo = vi.fn();
  const mockShowNotification = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    const mockUseNotificationFromContext = vi.mocked(
      require('../../contexts/NotificationContext').useNotification
    );

    mockUseNotificationFromContext.mockReturnValue({
      showSuccess: mockShowSuccess,
      showError: mockShowError,
      showWarning: mockShowWarning,
      showInfo: mockShowInfo,
      showNotification: mockShowNotification,
    });
  });

  it('exports the useNotification hook from NotificationContext', () => {
    const { result } = renderHook(() => useNotification());

    expect(result.current).toEqual({
      showSuccess: mockShowSuccess,
      showError: mockShowError,
      showWarning: mockShowWarning,
      showInfo: mockShowInfo,
      showNotification: mockShowNotification,
    });
  });

  it('provides showSuccess function', () => {
    const { result } = renderHook(() => useNotification());

    expect(typeof result.current.showSuccess).toBe('function');
    expect(result.current.showSuccess).toBe(mockShowSuccess);
  });

  it('provides showError function', () => {
    const { result } = renderHook(() => useNotification());

    expect(typeof result.current.showError).toBe('function');
    expect(result.current.showError).toBe(mockShowError);
  });

  it('provides showWarning function', () => {
    const { result } = renderHook(() => useNotification());

    expect(typeof result.current.showWarning).toBe('function');
    expect(result.current.showWarning).toBe(mockShowWarning);
  });

  it('provides showInfo function', () => {
    const { result } = renderHook(() => useNotification());

    expect(typeof result.current.showInfo).toBe('function');
    expect(result.current.showInfo).toBe(mockShowInfo);
  });

  it('provides showNotification function', () => {
    const { result } = renderHook(() => useNotification());

    expect(typeof result.current.showNotification).toBe('function');
    expect(result.current.showNotification).toBe(mockShowNotification);
  });

  it('re-exports the same functions from NotificationContext', () => {
    const { result } = renderHook(() => useNotification());

    // Verify that the hook is just re-exporting from the context
    const contextModule = require('../../contexts/NotificationContext');
    expect(contextModule.useNotification).toHaveBeenCalled();
  });

  it('maintains function references across re-renders', () => {
    const { result, rerender } = renderHook(() => useNotification());

    const initialFunctions = { ...result.current };

    rerender();

    expect(result.current.showSuccess).toBe(initialFunctions.showSuccess);
    expect(result.current.showError).toBe(initialFunctions.showError);
    expect(result.current.showWarning).toBe(initialFunctions.showWarning);
    expect(result.current.showInfo).toBe(initialFunctions.showInfo);
    expect(result.current.showNotification).toBe(
      initialFunctions.showNotification
    );
  });

  it('throws error when context is not available', () => {
    const mockUseNotificationFromContext = vi.mocked(
      require('../../contexts/NotificationContext').useNotification
    );

    mockUseNotificationFromContext.mockImplementation(() => {
      throw new Error(
        'useNotification must be used within a NotificationProvider'
      );
    });

    expect(() => {
      renderHook(() => useNotification());
    }).toThrow('useNotification must be used within a NotificationProvider');
  });

  it('returns consistent interface', () => {
    const { result } = renderHook(() => useNotification());

    const expectedKeys = [
      'showSuccess',
      'showError',
      'showWarning',
      'showInfo',
      'showNotification',
    ];

    expectedKeys.forEach(key => {
      expect(result.current).toHaveProperty(key);
      expect(typeof result.current[key]).toBe('function');
    });
  });
});
