import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  preloadCriticalImages,
  preloadRouteImages,
  prefetchNextPageImages,
} from '../utils/preload-images';

/**
 * Hook for managing image preloading based on current route
 */
export function useImagePreloading() {
  const location = useLocation();

  useEffect(() => {
    // Preload critical images on app start
    preloadCriticalImages().catch(console.warn);
  }, []);

  useEffect(() => {
    // Preload images for current route
    preloadRouteImages(location.pathname).catch(console.warn);

    // Prefetch images for likely next pages
    prefetchNextPageImages(location.pathname);
  }, [location.pathname]);
}

/**
 * Hook for preloading specific images
 */
export function usePreloadImages(images: string[], enabled: boolean = true) {
  useEffect(() => {
    if (!enabled || images.length === 0) return;

    const preloadPromises = images.map(src => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to preload: ${src}`));
        img.src = src;
      });
    });

    Promise.all(preloadPromises).catch(console.warn);
  }, [images, enabled]);
}
