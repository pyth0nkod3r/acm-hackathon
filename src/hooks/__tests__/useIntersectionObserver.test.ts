/**
 * useIntersectionObserver hook tests
 * Tests intersection observer functionality
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from '../useIntersectionObserver';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

mockIntersectionObserver.mockImplementation(callback => ({
  observe: mockObserve,
  unobserve: mockUnobserve,
  disconnect: mockDisconnect,
}));

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

describe('useIntersectionObserver', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns ref, isIntersecting, and entry', () => {
    const { result } = renderHook(() => useIntersectionObserver());

    expect(result.current).toHaveLength(3);
    expect(result.current[0]).toEqual({ current: null }); // ref
    expect(result.current[1]).toBe(false); // isIntersecting
    expect(result.current[2]).toBe(null); // entry
  });

  it('creates IntersectionObserver with default options', () => {
    renderHook(() => useIntersectionObserver());

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );
  });

  it('creates IntersectionObserver with custom options', () => {
    const options = {
      threshold: 0.5,
      rootMargin: '10px',
      triggerOnce: false,
    };

    renderHook(() => useIntersectionObserver(options));

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.5,
        rootMargin: '10px',
      }
    );
  });

  it('observes element when ref is set', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    const mockElement = document.createElement('div');

    // Simulate setting the ref
    result.current[0].current = mockElement;

    // Re-render to trigger effect
    renderHook(() => useIntersectionObserver());

    expect(mockObserve).toHaveBeenCalledWith(mockElement);
  });

  it('disconnects observer on unmount', () => {
    const { unmount } = renderHook(() => useIntersectionObserver());

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});
