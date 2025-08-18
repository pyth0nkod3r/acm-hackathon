import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export interface IntersectionObserverEntry {
  isIntersecting: boolean;
  intersectionRatio: number;
  target: Element;
  boundingClientRect: DOMRectReadOnly;
  intersectionRect: DOMRectReadOnly;
  rootBounds: DOMRectReadOnly | null;
  time: number;
}

export const useIntersectionObserver = <T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean, IntersectionObserverEntry | null] => {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const elementRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;

        setIsIntersecting(isElementIntersecting);
        setEntry({
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
          target: entry.target,
          boundingClientRect: entry.boundingClientRect,
          intersectionRect: entry.intersectionRect,
          rootBounds: entry.rootBounds,
          time: entry.time,
        });

        if (isElementIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, root, rootMargin, triggerOnce]);

  return [elementRef, isIntersecting, entry];
};
