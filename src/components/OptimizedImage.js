'use client';

import Image from 'next/image';
import { useState, memo, useCallback } from 'react';

const OptimizedImage = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  sizes,
  placeholder = 'blur',
  blurDataURL
}) => {
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setLoading(false);
  }, []);

  // Generate blur placeholder if not provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

  if (hasError) {
    return (
      <div className={`relative overflow-hidden bg-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-sm">Image failed to load</div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        className={`
          duration-500 ease-in-out transition-all
          ${isLoading ? 'scale-105 blur-sm opacity-70' : 'scale-100 blur-0 opacity-100'}
        `}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage; 