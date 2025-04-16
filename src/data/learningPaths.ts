import { LearningPath } from '../types';
import { chapters } from './chapters';

export const learningPaths: LearningPath[] = [
  {
    id: 'investigator',
    name: 'Cryptocurrency Crime Investigator',
    description: 'Master the fundamentals of cryptocurrency investigation from evidence collection to prosecution',
    chapters: [
      'introduction',
      'crypto-basics',
      'criminal-activity',
      'crime-scene',
      'asset-recovery'
    ],
    targetTime: 40,
    difficulty: 'beginner',
    skills: [
      'Blockchain Analysis',
      'Digital Evidence Collection',
      'Transaction Tracing',
      'Asset Recovery'
    ],
    certificate: 'crypto_investigator'
  },
  {
    id: 'specialist',
    name: 'Advanced Investigation Specialist',
    description: 'Advanced techniques for complex cryptocurrency investigations and international cases',
    chapters: [
      'international',
      'financial-collaboration',
      'specialized-units',
      'legal',
      'future-trends'
    ],
    targetTime: 60,
    difficulty: 'advanced',
    skills: [
      'International Cooperation',
      'Financial Intelligence',
      'Team Leadership',
      'Legal Framework'
    ],
    certificate: 'advanced_investigator'
  }
];