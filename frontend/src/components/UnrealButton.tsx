'use client';

import { useState } from 'react';

interface GoofyButtonProps {
  message?: string;
  className?: string;
  children?: React.ReactNode; // Add children prop
}

export default function GoofyButton({ 
  message = "This button is only for presentation! 🎭", 
  className = "",
  children = "✨ Click for Magic! ✨" // Default children
}: GoofyButtonProps) {
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
        className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 active:scale-95 ${className}`}
      >
        {children}
      </button>
      
      {isShowingMessage && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 shadow-lg z-10 animate-bounce">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🤪</span>
            <p className="text-yellow-800 font-medium">{message}</p>
          </div>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-100 border-t-2 border-l-2 border-yellow-400 rotate-45"></div>
        </div>
      )}
    </div>
  );
}