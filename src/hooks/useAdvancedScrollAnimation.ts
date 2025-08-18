import { useEffect, useState, useCallback, useMemo } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

export interface AdvancedScrollAnimationConfig {
  threshold?: number | number[];
  triggerOnce?: boolean;
  delay?: number;
  rootMargin?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onProgress?: (progress: number) => void;
}

export interface AdvancedScrollAnimationState {
  isVisible: boolean;
  hasBeenVisible: boolean;
  intersectionRatio: number;
  shouldAnimate: boolean;
  progress: number;
  isEntering: boolean;
  isLeaving: boolean;
}

export const useAdvancedScrollAnimation = <T extends Element = HTMLDivElement>(
  config: AdvancedScrollAnimationConfig = {}
) => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    delay = 0,
    rootMargin = '0px',
    onEnter,
    onLeave,
    onProgress,
  } = config;

  const [ref, isIntersecting, entry] = useIntersectionObserver<T>({
    threshold,
    triggerOnce,
    rootMargin,
  });

  const [state, setState] = useState<AdvancedScrollAnimationState>({
    isVisible: false,
    hasBeenVisible: false,
    intersectionRatio: 0,
    shouldAnimate: false,
    progress: 0,
    isEntering: false,
    isLeaving: false,
  });

  const [previousIntersecting, setPreviousIntersecting] = useState(false);

  // Calculate progress based on intersection ratio
  const progress = useMemo(() => {
    if (!entry) return 0;
    return Math.min(Math.max(entry.intersectionRatio, 0), 1);
  }, [entry]);

  // Determine if element is entering or leaving
  const isEntering = isIntersecting && !previousIntersecting;
  const isLeaving = !isIntersecting && previousIntersecting;

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setState(prev => ({
          ...prev,
          isVisible: true,
          hasBeenVisible: true,
          shouldAnimate: true,
          intersectionRatio: entry?.intersectionRatio ?? 0,
          progress,
          isEntering,
          isLeaving: false,
        }));

        onEnter?.();
      }, delay);

      return () => clearTimeout(timer);
    } else if (!triggerOnce) {
      setState(prev => ({
        ...prev,
        isVisible: false,
        shouldAnimate: false,
        intersectionRatio: entry?.intersectionRatio ?? 0,
        progress,
        isEntering: false,
        isLeaving,
      }));

      if (isLeaving) {
        onLeave?.();
      }
    }

    setPreviousIntersecting(isIntersecting);
  }, [
    isIntersecting,
    delay,
    triggerOnce,
    entry,
    progress,
    isEntering,
    isLeaving,
    onEnter,
    onLeave,
  ]);

  // Call progress callback
  useEffect(() => {
    onProgress?.(progress);
  }, [progress, onProgress]);

  const reset = useCallback(() => {
    setState({
      isVisible: false,
      hasBeenVisible: false,
      intersectionRatio: 0,
      shouldAnimate: false,
      progress: 0,
      isEntering: false,
      isLeaving: false,
    });
    setPreviousIntersecting(false);
  }, []);

  const forceAnimate = useCallback(() => {
    setState(prev => ({
      ...prev,
      shouldAnimate: true,
      isVisible: true,
    }));
  }, []);

  return {
    ref,
    ...state,
    reset,
    forceAnimate,
  };
};

// Hook for scroll-based element tracking
export const useScrollElementTracking = <T extends Element = HTMLDivElement>(
  callback: (element: T, progress: number) => void,
  deps: unknown[] = []
) => {
  const [ref, isIntersecting, entry] = useIntersectionObserver<T>({
    threshold: [0, 0.25, 0.5, 0.75, 1],
    triggerOnce: false,
    rootMargin: '0px',
  });

  useEffect(() => {
    if (isIntersecting && ref.current && entry) {
      callback(ref.current, entry.intersectionRatio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting, entry, callback, ref, ...deps]);

  return ref;
};

// Hook for multiple scroll thresholds
export const useMultiThresholdScroll = <T extends Element = HTMLDivElement>(
  thresholds: number[],
  callbacks: Record<number, () => void>
) => {
  const [ref, isIntersecting, entry] = useIntersectionObserver<T>({
    threshold: thresholds,
    triggerOnce: false,
    rootMargin: '0px',
  });

  const [triggeredThresholds, setTriggeredThresholds] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    if (isIntersecting && entry) {
      const currentRatio = entry.intersectionRatio;

      thresholds.forEach(threshold => {
        if (currentRatio >= threshold && !triggeredThresholds.has(threshold)) {
          callbacks[threshold]?.();
          setTriggeredThresholds(prev => new Set(prev).add(threshold));
        }
      });
    }
  }, [isIntersecting, entry, thresholds, callbacks, triggeredThresholds]);

  const reset = useCallback(() => {
    setTriggeredThresholds(new Set());
  }, []);

  return { ref, reset, triggeredThresholds: Array.from(triggeredThresholds) };
};
