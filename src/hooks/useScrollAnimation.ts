import { useEffect, useState, useCallback } from 'react';
import type { RefObject } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

export interface ScrollAnimationConfig {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  rootMargin?: string;
}

export interface ScrollAnimationState {
  isVisible: boolean;
  hasBeenVisible: boolean;
  intersectionRatio: number;
  shouldAnimate: boolean;
}

export const useScrollAnimation = <T extends Element = HTMLDivElement>(
  config: ScrollAnimationConfig = {}
) => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    delay = 0,
    rootMargin = '0px',
  } = config;

  const [ref, isIntersecting, entry] = useIntersectionObserver<T>({
    threshold,
    triggerOnce,
    rootMargin,
  });

  const [state, setState] = useState<ScrollAnimationState>({
    isVisible: false,
    hasBeenVisible: false,
    intersectionRatio: 0,
    shouldAnimate: false,
  });

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setState(prev => ({
          ...prev,
          isVisible: true,
          hasBeenVisible: true,
          shouldAnimate: true,
          intersectionRatio: entry?.intersectionRatio || 0,
        }));
      }, delay);

      return () => clearTimeout(timer);
    } else if (!triggerOnce) {
      setState(prev => ({
        ...prev,
        isVisible: false,
        shouldAnimate: false,
        intersectionRatio: entry?.intersectionRatio || 0,
      }));
    }
  }, [isIntersecting, delay, triggerOnce, entry]);

  const reset = useCallback(() => {
    setState({
      isVisible: false,
      hasBeenVisible: false,
      intersectionRatio: 0,
      shouldAnimate: false,
    });
  }, []);

  return {
    ref,
    ...state,
    reset,
  };
};

// Hook for scroll-based value interpolation
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;

      setScrollProgress(Math.min(Math.max(scrolled, 0), 1));
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initial call

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return scrollProgress;
};

// Hook for element scroll progress
export const useElementScrollProgress = <T extends Element = HTMLDivElement>(
  ref: RefObject<T>
) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateProgress = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the element has been scrolled past
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Progress from 0 (element just entering viewport) to 1 (element fully passed)
      const scrolled = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - elementTop) / (windowHeight + elementHeight)
        )
      );

      setProgress(scrolled);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress(); // Initial call

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [ref]);

  return progress;
};
