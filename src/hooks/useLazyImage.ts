import { useEffect, useRef, useState } from 'react';

interface UseLazyImageOptions {
  rootMargin?: string;
  threshold?: number;
  placeholder?: string;
}

interface UseLazyImageReturn {
  ref: React.RefObject<HTMLImageElement | null>;
  isLoaded: boolean;
  isInView: boolean;
  src: string | undefined;
}

/**
 * Hook for lazy loading images with Intersection Observer
 */
export function useLazyImage(
  imageSrc: string,
  options: UseLazyImageOptions = {}
): UseLazyImageReturn {
  const { rootMargin = '50px 0px', threshold = 0.01, placeholder } = options;

  const ref = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [src, setSrc] = useState<string | undefined>(placeholder);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsInView(true);
          setSrc(imageSrc);
          observer.unobserve(element);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [imageSrc, rootMargin, threshold]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !src || src === placeholder) return;

    const handleLoad = () => {
      setIsLoaded(true);
    };

    const handleError = () => {
      setIsLoaded(false);
      // Optionally set a fallback image
      setSrc(placeholder);
    };

    element.addEventListener('load', handleLoad);
    element.addEventListener('error', handleError);

    return () => {
      element.removeEventListener('load', handleLoad);
      element.removeEventListener('error', handleError);
    };
  }, [src, placeholder]);

  return {
    ref,
    isLoaded,
    isInView,
    src,
  };
}
