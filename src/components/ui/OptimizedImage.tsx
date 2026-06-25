import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { useLazyImage } from '../../hooks/useLazyImage';
import {
  generateOptimizedImageUrls,
  generateSizes,
  generateSrcSet,
  checkImageFormatSupport,
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
  lazy = false,
  placeholder = 'empty',
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

  const [hasError, setHasError] = useState(false);

  // Check format support on mount
  useEffect(() => {
    checkImageFormatSupport().then(setFormatSupport);
  }, []);

  // Generate optimized image sources synchronously
  const options: ImageOptimizationOptions = {
    quality,
    ...optimization,
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
  };
  const optimizedSource = generateOptimizedImageUrls(src, options);

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
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

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
    <div
      className={cn(
        'relative overflow-hidden',
        aspectRatioClasses[aspectRatio],
        className
      )}
      style={{ width, height }}
    >
      {optimizedSource && imageSrc && (
        <picture>
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
            loading="eager"
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'w-full h-full',
              objectFitClasses[objectFit]
            )}
          />
        </picture>
      )}
    </div>
  );
};
