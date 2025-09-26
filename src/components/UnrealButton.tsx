'use client';

import { useState } from 'react';

interface ScopeButtonProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ScopeButton({ 
  message = "This feature is outside the current project scope", 
  className = "",
  children = "Feature Demo"
}: ScopeButtonProps) {
  const [isShowingMessage, setIsShowingMessage] = useState(false);

  const handleClick = () => {
    setIsShowingMessage(true);
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setIsShowingMessage(false);
    }, 3000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-700 transition-colors ${className}`}
      >
        {children}
      </button>
      
      {isShowingMessage && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-blue-100 border border-blue-300 rounded-lg p-3 shadow-lg z-10 w-64">
          <div className="flex items-start">
            <span className="text-blue-600 mr-2 mt-0.5">ℹ️</span>
            <p className="text-blue-800 text-sm">{message}</p>
          </div>
          <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-100 border-t border-l border-blue-300 rotate-45"></div>
        </div>
      )}
    </div>
  );
}