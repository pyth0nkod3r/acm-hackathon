/**
 * Utility for preloading critical images
 */

interface PreloadImageOptions {
  as?: 'image';
  crossorigin?: 'anonymous' | 'use-credentials';
  fetchpriority?: 'high' | 'low' | 'auto';
}

/**
 * Preload a single image
 */
export function preloadImage(
  src: string,
  options: PreloadImageOptions = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already preloaded
    const existingLink = document.querySelector(`link[href="${src}"]`);
    if (existingLink) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = options.as || 'image';
    link.href = src;

    if (options.crossorigin) {
      link.crossOrigin = options.crossorigin;
    }

    if (options.fetchpriority) {
      link.setAttribute('fetchpriority', options.fetchpriority);
    }

    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to preload image: ${src}`));

    document.head.appendChild(link);
  });
}

/**
 * Preload multiple images
 */
export function preloadImages(
  sources: string[],
  options: PreloadImageOptions = {}
): Promise<void[]> {
  return Promise.all(sources.map(src => preloadImage(src, options)));
}

/**
 * Preload critical images for the current page
 */
export function preloadCriticalImages(): Promise<void[]> {
  const criticalImages: string[] = [
    // Add your critical images here
    // Example: '/images/hero-bg.jpg',
    // Example: '/images/logo.png',
  ];

  return preloadImages(criticalImages, { fetchpriority: 'high' });
}

/**
 * Preload images based on route
 */
export function preloadRouteImages(route: string): Promise<void[]> {
  const routeImageMap: Record<string, string[]> = {
    '/': [
      // Home page critical images
    ],
    '/about': [
      // About page images
    ],
    '/gallery': [
      // Gallery page images
    ],
    // Add more routes as needed
  };

  const images = routeImageMap[route] || [];
  return preloadImages(images);
}

/**
 * Prefetch images for likely next navigation
 */
export function prefetchNextPageImages(currentRoute: string): void {
  const nextPageMap: Record<string, string[]> = {
    '/': ['/about', '/application'],
    '/about': ['/challenges', '/application'],
    '/challenges': ['/application', '/schedule'],
    // Add more navigation patterns
  };

  const nextRoutes = nextPageMap[currentRoute] || [];

  nextRoutes.forEach(route => {
    // Use requestIdleCallback if available for non-critical prefetching
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        preloadRouteImages(route);
      });
    } else {
      setTimeout(() => {
        preloadRouteImages(route);
      }, 100);
    }
  });
}
