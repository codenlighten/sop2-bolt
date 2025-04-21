import React, { useEffect, useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../types';
import { Award, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { trackBadgeProgress } from '../utils/progressApi';

interface BadgeTrackerProps {
  badge: Badge;
}

export function BadgeTracker({ badge }: BadgeTrackerProps) {
  const { progress } = useProgress();
  const { user } = useAuth();
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(false);
  
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
  
  // Sync badge progress with server
  useEffect(() => {
    const syncBadgeProgress = async () => {
      if (user?.email && badge.id) {
        setSyncing(true);
        setSyncError(false);
        
        try {
          await trackBadgeProgress(user.email, badge.id, progressPercentage);
        } catch (error) {
          console.error(`Error syncing badge progress for ${badge.id}:`, error);
          setSyncError(true);
        } finally {
          setSyncing(false);
        }
      }
    };
    
    syncBadgeProgress();
  }, [user, badge.id, progressPercentage]);
  
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
        
        {isEarned ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : syncing ? (
          <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
        ) : syncError ? (
          <AlertTriangle className="w-5 h-5 text-amber-500" />
        ) : null}
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
      
      {syncError && (
        <div className="mt-2 text-xs text-amber-600">
          Error syncing progress. Your progress is saved locally.
        </div>
      )}
    </div>
  );
}