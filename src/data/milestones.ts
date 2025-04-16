import { Milestone } from '../types';

export const milestones: Milestone[] = [
  {
    id: 'beginner_investigator',
    title: 'Beginner Investigator',
    description: 'Complete the initial training modules and earn your first badges',
    requirements: {
      chapters: ['introduction', 'crypto-basics'],
      badges: ['crypto_basics', 'blockchain_expert'],
      minScore: 70
    },
    rewards: {
      points: 100,
      badges: ['quick_learner'],
      features: ['advanced_analytics']
    }
  },
  {
    id: 'field_expert',
    title: 'Field Expert',
    description: 'Master evidence collection and crime scene handling',
    requirements: {
      chapters: ['crime-scene', 'asset-recovery'],
      badges: ['digital_detective', 'asset_tracker'],
      minScore: 80,
      exercises: ['crime_scene_walkthrough', 'evidence_collection']
    },
    rewards: {
      points: 200,
      badges: ['field_master'],
      features: ['case_management']
    }
  },
  {
    id: 'master_investigator',
    title: 'Master Investigator',
    description: 'Complete all advanced modules and demonstrate expertise',
    requirements: {
      chapters: ['specialized-units', 'legal', 'future-trends'],
      badges: ['unit_commander', 'legal_expert', 'future_ready'],
      minScore: 90,
      exercises: ['unit_management', 'legal_simulation']
    },
    rewards: {
      points: 500,
      badges: ['master_badge'],
      certificate: 'advanced_investigator',
      features: ['mentor_access']
    }
  }
];