/**
 * Types for cryptocurrency crime investigation and case management
 */

import { DigitalEvidence } from './evidence';
import { Transaction } from './blockchain';

/**
 * Represents a cryptocurrency crime investigation case
 */
export interface Case {
  /** Unique case identifier */
  id: string;
  /** Case title/name */
  title: string;
  /** Detailed case description */
  description: string;
  /** Type of cryptocurrency crime */
  type: 'ransomware' | 'nft_scam' | 'exchange_hack' | 'dark_market' | 'money_laundering';
  /** Current case status */
  status: 'open' | 'in_progress' | 'closed';
  /** Priority level */
  priority: 'high' | 'medium' | 'low';
  /** ISO timestamp of case creation */
  openedDate: string;
  /** ISO timestamp of last update */
  lastUpdated: string;
  /** Lead investigator */
  leadInvestigator: string;
  /** Assigned team members */
  assignedTeam: string[];
  /** Evidence collected */
  evidence: {
    /** Digital evidence items */
    digital: DigitalEvidence[];
    /** Blockchain transactions */
    blockchain: Transaction[];
    /** Additional evidence types */
    additional: string[];
  };
  /** Investigation timeline */
  timeline: Array<{
    /** ISO timestamp of event */
    timestamp: string;
    /** Event type */
    type: 'evidence_collected' | 'interview' | 'analysis' | 'legal_action';
    /** Event description */
    description: string;
    /** Personnel involved */
    personnel: string[];
    /** Related evidence IDs */
    relatedEvidence?: string[];
  }>;
  /** Legal documentation */
  legalDocuments: Array<{
    /** Document type */
    type: 'warrant' | 'subpoena' | 'court_order' | 'mlat_request';
    /** Document identifier */
    id: string;
    /** Issue date */
    issueDate: string;
    /** Expiration date if applicable */
    expirationDate?: string;
    /** Jurisdiction */
    jurisdiction: string;
    /** Document status */
    status: 'pending' | 'active' | 'expired' | 'executed';
  }>;
  /** Investigation notes */
  notes: Array<{
    /** ISO timestamp */
    timestamp: string;
    /** Author */
    author: string;
    /** Note content */
    content: string;
    /** Tags/categories */
    tags: string[];
  }>;
}

/**
 * Represents an international legal assistance request
 */
export interface InternationalRequest {
  /** Request identifier */
  id: string;
  /** Request type */
  type: 'mlat' | 'direct' | 'interpol';
  /** Target country */
  country: string;
  /** Request requirements */
  requirements: string[];
  /** Expected timeframe */
  timeframe: string;
  /** Historical success rate */
  success_rate: number;
  /** Jurisdiction information */
  jurisdictionInfo?: {
    /** Relevant agencies */
    agencies: string[];
    /** Applicable treaties */
    treaties: string[];
    /** Specific requirements */
    requirements: string[];
    /** Estimated processing time */
    timeEstimate: string;
    /** Required documentation */
    requiredDocs: string[];
    /** Legal restrictions */
    restrictions: string[];
  };
  /** Request status tracking */
  status: {
    /** Current state */
    current: 'draft' | 'submitted' | 'in_review' | 'approved' | 'denied' | 'completed';
    /** Status history */
    history: Array<{
      /** Status state */
      state: string;
      /** ISO timestamp */
      timestamp: string;
      /** Status notes */
      notes: string;
    }>;
    /** Expected completion date */
    expectedCompletion?: string;
  };
}

/**
 * Represents a forensic analysis report
 */
export interface ForensicReport {
  /** Report identifier */
  id: string;
  /** Related case ID */
  caseId: string;
  /** Report type */
  type: 'blockchain' | 'device' | 'wallet' | 'network';
  /** Key findings */
  findings: string[];
  /** Analyzed evidence */
  evidence: {
    /** Digital evidence */
    digital: DigitalEvidence[];
    /** Blockchain data */
    blockchain: Transaction[];
    /** Additional items */
    additional: string[];
  };
  /** Analysis methodology */
  methodology: {
    /** Tools used */
    tools: string[];
    /** Procedures followed */
    procedures: string[];
    /** Standards compliance */
    standards: string[];
  };
  /** Technical recommendations */
  recommendations: string[];
  /** Investigation timeline */
  timeline: Array<{
    /** ISO timestamp */
    date: string;
    /** Event description */
    event: string;
    /** Event details */
    details: string;
    /** Technical notes */
    technicalNotes?: string[];
  }>;
  /** Report metadata */
  metadata: {
    /** Report author */
    author: string;
    /** Creation date */
    created: string;
    /** Last modified date */
    modified: string;
    /** Review status */
    reviewed: boolean;
    /** Reviewer */
    reviewer?: string;
  };
}

/**
 * Represents a cryptocurrency seizure order
 */
export interface SeizureOrder {
  /** Order identifier */
  id: string;
  /** Related case ID */
  caseId: string;
  /** Order type */
  type: 'temporary' | 'permanent';
  /** Target assets */
  assets: Array<{
    /** Asset type */
    type: 'cryptocurrency' | 'wallet' | 'exchange_account';
    /** Asset identifier */
    identifier: string;
    /** Estimated value */
    estimatedValue: string;
    /** Seizure status */
    status: 'pending' | 'seized' | 'secured' | 'transferred';
  }>;
  /** Legal authority */
  authority: {
    /** Issuing court */
    court: string;
    /** Case number */
    caseNumber: string;
    /** Issue date */
    issueDate: string;
    /** Expiration date */
    expirationDate?: string;
  };
  /** Execution status */
  execution: {
    /** Current status */
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    /** Execution date */
    date?: string;
    /** Executing agency */
    agency: string;
    /** Execution notes */
    notes: string[];
  };
}