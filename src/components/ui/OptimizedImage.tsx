import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useLazyImage } from '../../hooks/useLazyImage';
import {
  generateOptimizedImageUrls,
  generateSizes,
  generateSrcSet,
  createBlurDataURL,
  checkImageFormatSupport,
  type OptimizedImageSource,
  type ImageOptimizationOptions,
} from '../../utils/image-optimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string | { [breakpoint: string]: string };
  quality?: number;
  priority?: boolean;
  lazy?: boolean;
  placeholder?: 'blur' | 'empty' | string;
  blurDataURL?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: () => void;
  optimization?: ImageOptimizationOptions;
  responsiveWidths?: number[];
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  sizes,
  quality = 75,
  priority = false,
  lazy = true,
  placeholder = 'empty',
  blurDataURL,
  aspectRatio = 'auto',
  objectFit = 'cover',
  onLoad,
  onError,
  optimization = {},
  responsiveWidths = [640, 768, 1024, 1280, 1536],
}) => {
  const [formatSupport, setFormatSupport] = useState<{
    webp: boolean;
    avif: boolean;
  }>({ webp: false, avif: false });
  const [optimizedSource, setOptimizedSource] =
    useState<OptimizedImageSource | null>(null);

  // Use lazy loading hook if lazy is enabled and not priority
  const shouldUseLazy = lazy && !priority;

  // Create options object conditionally to avoid passing undefined
  const lazyImageOptions: { placeholder?: string } = {};
  if (
    typeof placeholder === 'string' &&
    placeholder !== 'blur' &&
    placeholder !== 'empty'
  ) {
    lazyImageOptions.placeholder = placeholder;
  }

  const lazyImage = useLazyImage(src, lazyImageOptions);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Check format support on mount
  useEffect(() => {
    checkImageFormatSupport().then(setFormatSupport);
  }, []);

  // Generate optimized image sources
  useEffect(() => {
    // Build options object conditionally to avoid passing undefined values
    const options: ImageOptimizationOptions = {
      quality,
      ...optimization,
    };

    // Only add width and height if they are defined
    if (width !== undefined) {
      options.width = width;
    }
    if (height !== undefined) {
      options.height = height;
    }

    const optimized = generateOptimizedImageUrls(src, options);
    setOptimizedSource(optimized);
  }, [src, quality, width, height, optimization]);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    auto: '',
  };

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };

  // Generate sizes string
  const sizesString =
    typeof sizes === 'string' ? sizes : sizes ? generateSizes(sizes) : '100vw';

  // Generate srcSet
  const srcSet = optimizedSource
    ? generateSrcSet(optimizedSource.src, responsiveWidths, {
        quality,
        ...optimization,
      })
    : undefined;

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate blur placeholder if needed
  const blurPlaceholder =
    blurDataURL || (placeholder === 'blur' ? createBlurDataURL() : undefined);

  // Determine which source to use
  const imageSrc = shouldUseLazy ? lazyImage.src : src;
  const imageRef = shouldUseLazy ? lazyImage.ref : undefined;

  if (hasError) {
    return (
      <div
        className={cn(
          'bg-gray-200 flex items-center justify-center text-gray-500',
          aspectRatioClasses[aspectRatio],
          className
        )}
        style={{
          ...(width && { width: `${width}px` }),
          ...(height && { height: `${height}px` }),
        }}
      >
        <span className="text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden',
        aspectRatioClasses[aspectRatio],
        className
      )}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isLoaded || (shouldUseLazy && lazyImage.isLoaded) ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {!isLoaded &&
        !lazyImage.isLoaded &&
        placeholder === 'blur' &&
        blurPlaceholder && (
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
            style={{ backgroundImage: `url(${blurPlaceholder})` }}
          />
        )}

      {/* Loading placeholder */}
      {!isLoaded && !lazyImage.isLoaded && placeholder === 'empty' && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Custom placeholder */}
      {!isLoaded &&
        !lazyImage.isLoaded &&
        typeof placeholder === 'string' &&
        placeholder !== 'blur' &&
        placeholder !== 'empty' && (
          <img
            src={placeholder}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        )}

      {optimizedSource && imageSrc && (
        <picture>
          {/* AVIF source */}
          {formatSupport.avif && optimizedSource.avif && (
            <source
              srcSet={optimizedSource.avif}
              type="image/avif"
              sizes={sizesString}
            />
          )}

          {/* WebP source */}
          {formatSupport.webp && optimizedSource.webp && (
            <source
              srcSet={optimizedSource.webp}
              type="image/webp"
              sizes={sizesString}
            />
          )}

          {/* Fallback image */}
          <img
            ref={imageRef}
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            sizes={sizesString}
            srcSet={srcSet}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'w-full h-full transition-opacity duration-300',
              objectFitClasses[objectFit],
              isLoaded || (shouldUseLazy && lazyImage.isLoaded)
                ? 'opacity-100'
                : 'opacity-0'
            )}
          />
        </picture>
      )}
    </motion.div>
  );
};
