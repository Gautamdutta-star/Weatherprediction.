import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/40 border-b-transparent rounded-full animate-spin animation-delay-150"></div>
        </div>
      </div>
    </div>
  );
};