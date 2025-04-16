import React from 'react';
import { Trophy, Star, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { milestones } from '../data/milestones';
import { MilestoneTracker } from './MilestoneTracker';

export function MilestoneDashboard() {
  const { progress } = useProgress();

  const calculateOverallProgress = () => {
    const totalMilestones = milestones.length;
    const completedMilestones = milestones.filter(milestone => {
      // Check chapters
      if (milestone.requirements.chapters) {
        const completedChapters = milestone.requirements.chapters.every(
          id => progress.completedChapters.includes(id)
        );
        if (!completedChapters) return false;
      }

      // Check badges
      if (milestone.requirements.badges) {
        const earnedBadges = milestone.requirements.badges.every(
          id => progress.earnedBadges.includes(id)
        );
        if (!earnedBadges) return false;
      }

      // Check score
      if (milestone.requirements.minScore) {
        const scores = Object.values(progress.quizScores);
        if (scores.length === 0) return false;
        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        if (avgScore < milestone.requirements.minScore) return false;
      }

      return true;
    }).length;

    return Math.round((completedMilestones / totalMilestones) * 100);
  };

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Milestone Progress</h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-900">Overall Progress</span>
              <span className="text-gray-600">{calculateOverallProgress()}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${calculateOverallProgress()}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-6">
        {milestones.map(milestone => (
          <MilestoneTracker key={milestone.id} milestone={milestone} />
        ))}
      </div>

      {/* Educational Tips */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-3">
          <Trophy className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Milestone Tips:</h4>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                <span className="text-blue-800">
                  Complete chapters in order for the best learning experience
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                <span className="text-blue-800">
                  Focus on mastering each skill before moving to advanced topics
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                <span className="text-blue-800">
                  Earn badges to unlock special features and certificates
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}