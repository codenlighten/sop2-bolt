import { Badge } from '../types';

export const badges: Badge[] = [
  // Chapter 1: Introduction
  {
    id: 'crypto_basics',
    name: 'Crypto Foundations',
    description: 'Mastered the fundamentals of cryptocurrency and blockchain technology',
    icon: 'Binary',
    requirements: [
      { type: 'quiz', threshold: 80, moduleId: 'introduction' }
    ],
    tier: 'bronze',
    points: 10
  },
  
  // Chapter 2: Blockchain Fundamentals
  {
    id: 'blockchain_expert',
    name: 'Blockchain Expert',
    description: 'Demonstrated advanced understanding of blockchain analysis',
    icon: 'Database',
    requirements: [
      { type: 'quiz', threshold: 90, moduleId: 'blockchain_fundamentals' },
      { type: 'simulation', threshold: 85, moduleId: 'blockchain_puzzle' }
    ],
    tier: 'silver',
    points: 25
  },

  // Chapter 3: Criminal Activity
  {
    id: 'pattern_hunter',
    name: 'Pattern Hunter',
    description: 'Excellence in identifying suspicious transaction patterns',
    icon: 'Search',
    requirements: [
      { type: 'simulation', threshold: 90, moduleId: 'transaction_pattern' },
      { type: 'exercise', threshold: 85, moduleId: 'suspicious_transaction' },
      { type: 'quiz', threshold: 80, moduleId: 'criminal_activity' }
    ],
    tier: 'gold',
    points: 50
  },

  // Chapter 4: Crime Scene
  {
    id: 'digital_detective',
    name: 'Digital Detective',
    description: 'Expert in digital evidence collection and handling',
    icon: 'Scan',
    requirements: [
      { type: 'simulation', threshold: 85, moduleId: 'crime_scene' },
      { type: 'exercise', threshold: 90, moduleId: 'evidence_analyzer' }
    ],
    tier: 'silver',
    points: 25
  },

  // Chapter 5: Asset Recovery
  {
    id: 'asset_tracker',
    name: 'Asset Recovery Specialist',
    description: 'Successfully traced and recovered digital assets',
    icon: 'Wallet',
    requirements: [
      { type: 'simulation', threshold: 90, moduleId: 'forensic_tracer' },
      { type: 'exercise', threshold: 85, moduleId: 'money_flow' }
    ],
    tier: 'gold',
    points: 50
  },

  // Chapter 6: International Cooperation
  {
    id: 'global_investigator',
    name: 'Global Investigator',
    description: 'Mastered international investigation procedures',
    icon: 'Globe',
    requirements: [
      { type: 'simulation', threshold: 85, moduleId: 'international_request' },
      { type: 'quiz', threshold: 90, moduleId: 'international' }
    ],
    tier: 'silver',
    points: 25
  },

  // Chapter 7: Financial Collaboration
  {
    id: 'financial_expert',
    name: 'Financial Intelligence Expert',
    description: 'Expert in financial institution collaboration',
    icon: 'Building',
    requirements: [
      { type: 'simulation', threshold: 90, moduleId: 'sar_filing' },
      { type: 'exercise', threshold: 85, moduleId: 'banking_ai' }
    ],
    tier: 'gold',
    points: 50
  },

  // Chapter 8: Specialized Units
  {
    id: 'unit_commander',
    name: 'Crypto Unit Commander',
    description: 'Successfully built and managed a crypto crime unit',
    icon: 'Users',
    requirements: [
      { type: 'simulation', threshold: 90, moduleId: 'crypto_unit' },
      { type: 'exercise', threshold: 85, moduleId: 'tool_selection' }
    ],
    tier: 'gold',
    points: 50
  },

  // Chapter 9: Legal Framework
  {
    id: 'legal_expert',
    name: 'Legal Framework Expert',
    description: 'Mastered legal procedures for crypto crime prosecution',
    icon: 'Scale',
    requirements: [
      { type: 'simulation', threshold: 85, moduleId: 'courtroom' },
      { type: 'quiz', threshold: 90, moduleId: 'legal' }
    ],
    tier: 'silver',
    points: 25
  },

  // Chapter 10: Future Trends
  {
    id: 'future_ready',
    name: 'Future-Ready Investigator',
    description: 'Prepared for emerging crypto crime challenges',
    icon: 'Brain',
    requirements: [
      { type: 'simulation', threshold: 90, moduleId: 'emerging_threats' },
      { type: 'quiz', threshold: 85, moduleId: 'future_trends' }
    ],
    tier: 'gold',
    points: 50
  }
];