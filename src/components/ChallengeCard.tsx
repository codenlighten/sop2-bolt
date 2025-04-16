import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ChallengeCardProps {
  number: number;
  title: string;
  description: React.ReactNode;
  icon: LucideIcon;
}

export function ChallengeCard({ number, title, description, icon: Icon }: ChallengeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Challenge #{number}: {title}
          </h3>
          <div className="text-gray-600 space-y-2">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}