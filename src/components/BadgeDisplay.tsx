import React from 'react';
import { Badge as BadgeType } from '../types';
import * as Icons from 'lucide-react';

interface BadgeDisplayProps {
  badge: BadgeType;
  earned?: boolean;
  progress?: number;
}

export function BadgeDisplay({ badge, earned = false, progress = 0 }: BadgeDisplayProps) {
  const Icon = Icons[badge.icon as keyof typeof Icons];
  
  return (
    <div className={`p-4 rounded-lg border ${
      earned 
        ? badge.tier === 'gold'
          ? 'bg-yellow-50 border-yellow-200'
          : badge.tier === 'silver'
            ? 'bg-gray-50 border-gray-200'
            : 'bg-orange-50 border-orange-200'
        : 'bg-gray-50 border-gray-200 opacity-50'
    }`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          earned
            ? badge.tier === 'gold'
              ? 'bg-yellow-100'
              : badge.tier === 'silver'
                ? 'bg-gray-100'
                : 'bg-orange-100'
            : 'bg-gray-100'
        }`}>
          <Icon className={`w-6 h-6 ${
            earned
              ? badge.tier === 'gold'
                ? 'text-yellow-600'
                : badge.tier === 'silver'
                  ? 'text-gray-600'
                  : 'text-orange-600'
              : 'text-gray-400'
          }`} />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{badge.name}</h3>
          <p className="text-sm text-gray-600">{badge.description}</p>
        </div>
      </div>

      {!earned && progress > 0 && (
        <div className="mt-2">
          <div className="text-sm text-gray-600 mb-1">Progress: {progress}%</div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-3 space-y-2">
        {badge.requirements.map((req, index) => (
          <div 
            key={index}
            className={`text-sm ${earned ? 'text-green-600' : 'text-gray-500'}`}
          >
            {earned && <Icons.CheckCircle className="w-4 h-4 inline mr-2" />}
            {req.type === 'quiz' ? 'Score ' : 'Complete '} 
            {req.threshold}% on {req.moduleId.replace('_', ' ')}
          </div>
        ))}
      </div>
    </div>
  );
}