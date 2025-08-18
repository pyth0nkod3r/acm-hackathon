import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '../../hooks/useResponsive';
import { cn } from '../../lib/utils';

interface ImageSource {
  src: string;
  webp?: string;
  avif?: string;
}

interface ResponsiveImageProps {
  src: string | ImageSource;
  alt: string;
  className?: string;
  mobileSrc?: string | ImageSource;
  tabletSrc?: string | ImageSource;
  desktopSrc?: string | ImageSource;
  sizes?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  quality?: number;
  width?: number;
  height?: number;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className,
  mobileSrc,
  tabletSrc,
  desktopSrc,
  sizes,
  priority = false,
  loading = 'lazy',
  onLoad,
  onError,
  aspectRatio = 'auto',
  objectFit = 'cover',
  placeholder = 'empty',
  blurDataURL,
  width,
  height,
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Helper function to normalize image source
  const normalizeImageSource = (source: string | ImageSource): ImageSource => {
    if (typeof source === 'string') {
      return { src: source };
    }
    return source;
  };

  // Determine which image source to use based on screen size
  const getImageSource = (): ImageSource => {
    if (isMobile && mobileSrc) return normalizeImageSource(mobileSrc);
    if (isTablet && tabletSrc) return normalizeImageSource(tabletSrc);
    if (isDesktop && desktopSrc) return normalizeImageSource(desktopSrc);
    return normalizeImageSource(src);
  };

  // Generate srcSet for different formats
  const generateSrcSet = (imageSource: ImageSource) => {
    const sources = [];

    if (imageSource.avif) {
      sources.push({
        srcSet: imageSource.avif,
        type: 'image/avif',
      });
    }

    if (imageSource.webp) {
      sources.push({
        srcSet: imageSource.webp,
        type: 'image/webp',
      });
    }

    sources.push({
      srcSet: imageSource.src,
      type: 'image/jpeg',
    });

    return sources;
  };

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

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const defaultSizes =
    sizes || (isMobile ? '100vw' : isTablet ? '50vw' : '33vw');

  const imageSource = getImageSource();
  const sources = generateSrcSet(imageSource);

  if (hasError) {
    return (
      <div
        className={cn(
          'bg-gray-200 flex items-center justify-center text-gray-500',
          aspectRatioClasses[aspectRatio],
          className
        )}
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
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {!isLoaded && placeholder === 'blur' && blurDataURL && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
          style={{
            backgroundImage: `url(${blurDataURL})`,
          }}
        />
      )}

      {/* Loading placeholder */}
      {!isLoaded && placeholder === 'empty' && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      <picture>
        {sources.map((source, index) => (
          <source
            key={index}
            srcSet={source.srcSet}
            type={source.type}
            sizes={defaultSizes}
          />
        ))}
        <img
          src={imageSource.src}
          alt={alt}
          sizes={defaultSizes}
          loading={priority ? 'eager' : loading}
          onLoad={handleLoad}
          onError={handleError}
          width={width}
          height={height}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            objectFitClasses[objectFit],
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      </picture>
    </motion.div>
  );
};
