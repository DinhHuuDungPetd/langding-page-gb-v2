'use client';

import { useEffect } from 'react';

const LazyLibraryLoader = () => {
  useEffect(() => {
    // Load non-critical libraries after initial page load
    const loadLazyLibraries = () => {
      // Preload Swiper modules that might be needed later
      import('swiper/modules').then((modules) => {
        // Modules are now available for future use
        console.log('Swiper modules preloaded');
      }).catch((error) => {
        console.warn('Failed to preload Swiper modules:', error);
      });

      // Preload Framer Motion components
      import('framer-motion').then((motion) => {
        console.log('Framer Motion preloaded');
      }).catch((error) => {
        console.warn('Failed to preload Framer Motion:', error);
      });
    };

    // Delay loading to not interfere with critical resources
    const timer = setTimeout(loadLazyLibraries, 3000);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default LazyLibraryLoader;
