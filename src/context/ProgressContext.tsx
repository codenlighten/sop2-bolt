import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Badge, Certificate } from '../types';
import { badges } from '../data/badges';
import { certificates } from '../data/certificates';
import { chapters } from '../data/chapters';
import { loadAllProgress, syncProgress, cleanupLocalStorage, requestCertificate, trackBadgeProgress } from '../utils/progressApi';
import { useAuth } from './AuthContext';

interface ProgressContextType {
  progress: User['progress'];
  updateQuizScore: (moduleId: string, score: number) => void;
  updateSimulationScore: (moduleId: string, score: number) => void;
  completeChapter: (chapterId: string) => void;
  completeExercise: (exerciseId: string) => void;
  checkBadgeEligibility: (badgeId: string) => boolean;
  checkCertificateEligibility: (certificateId: string) => boolean;
  earnedBadges: Badge[];
  earnedCertificates: Certificate[];
  isCourseCompleted: boolean;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const initialProgress: User['progress'] = {
  completedChapters: [],
  earnedBadges: [],
  quizScores: {},
  simulationScores: {},
  timeSpent: {},
  completedExercises: [],
  failedAttempts: {},
  lastAccessed: ''
};

const loadProgress = (): User['progress'] => {
  const saved = localStorage.getItem('userProgress');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load progress:', e);
      return initialProgress;
    }
  }
  return initialProgress;
};

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<User['progress']>(loadProgress);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const { user } = useAuth();

  // Clean up any undefined module IDs on mount
  useEffect(() => {
    cleanupLocalStorage();
    const localProgress = loadProgress();
    
    // Remove any undefined keys from quizScores
    if (localProgress.quizScores && 'undefined' in localProgress.quizScores) {
      const { ['undefined']: _, ...cleanQuizScores } = localProgress.quizScores;
      localProgress.quizScores = cleanQuizScores;
      localStorage.setItem('userProgress', JSON.stringify(localProgress));
    }
    
    setProgress(localProgress);
  }, []);

  // Load progress from server when user is available
  useEffect(() => {
    const loadUserProgress = async () => {
      if (user?.email) {
        try {
          const serverProgress = await loadAllProgress(user.email);
          if (serverProgress) {
            // Merge server progress with local progress
            const mergedProgress = {
              ...progress,
              ...serverProgress,
              // Merge nested objects
              quizScores: { ...progress.quizScores, ...serverProgress.quizScores },
              simulationScores: { ...progress.simulationScores, ...serverProgress.simulationScores },
              timeSpent: { ...progress.timeSpent, ...serverProgress.timeSpent }
            };
            
            // Remove any undefined keys
            if ('undefined' in mergedProgress.quizScores) {
              delete mergedProgress.quizScores['undefined'];
            }
            
            setProgress(mergedProgress);
            localStorage.setItem('userProgress', JSON.stringify(mergedProgress));
          }
        } catch (error) {
          console.error('Failed to load progress from server:', error);
        }
      }
    };

    loadUserProgress();
  }, [user]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    // Remove any undefined keys
    const cleanProgress = { ...progress };
    if (cleanProgress.quizScores && 'undefined' in cleanProgress.quizScores) {
      const { ['undefined']: _, ...cleanQuizScores } = cleanProgress.quizScores;
      cleanProgress.quizScores = cleanQuizScores;
    }
    
    localStorage.setItem('userProgress', JSON.stringify(cleanProgress));
    
    // Sync with server if user is logged in
    if (user?.email) {
      syncProgress(user.email, cleanProgress).catch(error => {
        console.error('Failed to sync progress with server:', error);
      });
    }
  }, [progress, user]);

  const updateQuizScore = (moduleId: string, score: number) => {
    if (!moduleId || moduleId === 'undefined') {
      console.error('Invalid moduleId provided to updateQuizScore:', moduleId);
      return;
    }
    
    setProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [moduleId]: Math.max(score, prev.quizScores[moduleId] || 0)
      }
    }));
  };

  const updateSimulationScore = (moduleId: string, score: number) => {
    if (!moduleId || moduleId === 'undefined') {
      console.error('Invalid moduleId provided to updateSimulationScore:', moduleId);
      return;
    }
    
    setProgress(prev => ({
      ...prev,
      simulationScores: {
        ...prev.simulationScores,
        [moduleId]: Math.max(score, prev.simulationScores[moduleId] || 0)
      }
    }));
  };

  const completeChapter = (chapterId: string) => {
    if (!chapterId || chapterId === 'undefined') {
      console.error('Invalid chapterId provided to completeChapter:', chapterId);
      return;
    }
    
    setProgress(prev => {
      if (prev.completedChapters.includes(chapterId)) {
        return prev;
      }

      // Update time spent
      const timeSpent = {
        ...prev.timeSpent,
        [chapterId]: (prev.timeSpent[chapterId] || 0) + 60 // Add 60 minutes for completion
      };

      return {
        ...prev,
        completedChapters: [...prev.completedChapters, chapterId],
        timeSpent
      };
    });
  };

  const completeExercise = (exerciseId: string) => {
    if (!exerciseId || exerciseId === 'undefined') {
      console.error('Invalid exerciseId provided to completeExercise:', exerciseId);
      return;
    }

    setProgress(prev => {
      if (prev.completedExercises.includes(exerciseId)) {
        return prev;
      }
      return {
        ...prev,
        completedExercises: [...prev.completedExercises, exerciseId],
      };
    });
  };

  const checkBadgeEligibility = (badgeId: string) => {
    const badge = badges.find(b => b.id === badgeId);
    if (!badge) return false;

    return badge.requirements.every(req => {
      if (req.type === 'quiz') {
        const score = progress.quizScores[req.moduleId];
        return score >= req.threshold;
      } else if (req.type === 'simulation') {
        const score = progress.simulationScores[req.moduleId];
        return score >= req.threshold;
      } else if (req.type === 'exercise') {
        // For exercises, we check if the moduleId is in completedExercises
        // The 'threshold' for exercises in badges.ts currently implies a score,
        // but UserProgress.completedExercises is just an array of strings (IDs).
        // This implementation assumes completion is sufficient for the badge.
        return progress.completedExercises.includes(req.moduleId);
      }
      return false; // Should not happen if badge types are constrained
    });
  };

  const checkCertificateEligibility = (certificateId: string) => {
    const certificate = certificates.find(c => c.id === certificateId);
    if (!certificate) return false;

    // Check minimum number of badges
    if (progress.earnedBadges.length < certificate.requirements.minBadges) {
      return false;
    }

    // Check required badges
    const hasRequiredBadges = certificate.requirements.requiredBadges.every(
      badgeId => progress.earnedBadges.includes(badgeId)
    );
    if (!hasRequiredBadges) return false;

    // Calculate average score
    const scores = [
      ...Object.values(progress.quizScores),
      ...Object.values(progress.simulationScores)
    ];
    if (scores.length === 0) return false;

    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    return averageScore >= certificate.requirements.minTotalScore;
  };

  // Auto-award badges
  useEffect(() => {
    const newlyEarnedThisCycle: string[] = [];

    badges.forEach(badge => {
      // If already in progress.earnedBadges, skip (it's not "newly" earned in this cycle)
      if (progress.earnedBadges.includes(badge.id)) {
        return;
      }

      // Check eligibility using the correctly updated checkBadgeEligibility function
      if (checkBadgeEligibility(badge.id)) {
        newlyEarnedThisCycle.push(badge.id);
        if (user?.email) {
          // If eligible AND user is logged in, track completion on server
          trackBadgeProgress(user.email, badge.id, 100)
            .catch(err => console.error(`Failed to track badge ${badge.id} progress on server:`, err));
        }
      }
    });

    // If there are any badges newly earned in this cycle, update the state
    if (newlyEarnedThisCycle.length > 0) {
      setProgress(prev => {
        // Add the newly earned badges to the existing set of earned badges
        const updatedEarnedBadges = Array.from(new Set([...prev.earnedBadges, ...newlyEarnedThisCycle]));
        // Only update if there's an actual change to avoid unnecessary re-renders
        if (updatedEarnedBadges.length > prev.earnedBadges.length) {
          return { ...prev, earnedBadges: updatedEarnedBadges };
        }
        return prev;
      });
    }
  }, [
    // Dependencies: checkBadgeEligibility itself, and all parts of 'progress' it reads,
    // plus 'progress.earnedBadges' for the initial check, and 'user' for API calls.
    checkBadgeEligibility, // The function from the provider scope
    progress.quizScores,
    progress.simulationScores,
    progress.completedExercises,
    progress.earnedBadges, 
    user
    // 'badges' is a top-level import, so it's stable and not needed in deps.
  ]);

  // Check for course completion
  useEffect(() => {
    const allChaptersCompleted = chapters.every(chapter => 
      progress.completedChapters.includes(chapter.id)
    );

    const allBadgesEarned = badges.every(badge =>
      progress.earnedBadges.includes(badge.id)
    );

    const allQuizzesCompleted = chapters.every(chapter =>
      progress.quizScores[chapter.id] !== undefined
    );

    const allSimulationsCompleted = chapters.every(chapter =>
      progress.simulationScores[chapter.id] !== undefined
    );

    const isComplete = allChaptersCompleted && 
                      allBadgesEarned && 
                      allQuizzesCompleted && 
                      allSimulationsCompleted;

    setIsCourseCompleted(isComplete);
    
    // If course is completed and user is logged in, request certificate
    if (isComplete && user?.email) {
      requestCertificate(user.email).catch(error => {
        console.error('Failed to request certificate:', error);
      });
    }
  }, [progress, user]);

  const earnedBadges = badges.filter(badge => progress.earnedBadges.includes(badge.id));
  const earnedCertificates = certificates.filter(cert => checkCertificateEligibility(cert.id));

  const resetProgress = () => {
    setProgress(initialProgress);
    setIsCourseCompleted(false);
    localStorage.removeItem('userProgress');
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      updateQuizScore,
      updateSimulationScore,
      completeChapter,
      completeExercise,
      checkBadgeEligibility,
      checkCertificateEligibility,
      earnedBadges,
      earnedCertificates,
      isCourseCompleted,
      resetProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}