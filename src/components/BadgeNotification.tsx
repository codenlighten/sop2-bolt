import React, { useState, useEffect } from 'react';
import { Award, X } from 'lucide-react';
import { Badge } from '../types';

interface BadgeNotificationProps {
  badge: Badge;
  onClose: () => void;
}

export function BadgeNotification({ badge, onClose }: BadgeNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 100);
    
    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // Allow animation to complete
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div 
      className={`fixed bottom-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <button 
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 500);
        }}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <X className="w-5 h-5" />
      </button>
      
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          badge.tier === 'gold'
            ? 'bg-yellow-100'
            : badge.tier === 'silver'
              ? 'bg-gray-100'
              : 'bg-orange-100'
        }`}>
          <Award className={`w-8 h-8 ${
            badge.tier === 'gold'
              ? 'text-yellow-600'
              : badge.tier === 'silver'
                ? 'text-gray-600'
                : 'text-orange-600'
          }`} />
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Badge Earned: {badge.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{badge.description}</p>
          {badge.unlockMessage && (
            <p className="text-sm text-blue-600">{badge.unlockMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}