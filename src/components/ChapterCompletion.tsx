import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { BadgeDisplay } from './BadgeDisplay';
import { Chapter } from '../types';
import { Award, ArrowRight } from 'lucide-react';

interface ChapterCompletionProps {
  chapter: Chapter;
  onContinue: () => void;
}

export function ChapterCompletion({ chapter, onContinue }: ChapterCompletionProps) {
  const { progress, earnedBadges } = useProgress();
  const chapterBadges = chapter.badges.filter(badge => 
    progress.earnedBadges.includes(badge.id)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
        <div className="text-center mb-8">
          <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Chapter Complete!
          </h2>
          <p className="text-gray-600">
            Congratulations on completing {chapter.title}
          </p>
        </div>

        {chapterBadges.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Badges Earned:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapterBadges.map(badge => (
                <BadgeDisplay
                  key={badge.id}
                  badge={badge}
                  earned={true}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={onContinue}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}