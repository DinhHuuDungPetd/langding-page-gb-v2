import React from 'react';

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default FullScreenLoader;
