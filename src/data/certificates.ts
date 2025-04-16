import { Certificate } from '../types';

export const certificates: Certificate[] = [
  {
    id: 'crypto_investigator',
    title: 'Certified Cryptocurrency Crime Investigator',
    description: 'Awarded to law enforcement officers who have demonstrated comprehensive expertise in cryptocurrency crime investigation',
    requirements: {
      minBadges: 8,
      requiredBadges: ['blockchain_expert', 'pattern_hunter', 'digital_detective', 'asset_tracker'],
      minTotalScore: 85
    }
  },
  {
    id: 'advanced_investigator',
    title: 'Advanced Cryptocurrency Crime Specialist',
    description: 'Recognition of exceptional achievement in all aspects of cryptocurrency crime investigation',
    requirements: {
      minBadges: 10,
      requiredBadges: ['blockchain_expert', 'pattern_hunter', 'digital_detective', 'asset_tracker', 'unit_commander'],
      minTotalScore: 90
    }
  }
];