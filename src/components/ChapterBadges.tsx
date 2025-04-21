import React from 'react';
import { Chapter } from '../types';
import { BadgeProgress } from './BadgeProgress';
import { Award } from 'lucide-react';

interface ChapterBadgesProps {
  chapter: Chapter;
}

export function ChapterBadges({ chapter }: ChapterBadgesProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Badges for this Chapter
        </h3>
      </div>
      
      <div className="space-y-4">
        {chapter.badges.map(badge => (
          <BadgeProgress key={badge.id} badge={badge} showDetails={true} />
        ))}
      </div>
    </div>
  );
}