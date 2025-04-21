import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { Badge } from '../types';
import { Award, CheckCircle, ArrowRight } from 'lucide-react';

interface BadgeProgressProps {
  badge: Badge;
  showDetails?: boolean;
}

export function BadgeProgress({ badge, showDetails = false }: BadgeProgressProps) {
  const { progress, checkBadgeEligibility } = useProgress();
  
  const isEarned = progress.earnedBadges.includes(badge.id);
  
  // Calculate progress percentage
  const calculateProgress = () => {
    const metRequirements = badge.requirements.filter(req => {
      const score = req.type === 'quiz' 
        ? progress.quizScores[req.moduleId]
        : progress.simulationScores[req.moduleId];
      return score >= req.threshold;
    }).length;
    
    return Math.round((metRequirements / badge.requirements.length) * 100);
  };
  
  const progressPercentage = isEarned ? 100 : calculateProgress();
  
  return (
    <div className={`p-4 rounded-lg border ${
      isEarned 
        ? badge.tier === 'gold'
          ? 'bg-yellow-50 border-yellow-200'
          : badge.tier === 'silver'
            ? 'bg-gray-50 border-gray-200'
            : 'bg-orange-50 border-orange-200'
        : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isEarned
              ? badge.tier === 'gold'
                ? 'bg-yellow-100'
                : badge.tier === 'silver'
                  ? 'bg-gray-100'
                  : 'bg-orange-100'
              : 'bg-gray-100'
          }`}>
            <Award className={`w-5 h-5 ${
              isEarned
                ? badge.tier === 'gold'
                  ? 'text-yellow-600'
                  : badge.tier === 'silver'
                    ? 'text-gray-600'
                    : 'text-orange-600'
                : 'text-gray-400'
            }`} />
          </div>
          <h3 className="font-medium text-gray-900">{badge.name}</h3>
        </div>
        {isEarned && (
          <CheckCircle className="w-5 h-5 text-green-600" />
        )}
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
      
      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-medium text-gray-700">Progress</span>
          <span className="text-gray-600">{progressPercentage}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${
              isEarned 
                ? 'bg-green-500' 
                : 'bg-blue-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Requirements:</h4>
          {badge.requirements.map((req, index) => {
            const score = req.type === 'quiz' 
              ? progress.quizScores[req.moduleId]
              : progress.simulationScores[req.moduleId];
            const isMet = score >= req.threshold;
            
            return (
              <div key={index} className="flex items-start gap-2">
                {isMet ? (
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="text-sm">
                  <span className={isMet ? 'text-green-700' : 'text-gray-600'}>
                    {req.type === 'quiz' ? 'Score ' : 'Complete '} 
                    {req.threshold}% on {req.moduleId.replace(/_/g, ' ')}
                  </span>
                  {score !== undefined && !isMet && (
                    <span className="text-gray-500 ml-1">
                      (Current: {score}%)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}