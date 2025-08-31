import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface UseScrollToTopOptions {
  /**
   * Whether to enable smooth scrolling behavior
   * @default true
   */
  smooth?: boolean;
  /**
   * Delay before scrolling (in milliseconds)
   * @default 0
   */
  delay?: number;
  /**
   * Whether to scroll to top on route changes
   * @default true
   */
  enabled?: boolean;
  /**
   * Custom scroll behavior
   * @default 'smooth'
   */
  behavior?: ScrollBehavior;
  /**
   * Routes to exclude from auto-scroll
   * @default []
   */
  excludeRoutes?: string[];
  /**
   * Callback function called before scrolling
   */
  onBeforeScroll?: (pathname: string) => void;
  /**
   * Callback function called after scrolling
   */
  onAfterScroll?: (pathname: string) => void;
}

/**
 * Custom hook that automatically scrolls to top on route changes
 * with smooth animation and customizable options
 */
export const useScrollToTop = (options: UseScrollToTopOptions = {}) => {
  const {
    smooth = true,
    delay = 0,
    enabled = true,
    behavior = 'smooth',
    excludeRoutes = [],
    onBeforeScroll,
    onAfterScroll,
  } = options;

  const location = useLocation();

  useEffect(() => {
    if (!enabled) return;

    // Check if current route should be excluded
    if (excludeRoutes.includes(location.pathname)) return;

    const scrollToTop = () => {
      onBeforeScroll?.(location.pathname);

      if (smooth) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior,
        });
      } else {
        window.scrollTo(0, 0);
      }

      // Call onAfterScroll after a brief delay to ensure scroll is complete
      setTimeout(() => {
        onAfterScroll?.(location.pathname);
      }, behavior === 'smooth' ? 300 : 0);
    };

    if (delay > 0) {
      const timer = setTimeout(scrollToTop, delay);
      return () => clearTimeout(timer);
    } else {
      scrollToTop();
    }
  }, [
    location.pathname,
    smooth,
    delay,
    enabled,
    behavior,
    excludeRoutes,
    onBeforeScroll,
    onAfterScroll,
  ]);

  // Manual scroll to top function
  const scrollToTop = (customOptions?: Partial<UseScrollToTopOptions>) => {
    const finalOptions = { ...options, ...customOptions };
    
    finalOptions.onBeforeScroll?.(location.pathname);

    if (finalOptions.smooth !== false) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: finalOptions.behavior || 'smooth',
      });
    } else {
      window.scrollTo(0, 0);
    }

    setTimeout(() => {
      finalOptions.onAfterScroll?.(location.pathname);
    }, finalOptions.behavior === 'smooth' ? 300 : 0);
  };

  return { scrollToTop };
};

/**
 * Simple version of useScrollToTop with minimal configuration
 */
export const useSimpleScrollToTop = () => {
  return useScrollToTop({
    smooth: true,
    delay: 100, // Small delay to allow page transition to start
    behavior: 'smooth',
  });
};