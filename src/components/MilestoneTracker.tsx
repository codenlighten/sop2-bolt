import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { Trophy, Star, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { Milestone } from '../types';

interface MilestoneTrackerProps {
  milestone: Milestone;
}

export function MilestoneTracker({ milestone }: MilestoneTrackerProps) {
  const { progress } = useProgress();

  const checkMilestoneCompletion = () => {
    // Check chapters
    if (milestone.requirements.chapters) {
      const completedRequired = milestone.requirements.chapters.every(
        id => progress.completedChapters.includes(id)
      );
      if (!completedRequired) return false;
    }

    // Check badges
    if (milestone.requirements.badges) {
      const earnedRequired = milestone.requirements.badges.every(
        id => progress.earnedBadges.includes(id)
      );
      if (!earnedRequired) return false;
    }

    // Check minimum score
    if (milestone.requirements.minScore) {
      const scores = Object.values(progress.quizScores);
      if (scores.length === 0) return false;
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      if (avgScore < milestone.requirements.minScore) return false;
    }

    // Check exercises
    if (milestone.requirements.exercises) {
      const completedRequired = milestone.requirements.exercises.every(
        id => progress.completedExercises.includes(id)
      );
      if (!completedRequired) return false;
    }

    return true;
  };

  const isCompleted = checkMilestoneCompletion();

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${
      isCompleted ? 'border-green-200' : 'border-gray-200'
    } p-6`}>
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isCompleted ? 'bg-green-100' : 'bg-gray-100'
        }`}>
          <Trophy className={`w-7 h-7 ${
            isCompleted ? 'text-green-600' : 'text-gray-600'
          }`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
          <p className="text-gray-600">{milestone.description}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Requirements */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Requirements:</h4>
          <div className="space-y-3">
            {milestone.requirements.chapters && (
              <div className="flex items-start gap-2">
                <Book className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">Chapters</div>
                  <div className="text-gray-600">
                    Complete {milestone.requirements.chapters.length} specific chapters
                  </div>
                </div>
              </div>
            )}
            {milestone.requirements.badges && (
              <div className="flex items-start gap-2">
                <Award className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">Badges</div>
                  <div className="text-gray-600">
                    Earn {milestone.requirements.badges.length} specific badges
                  </div>
                </div>
              </div>
            )}
            {milestone.requirements.minScore && (
              <div className="flex items-start gap-2">
                <Star className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">Minimum Score</div>
                  <div className="text-gray-600">
                    Achieve {milestone.requirements.minScore}% average score
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rewards */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Rewards:</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <span className="text-gray-900">{milestone.rewards.points} Points</span>
            </div>
            {milestone.rewards.badges && (
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-gray-900">
                  {milestone.rewards.badges.length} New Badge{milestone.rewards.badges.length > 1 ? 's' : ''}
                </span>
              </div>
            )}
            {milestone.rewards.certificate && (
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-blue-600" />
                <span className="text-gray-900">Special Certificate</span>
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        {isCompleted ? (
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">Milestone Completed!</span>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Keep going!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}