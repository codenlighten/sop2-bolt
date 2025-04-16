import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Badge, Certificate } from '../types';
import { badges } from '../data/badges';
import { certificates } from '../data/certificates';
import { chapters } from '../data/chapters';

interface ProgressContextType {
  progress: User['progress'];
  updateQuizScore: (moduleId: string, score: number) => void;
  updateSimulationScore: (moduleId: string, score: number) => void;
  completeChapter: (chapterId: string) => void;
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
  failedAttempts: {}
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

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }, [progress]);

  const updateQuizScore = (moduleId: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [moduleId]: Math.max(score, prev.quizScores[moduleId] || 0)
      }
    }));
  };

  const updateSimulationScore = (moduleId: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      simulationScores: {
        ...prev.simulationScores,
        [moduleId]: Math.max(score, prev.simulationScores[moduleId] || 0)
      }
    }));
  };

  const completeChapter = (chapterId: string) => {
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

  const checkBadgeEligibility = (badgeId: string) => {
    const badge = badges.find(b => b.id === badgeId);
    if (!badge) return false;

    return badge.requirements.every(req => {
      const score = req.type === 'quiz' 
        ? progress.quizScores[req.moduleId]
        : progress.simulationScores[req.moduleId];
      return score >= req.threshold;
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

  // Check for new badges after scores update or chapter completion
  useEffect(() => {
    badges.forEach(badge => {
      if (!progress.earnedBadges.includes(badge.id) && checkBadgeEligibility(badge.id)) {
        setProgress(prev => ({
          ...prev,
          earnedBadges: [...prev.earnedBadges, badge.id]
        }));
      }
    });
  }, [progress.quizScores, progress.simulationScores, progress.completedChapters]);

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
  }, [progress]);

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