import { Chapter } from '../types';
import { badges } from './badges';

export const chapters: Chapter[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    description: 'Overview of cryptocurrency investigations and this handbook',
    icon: 'BookOpen',
    badges: [badges.find(b => b.id === 'crypto_basics')!]
  },
  {
    id: 'crypto-basics',
    title: 'Understanding Cryptocurrency & Blockchain',
    description: 'Fundamentals of blockchain technology and digital assets',
    icon: 'Binary',
    badges: [badges.find(b => b.id === 'blockchain_expert')!]
  },
  {
    id: 'criminal-activity',
    title: 'Recognizing Cryptocurrency in Criminal Activity',
    description: 'Identifying and tracking illicit cryptocurrency usage',
    icon: 'Search',
    badges: [badges.find(b => b.id === 'pattern_hunter')!]
  },
  {
    id: 'crime-scene',
    title: 'Crime Scene Handling',
    description: 'Proper procedures for securing and processing digital evidence',
    icon: 'Scan',
    badges: [badges.find(b => b.id === 'digital_detective')!]
  },
  {
    id: 'asset-recovery',
    title: 'Digital Asset Recovery',
    description: 'Techniques and tools for cryptocurrency asset recovery',
    icon: 'Wallet',
    badges: [badges.find(b => b.id === 'asset_tracker')!]
  },
  {
    id: 'international',
    title: 'International Cooperation',
    description: 'Working with global agencies on cross-border investigations',
    icon: 'Globe',
    badges: [badges.find(b => b.id === 'global_investigator')!]
  },
  {
    id: 'financial-collaboration',
    title: 'Financial Institution Collaboration',
    description: 'Working with banks and blockchain service providers',
    icon: 'Building',
    badges: [badges.find(b => b.id === 'financial_expert')!]
  },
  {
    id: 'specialized-units',
    title: 'Specialized Crypto Crime Units',
    description: 'Setting up and managing dedicated cryptocurrency investigation teams',
    icon: 'Users',
    badges: [badges.find(b => b.id === 'unit_commander')!]
  },
  {
    id: 'legal',
    title: 'Legal Framework',
    description: 'Legal considerations and prosecution strategies',
    icon: 'Scale',
    badges: [badges.find(b => b.id === 'legal_expert')!]
  },
  {
    id: 'future-trends',
    title: 'Future Trends',
    description: 'Emerging threats and law enforcement response',
    icon: 'Brain',
    badges: [badges.find(b => b.id === 'future_ready')!]
  }
];