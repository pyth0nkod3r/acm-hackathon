/**
 * useScrollAnimation hook tests
 * Tests scroll-based animation logic and intersection observer functionality
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  useScrollAnimation,
  useScrollProgress,
  useElementScrollProgress,
} from '../useScrollAnimation';

// Mock useIntersectionObserver hook
vi.mock('../useIntersectionObserver', () => ({
  useIntersectionObserver: vi.fn(),
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});

// Mock window.IntersectionObserver
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

describe('useScrollAnimation', () => {
  const mockUseIntersectionObserver = vi.mocked(
    await import('../useIntersectionObserver')
  ).useIntersectionObserver;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with correct default state', () => {
    const mockRef = { current: null };
    mockUseIntersectionObserver.mockReturnValue([mockRef, false, null]);

    const { result } = renderHook(() => useScrollAnimation());

    expect(result.current.isVisible).toBe(false);
    expect(result.current.hasBeenVisible).toBe(false);
    expect(result.current.intersectionRatio).toBe(0);
    expect(result.current.shouldAnimate).toBe(false);
  });

  it('updates state when element becomes visible', () => {
    const mockRef = { current: document.createElement('div') };
    const mockEntry = { intersectionRatio: 0.5 };

    mockUseIntersectionObserver.mockReturnValue([mockRef, true, mockEntry]);

    const { result } = renderHook(() => useScrollAnimation());

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.hasBeenVisible).toBe(true);
    expect(result.current.shouldAnimate).toBe(true);
    expect(result.current.intersectionRatio).toBe(0.5);
  });

  it('respects delay configuration', () => {
    const mockRef = { current: document.createElement('div') };
    const mockEntry = { intersectionRatio: 0.5 };

    mockUseIntersectionObserver.mockReturnValue([mockRef, true, mockEntry]);

    const { result } = renderHook(() => useScrollAnimation({ delay: 500 }));

    // Should not be visible immediately
    expect(result.current.shouldAnimate).toBe(false);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.shouldAnimate).toBe(true);
  });

  it('handles triggerOnce configuration correctly', () => {
    const mockRef = { current: document.createElement('div') };
    const mockEntry = { intersectionRatio: 0.5 };

    // Initially visible
    mockUseIntersectionObserver.mockReturnValue([mockRef, true, mockEntry]);

    const { result, rerender } = renderHook(
      ({ triggerOnce }) => useScrollAnimation({ triggerOnce }),
      { initialProps: { triggerOnce: false } }
    );

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.isVisible).toBe(true);

    // Element becomes not visible
    mockUseIntersectionObserver.mockReturnValue([mockRef, false, mockEntry]);

    rerender({ triggerOnce: false });

    expect(result.current.isVisible).toBe(false);
    expect(result.current.shouldAnimate).toBe(false);
  });

  it('maintains visibility when triggerOnce is true', () => {
    const mockRef = { current: document.createElement('div') };
    const mockEntry = { intersectionRatio: 0.5 };

    // Initially visible
    mockUseIntersectionObserver.mockReturnValue([mockRef, true, mockEntry]);

    const { result, rerender } = renderHook(
      ({ triggerOnce }) => useScrollAnimation({ triggerOnce }),
      { initialProps: { triggerOnce: true } }
    );

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.isVisible).toBe(true);

    // Element becomes not visible
    mockUseIntersectionObserver.mockReturnValue([mockRef, false, mockEntry]);

    rerender({ triggerOnce: true });

    // Should remain visible because triggerOnce is true
    expect(result.current.isVisible).toBe(true);
    expect(result.current.shouldAnimate).toBe(true);
  });

  it('resets state correctly', () => {
    const mockRef = { current: document.createElement('div') };
    const mockEntry = { intersectionRatio: 0.5 };

    mockUseIntersectionObserver.mockReturnValue([mockRef, true, mockEntry]);

    const { result } = renderHook(() => useScrollAnimation());

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.hasBeenVisible).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.isVisible).toBe(false);
    expect(result.current.hasBeenVisible).toBe(false);
    expect(result.current.intersectionRatio).toBe(0);
    expect(result.current.shouldAnimate).toBe(false);
  });

  it('passes correct configuration to useIntersectionObserver', () => {
    const config = {
      threshold: 0.5,
      triggerOnce: false,
      rootMargin: '10px',
    };

    renderHook(() => useScrollAnimation(config));

    expect(mockUseIntersectionObserver).toHaveBeenCalledWith({
      threshold: 0.5,
      triggerOnce: false,
      rootMargin: '10px',
    });
  });

  it('uses default configuration when none provided', () => {
    renderHook(() => useScrollAnimation());

    expect(mockUseIntersectionObserver).toHaveBeenCalledWith({
      threshold: 0.1,
      triggerOnce: true,
      rootMargin: '0px',
    });
  });
});

describe('useScrollProgress', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock document properties
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 0,
    });

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    });

    Object.defineProperty(document.documentElement, 'clientHeight', {
      writable: true,
      configurable: true,
      value: 1000,
    });

    // Mock window.addEventListener
    vi.spyOn(window, 'addEventListener');
    vi.spyOn(window, 'removeEventListener');
  });

  it('initializes with correct scroll progress', () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current).toBe(0);
  });

  it('calculates scroll progress correctly', () => {
    const { result } = renderHook(() => useScrollProgress());

    // Simulate scroll to middle
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 500,
    });

    // Trigger scroll event
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    // Progress should be 500 / (2000 - 1000) = 0.5
    expect(result.current).toBe(0.5);
  });

  it('clamps scroll progress between 0 and 1', () => {
    const { result } = renderHook(() => useScrollProgress());

    // Simulate scroll beyond end
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 2000,
    });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(1);

    // Simulate negative scroll (shouldn't happen but test clamping)
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: -100,
    });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(0);
  });

  it('adds and removes scroll event listener', () => {
    const { unmount } = renderHook(() => useScrollProgress());

    expect(window.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });
});

describe('useElementScrollProgress', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'addEventListener');
    vi.spyOn(window, 'removeEventListener');

    // Mock window.innerHeight
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800,
    });
  });

  it('initializes with zero progress', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useElementScrollProgress(ref));
    expect(result.current).toBe(0);
  });

  it('calculates element scroll progress correctly', () => {
    const mockElement = {
      getBoundingClientRect: vi.fn().mockReturnValue({
        top: 400,
        height: 200,
      }),
    };

    const ref = { current: mockElement as any };
    const { result } = renderHook(() => useElementScrollProgress(ref));

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    // Progress calculation: (800 - 400) / (800 + 200) = 400 / 1000 = 0.4
    expect(result.current).toBe(0.4);
  });

  it('handles element at top of viewport', () => {
    const mockElement = {
      getBoundingClientRect: vi.fn().mockReturnValue({
        top: -100,
        height: 200,
      }),
    };

    const ref = { current: mockElement as any };
    const { result } = renderHook(() => useElementScrollProgress(ref));

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    // Progress calculation: (800 - (-100)) / (800 + 200) = 900 / 1000 = 0.9
    expect(result.current).toBe(0.9);
  });

  it('clamps progress between 0 and 1', () => {
    const mockElement = {
      getBoundingClientRect: vi.fn().mockReturnValue({
        top: 1000, // Below viewport
        height: 200,
      }),
    };

    const ref = { current: mockElement as any };
    const { result } = renderHook(() => useElementScrollProgress(ref));

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(0);

    // Element fully scrolled past
    mockElement.getBoundingClientRect.mockReturnValue({
      top: -1000,
      height: 200,
    });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(1);
  });

  it('adds and removes event listeners', () => {
    const ref = { current: document.createElement('div') };
    const { unmount } = renderHook(() => useElementScrollProgress(ref));

    expect(window.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );

    expect(window.addEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
      { passive: true }
    );

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    );
  });

  it('handles null ref gracefully', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useElementScrollProgress(ref));

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(0);
  });
});
