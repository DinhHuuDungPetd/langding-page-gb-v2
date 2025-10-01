'use client';

import { useEffect } from 'react';

const FontLoader = () => {
  useEffect(() => {
    // Load secondary fonts after initial page load
    const loadSecondaryFonts = () => {
      const fontFiles = [
        '/fonts/FzPoppins-Italic.woff2',
        '/fonts/FzPoppins-MediumItalic.woff2',
        '/fonts/FzPoppins-BoldItalic.woff2',
        '/fonts/FzPoppins-SemiBoldItalic.woff2',
      ];

      fontFiles.forEach((fontPath) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.href = fontPath;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Delay loading secondary fonts to prioritize critical resources
    const timer = setTimeout(loadSecondaryFonts, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default FontLoader;
