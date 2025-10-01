'use client';

import { useEffect } from 'react';

const ResourcePreloader = () => {
  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      'https://res.cloudinary.com/dgfwxibj4/image/upload/v1758854205/wizpfnza5gkqmuvhd7tb.avif',
      'https://res.cloudinary.com/dgfwxibj4/image/upload/v1747302696/slider/mbhcprkhphijmah7qqwi.png',
    ];

    criticalImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload next page resources after initial load
    const preloadNextPageResources = () => {
      const nextPageImages = [
        'https://res.cloudinary.com/dgfwxibj4/image/upload/v1749718719/slider/mkklh6sjdltvb4qhspj6.png',
        'https://res.cloudinary.com/dgfwxibj4/image/upload/v1747302696/slider/opobc9simuxikbbshcao.png',
      ];

      nextPageImages.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Delay preloading to not interfere with critical resources
    const timer = setTimeout(preloadNextPageResources, 2000);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default ResourcePreloader;
