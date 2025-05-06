/**
 * Core types for the cryptocurrency crime investigation training platform
 */

/**
 * Represents a chapter in the training program
 */
export interface Chapter {
  /** Unique chapter identifier */
  id: string;
  /** Chapter title */
  title: string;
  /** Chapter description */
  description: string;
  /** Icon name from lucide-react */
  icon: string;
  /** Badges that can be earned in this chapter */
  badges: Badge[];
  /** Estimated completion time in minutes */
  estimatedTime: number;
  /** Prerequisites - IDs of chapters that should be completed first */
  prerequisites?: string[];
  /** Learning objectives for this chapter */
  objectives: string[];
  /** Required tools or materials */
  requirements?: string[];
}

/**
 * Represents a user of the training platform
 */
export interface User {
  /** Unique user identifier */
  id: string;
  /** User's name */
  name: string;
  /** User's role */
  role: 'officer' | 'admin' | 'instructor';
  /** Bookmarked content */
  bookmarks: string[];
  /** User notes by content ID */
  notes: Record<string, string>;
  /** User's progress data */
  progress: {
    /** Completed chapter IDs */
    completedChapters: string[];
    /** Earned badge IDs */
    earnedBadges: string[];
    /** Quiz scores by module ID */
    quizScores: Record<string, number>;
    /** Simulation scores by module ID */
    simulationScores: Record<string, number>;
    /** Last accessed timestamp */
    lastAccessed: string;
    /** Current chapter ID */
    currentChapter?: string;
    /** Time spent in minutes by chapter ID */
    timeSpent: Record<string, number>;
    /** Completed exercises by module ID */
    completedExercises: string[];
    /** Failed attempts by module ID */
    failedAttempts: Record<string, number>;
  };
  /** User preferences */
  preferences: {
    /** Dark mode enabled */
    darkMode: boolean;
    /** Email notification settings */
    notifications: {
      /** Progress updates */
      progress: boolean;
      /** New content alerts */
      newContent: boolean;
      /** Certificate achievements */
      certificates: boolean;
    };
    /** Accessibility settings */
    accessibility: {
      /** Font size multiplier */
      fontSize: number;
      /** High contrast mode */
      highContrast: boolean;
      /** Screen reader optimized */
      screenReader: boolean;
    };
  };
}

/**
 * Represents an achievement badge
 */
export interface Badge {
  /** Unique badge identifier */
  id: string;
  /** Badge name */
  name: string;
  /** Badge description */
  description: string;
  /** Icon name from lucide-react */
  icon: string;
  /** Requirements to earn the badge */
  requirements: Array<{
    /** Requirement type */
    type: 'quiz' | 'simulation' | 'exercise';
    /** Required score threshold */
    threshold: number;
    /** Module identifier */
    moduleId: string;
  }>;
  /** Badge tier/level */
  tier: 'bronze' | 'silver' | 'gold';
  /** Points awarded for earning this badge */
  points: number;
  /** Unlock message shown when earned */
  unlockMessage?: string;
  /** Related badges that should be earned first */
  prerequisites?: string[];
}

/**
 * Represents a training certificate
 */
export interface Certificate {
  /** Unique certificate identifier */
  id: string;
  /** Certificate title */
  title: string;
  /** Certificate description */
  description: string;
  /** Date the certificate was issued */
  issueDate?: string;
  /** Requirements to earn the certificate */
  requirements: {
    /** Minimum number of badges needed */
    minBadges: number;
    /** Specific required badge IDs */
    requiredBadges: string[];
    /** Minimum total score needed */
    minTotalScore: number;
    /** Minimum time spent in training (minutes) */
    minTimeSpent?: number;
    /** Required exercises to complete */
    requiredExercises?: string[];
  };
  /** Certificate metadata */
  metadata: {
    /** Issuing authority */
    issuer: string;
    /** Validity period in months */
    validityPeriod: number;
    /** Accreditation details */
    accreditation?: string;
    /** Certificate level/tier */
    level: 'basic' | 'intermediate' | 'advanced' | 'expert';
  };
  /** Certificate template settings */
  template: {
    /** Certificate background color */
    backgroundColor: string;
    /** Text color */
    textColor: string;
    /** Border style */
    borderStyle: string;
    /** Logo URL */
    logoUrl: string;
  };
}

/**
 * Represents a progress milestone
 */
export interface Milestone {
  /** Unique milestone identifier */
  id: string;
  /** Milestone title */
  title: string;
  /** Milestone description */
  description: string;
  /** Requirements to reach the milestone */
  requirements: {
    /** Required chapters */
    chapters?: string[];
    /** Required badges */
    badges?: string[];
    /** Minimum total score */
    minScore?: number;
    /** Required exercises */
    exercises?: string[];
  };
  /** Rewards for reaching the milestone */
  rewards: {
    /** Points awarded */
    points: number;
    /** Badges unlocked */
    badges?: string[];
    /** Certificate unlocked */
    certificate?: string;
    /** Special features unlocked */
    features?: string[];
  };
}

/**
 * Represents a learning path
 */
export interface LearningPath {
  /** Unique path identifier */
  id: string;
  /** Path name */
  name: string;
  /** Path description */
  description: string;
  /** Ordered list of chapter IDs */
  chapters: string[];
  /** Target completion time in hours */
  targetTime: number;
  /** Difficulty level */
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  /** Skills developed */
  skills: string[];
  /** Certificate awarded upon completion */
  certificate?: string;
}

/**
 * Represents user activity analytics
 */
export interface Analytics {
  /** User ID */
  userId: string;
  /** Session data */
  sessions: Array<{
    /** Session start time */
    start: string;
    /** Session end time */
    end: string;
    /** Chapters accessed */
    chapters: string[];
    /** Exercises completed */
    exercises: string[];
    /** Points earned */
    points: number;
  }>;
  /** Progress metrics */
  progress: {
    /** Completion percentage */
    completion: number;
    /** Average quiz score */
    averageScore: number;
    /** Total time spent */
    totalTime: number;
    /** Engagement score */
    engagement: number;
  };
  /** Achievement data */
  achievements: {
    /** Badges earned with dates */
    badges: Record<string, string>;
    /** Certificates earned with dates */
    certificates: Record<string, string>;
    /** Total points */
    points: number;
    /** Current rank/level */
    rank: string;
  };
}