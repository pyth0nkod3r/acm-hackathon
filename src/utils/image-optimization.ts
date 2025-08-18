/**
 * Image optimization utilities
 */

export interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

export interface OptimizedImageSource {
  src: string;
  webp?: string;
  avif?: string;
  width?: number;
  height?: number;
}

/**
 * Generate optimized image URLs for different formats
 * This is a placeholder implementation - in a real app, you'd integrate with
 * an image optimization service like Cloudinary, ImageKit, or Next.js Image Optimization
 */
export function generateOptimizedImageUrls(
  originalSrc: string,
  options: ImageOptimizationOptions = {}
): OptimizedImageSource {
  const { quality = 75, width, height } = options;

  // For now, return the original source
  // In production, you would generate optimized URLs here
  const optimizedSrc = originalSrc;

  // Generate WebP and AVIF versions (placeholder logic)
  const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const avifSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.avif');

  return {
    src: optimizedSrc,
    webp: webpSrc,
    avif: avifSrc,
    width,
    height,
  };
}

/**
 * Generate responsive image sizes string
 */
export function generateSizes(breakpoints: { [key: string]: string }): string {
  const sizeEntries = Object.entries(breakpoints)
    .map(([breakpoint, size]) => {
      if (breakpoint === 'default') return size;
      return `(${breakpoint}) ${size}`;
    })
    .reverse(); // Largest first for media queries

  return sizeEntries.join(', ');
}

/**
 * Generate srcSet for responsive images
 */
export function generateSrcSet(
  baseSrc: string,
  widths: number[],
  options: ImageOptimizationOptions = {}
): string {
  return widths
    .map(width => {
      const optimizedUrl = generateOptimizedImageUrls(baseSrc, {
        ...options,
        width,
      });
      return `${optimizedUrl.src} ${width}w`;
    })
    .join(', ');
}

/**
 * Create a blur data URL for placeholder
 */
export function createBlurDataURL(
  width: number = 10,
  height: number = 10,
  color: string = '#f3f4f6'
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
}

/**
 * Preload critical images
 */
export function preloadImage(
  src: string,
  options: { as?: string; crossorigin?: string } = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = options.as || 'image';
    link.href = src;

    if (options.crossorigin) {
      link.crossOrigin = options.crossorigin;
    }

    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to preload image: ${src}`));

    document.head.appendChild(link);
  });
}

/**
 * Lazy load images with Intersection Observer
 */
export class LazyImageLoader {
  private observer: IntersectionObserver;
  private images: Set<HTMLImageElement> = new Set();

  constructor(options: IntersectionObserverInit = {}) {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
        ...options,
      }
    );
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        this.loadImage(img);
        this.observer.unobserve(img);
        this.images.delete(img);
      }
    });
  }

  private loadImage(img: HTMLImageElement) {
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;

    if (src) {
      img.src = src;
    }

    if (srcset) {
      img.srcset = srcset;
    }

    img.classList.remove('lazy');
    img.classList.add('loaded');
  }

  observe(img: HTMLImageElement) {
    this.images.add(img);
    this.observer.observe(img);
  }

  unobserve(img: HTMLImageElement) {
    this.images.delete(img);
    this.observer.unobserve(img);
  }

  disconnect() {
    this.observer.disconnect();
    this.images.clear();
  }
}

/**
 * Get optimal image dimensions based on container and device pixel ratio
 */
export function getOptimalImageDimensions(
  containerWidth: number,
  containerHeight: number,
  devicePixelRatio: number = window.devicePixelRatio || 1
): { width: number; height: number } {
  return {
    width: Math.ceil(containerWidth * devicePixelRatio),
    height: Math.ceil(containerHeight * devicePixelRatio),
  };
}

/**
 * Check if browser supports modern image formats
 */
export function checkImageFormatSupport(): Promise<{
  webp: boolean;
  avif: boolean;
}> {
  return Promise.all([checkWebPSupport(), checkAVIFSupport()]).then(
    ([webp, avif]) => ({ webp, avif })
  );
}

function checkWebPSupport(): Promise<boolean> {
  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

function checkAVIFSupport(): Promise<boolean> {
  return new Promise(resolve => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=';
  });
}
