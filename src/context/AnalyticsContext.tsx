import React, { createContext, useContext, useState, useEffect } from 'react';
import { Analytics } from '../types';

interface AnalyticsContextType {
  startSession: () => void;
  endSession: () => void;
  trackChapterAccess: (chapterId: string) => void;
  trackExerciseCompletion: (exerciseId: string, score: number) => void;
  trackEngagement: (action: string, details?: Record<string, any>) => void;
  getAnalytics: () => Analytics | null;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

const STORAGE_KEY = 'user_analytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [currentSession, setCurrentSession] = useState<Analytics['sessions'][0] | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  // Load analytics from localStorage on mount
  useEffect(() => {
    const savedAnalytics = localStorage.getItem(STORAGE_KEY);
    if (savedAnalytics) {
      setAnalytics(JSON.parse(savedAnalytics));
    }
  }, []);

  // Save analytics to localStorage when updated
  useEffect(() => {
    if (analytics) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(analytics));
    }
  }, [analytics]);

  const startSession = () => {
    const session = {
      start: new Date().toISOString(),
      end: '',
      chapters: [],
      exercises: [],
      points: 0
    };
    setCurrentSession(session);
    setAnalytics(prev => ({
      ...prev!,
      sessions: [...(prev?.sessions || []), session]
    }));
  };

  const endSession = () => {
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        end: new Date().toISOString()
      };
      setAnalytics(prev => ({
        ...prev!,
        sessions: prev!.sessions.map(s => 
          s.start === currentSession.start ? updatedSession : s
        )
      }));
      setCurrentSession(null);
    }
  };

  const trackChapterAccess = (chapterId: string) => {
    if (currentSession) {
      setCurrentSession(prev => ({
        ...prev!,
        chapters: [...prev!.chapters, chapterId]
      }));
      
      // Update analytics
      setAnalytics(prev => {
        if (!prev) return null;
        const progress = {
          ...prev.progress,
          completion: Math.min(
            ((prev.progress.completion || 0) + 10),
            100
          )
        };
        return {
          ...prev,
          progress
        };
      });
    }
  };

  const trackExerciseCompletion = (exerciseId: string, score: number) => {
    if (currentSession) {
      const points = Math.floor(score / 10);
      setCurrentSession(prev => ({
        ...prev!,
        exercises: [...prev!.exercises, exerciseId],
        points: prev!.points + points
      }));

      // Update analytics
      setAnalytics(prev => {
        if (!prev) return null;
        return {
          ...prev,
          progress: {
            ...prev.progress,
            averageScore: (prev.progress.averageScore + score) / 2
          },
          achievements: {
            ...prev.achievements,
            points: prev.achievements.points + points
          }
        };
      });
    }
  };

  const trackEngagement = (action: string, details?: Record<string, any>) => {
    if (currentSession) {
      setAnalytics(prev => {
        if (!prev) return null;
        return {
          ...prev,
          progress: {
            ...prev.progress,
            engagement: Math.min(
              ((prev.progress.engagement || 0) + 1),
              100
            )
          }
        };
      });
    }
  };

  const getAnalytics = () => analytics;

  return (
    <AnalyticsContext.Provider value={{
      startSession,
      endSession,
      trackChapterAccess,
      trackExerciseCompletion,
      trackEngagement,
      getAnalytics
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}