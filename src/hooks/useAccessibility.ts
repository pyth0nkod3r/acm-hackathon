/**
 * Accessibility hooks for managing focus, keyboard navigation, and screen reader support
 */

import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * Hook for managing focus trap within a component (useful for modals, dropdowns)
 */
export function useFocusTrap(isActive: boolean = true) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Allow parent components to handle escape
        const escapeEvent = new CustomEvent('focustrap:escape', {
          bubbles: true,
        });
        container.dispatchEvent(escapeEvent);
      }
    };

    container.addEventListener('keydown', handleTabKey);
    container.addEventListener('keydown', handleEscapeKey);

    // Focus first element when trap becomes active
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
      container.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isActive]);

  return containerRef;
}

/**
 * Hook for managing focus restoration after modal/dialog closes
 */
export function useFocusRestore() {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const saveFocus = useCallback(() => {
    previousActiveElement.current = document.activeElement as HTMLElement;
  }, []);

  const restoreFocus = useCallback(() => {
    if (previousActiveElement.current) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, []);

  return { saveFocus, restoreFocus };
}

/**
 * Hook for keyboard navigation support
 */
export function useKeyboardNavigation(
  onEnter?: () => void,
  onEscape?: () => void,
  onArrowUp?: () => void,
  onArrowDown?: () => void,
  onArrowLeft?: () => void,
  onArrowRight?: () => void
) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          onEnter?.();
          e.preventDefault();
          break;
        case 'Escape':
          onEscape?.();
          e.preventDefault();
          break;
        case 'ArrowUp':
          onArrowUp?.();
          e.preventDefault();
          break;
        case 'ArrowDown':
          onArrowDown?.();
          e.preventDefault();
          break;
        case 'ArrowLeft':
          onArrowLeft?.();
          e.preventDefault();
          break;
        case 'ArrowRight':
          onArrowRight?.();
          e.preventDefault();
          break;
      }
    },
    [onEnter, onEscape, onArrowUp, onArrowDown, onArrowLeft, onArrowRight]
  );

  return { handleKeyDown };
}

/**
 * Hook for managing ARIA live regions for screen reader announcements
 */
export function useAriaLiveRegion() {
  const [announcement, setAnnouncement] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const announce = useCallback(
    (message: string, _priority: 'polite' | 'assertive' = 'polite') => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setAnnouncement(message);

      // Clear announcement after a delay to allow screen readers to read it
      timeoutRef.current = setTimeout(() => {
        setAnnouncement('');
      }, 1000);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { announcement, announce };
}

/**
 * Hook for managing skip links navigation
 */
export function useSkipLinks() {
  const skipLinksRef = useRef<HTMLElement>(null);

  const focusSkipLinks = useCallback(() => {
    if (skipLinksRef.current) {
      const firstSkipLink = skipLinksRef.current.querySelector(
        'a'
      ) as HTMLElement;
      firstSkipLink?.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show skip links on Tab key
      if (e.key === 'Tab' && !e.shiftKey) {
        focusSkipLinks();
      }
    };

    document.addEventListener('keydown', handleKeyDown, { once: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusSkipLinks]);

  return skipLinksRef;
}

/**
 * Hook for managing reduced motion preferences
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for managing high contrast mode detection
 */
export function useHighContrast() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const checkHighContrast = () => {
      // Check for Windows high contrast mode
      const isWindowsHighContrast = window.matchMedia(
        '(prefers-contrast: high)'
      ).matches;

      // Check for forced colors (Windows high contrast)
      const isForcedColors = window.matchMedia(
        '(forced-colors: active)'
      ).matches;

      setIsHighContrast(isWindowsHighContrast || isForcedColors);
    };

    checkHighContrast();

    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    const forcedColorsQuery = window.matchMedia('(forced-colors: active)');

    contrastQuery.addEventListener('change', checkHighContrast);
    forcedColorsQuery.addEventListener('change', checkHighContrast);

    return () => {
      contrastQuery.removeEventListener('change', checkHighContrast);
      forcedColorsQuery.removeEventListener('change', checkHighContrast);
    };
  }, []);

  return isHighContrast;
}

/**
 * Hook for managing color scheme preferences
 */
export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return colorScheme;
}
