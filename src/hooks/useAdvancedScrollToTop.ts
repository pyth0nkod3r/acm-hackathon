import { useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export interface AdvancedScrollToTopOptions {
  /**
   * Custom scroll target element selector
   * @default window
   */
  target?: string | Element;
  /**
   * Scroll behavior
   * @default 'smooth'
   */
  behavior?: ScrollBehavior;
  /**
   * Custom scroll duration for manual control (overrides behavior)
   */
  duration?: number;
  /**
   * Easing function for custom duration
   * @default 'easeInOutCubic'
   */
  easing?: 'linear' | 'easeInOutCubic' | 'easeInOutQuad';
  /**
   * Offset from top in pixels
   * @default 0
   */
  offset?: number;
  /**
   * Callback when scroll starts
   */
  onScrollStart?: () => void;
  /**
   * Callback when scroll completes
   */
  onScrollComplete?: () => void;
  /**
   * Callback during scroll with progress (0-1)
   */
  onScrollProgress?: (progress: number) => void;
}

// Easing functions
const easingFunctions = {
  linear: (t: number) => t,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};

/**
 * Advanced hook for smooth scrolling to top with custom animations and targets
 */
export const useAdvancedScrollToTop = (
  options: AdvancedScrollToTopOptions = {}
) => {
  const {
    target,
    offset = 0,
  } = options;

  const location = useLocation();
  const animationRef = useRef<number>();

  const getScrollElement = useCallback(() => {
    if (!target) return window;
    if (typeof target === 'string') {
      return document.querySelector(target) || window;
    }
    return target;
  }, [target]);

  const getCurrentScrollTop = useCallback(() => {
    const element = getScrollElement();
    if (element === window) {
      return window.pageYOffset || document.documentElement.scrollTop;
    }
    return (element as Element).scrollTop;
  }, [getScrollElement]);

  const setScrollTop = useCallback(
    (value: number) => {
      const element = getScrollElement();
      if (element === window) {
        window.scrollTo(0, value);
      } else {
        (element as Element).scrollTop = value;
      }
    },
    [getScrollElement]
  );

  const scrollToTop = useCallback(
    (customOptions?: Partial<AdvancedScrollToTopOptions>) => {
      const finalOptions = { ...options, ...customOptions };
      const startTime = performance.now();
      const startScrollTop = getCurrentScrollTop();
      const targetScrollTop = finalOptions.offset || 0;
      const scrollDistance = startScrollTop - targetScrollTop;

      // Cancel any existing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      finalOptions.onScrollStart?.();

      // Use native smooth scroll if no custom duration is specified
      if (!finalOptions.duration) {
        if (finalOptions.behavior === 'smooth') {
          const element = getScrollElement();
          if (element === window) {
            window.scrollTo({
              top: targetScrollTop,
              behavior: 'smooth',
            });
          } else {
            (element as Element).scrollTo({
              top: targetScrollTop,
              behavior: 'smooth',
            });
          }
        } else {
          setScrollTop(targetScrollTop);
        }

        // Estimate completion time for callback
        setTimeout(() => {
          finalOptions.onScrollComplete?.();
        }, 300);
        return;
      }

      // Custom animation
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / finalOptions.duration!, 1);

        const easedProgress =
          easingFunctions[finalOptions.easing || 'easeInOutCubic'](progress);
        const currentScrollTop =
          startScrollTop - scrollDistance * easedProgress;

        setScrollTop(currentScrollTop);
        finalOptions.onScrollProgress?.(progress);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          finalOptions.onScrollComplete?.();
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    },
    [options, getCurrentScrollTop, setScrollTop, getScrollElement]
  );

  const scrollToElement = useCallback(
    (
      elementOrSelector: string | Element,
      customOptions?: Partial<AdvancedScrollToTopOptions>
    ) => {
      const element =
        typeof elementOrSelector === 'string'
          ? document.querySelector(elementOrSelector)
          : elementOrSelector;

      if (!element) return;

      const elementTop =
        element.getBoundingClientRect().top + getCurrentScrollTop();
      const targetTop = elementTop - (customOptions?.offset || offset);

      scrollToTop({
        ...customOptions,
        offset: targetTop,
      });
    },
    [scrollToTop, getCurrentScrollTop, offset]
  );

  const cancelScroll = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
    }
  }, []);

  return {
    scrollToTop,
    scrollToElement,
    cancelScroll,
    currentPath: location.pathname,
  };
};

/**
 * Hook for smooth scrolling to specific elements with intersection observer
 */
export const useScrollToSection = () => {
  const { scrollToElement } = useAdvancedScrollToTop({
    duration: 800,
    easing: 'easeInOutCubic',
    offset: 80, // Account for fixed header
  });

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        scrollToElement(element);
      }
    },
    [scrollToElement]
  );

  return { scrollToSection };
};
