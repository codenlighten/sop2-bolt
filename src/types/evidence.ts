/**
 * Types for digital evidence handling in cryptocurrency investigations
 */

/**
 * Represents a piece of digital evidence related to cryptocurrency
 */
export interface DigitalEvidence {
  /** Unique identifier for the evidence */
  id: string;
  /** Type of digital evidence */
  type: 'hardware_wallet' | 'mobile_device' | 'computer' | 'paper_wallet' | 'seed_phrase';
  /** Human-readable name/description */
  name: string;
  /** Detailed description of the evidence */
  description: string;
  /** Location where evidence was found */
  location: string;
  /** ISO timestamp when evidence was collected */
  collectionTimestamp: string;
  /** Officer who collected the evidence */
  collectedBy: string;
  /** Current status of the evidence */
  status: 'collected' | 'processing' | 'analyzed' | 'stored';
  /** Step-by-step handling instructions */
  handlingInstructions: string[];
  /** Technical specifications and details */
  technicalDetails: {
    /** Device make/model if applicable */
    deviceModel?: string;
    /** Serial number if available */
    serialNumber?: string;
    /** Device state when found */
    deviceState?: 'on' | 'off' | 'locked' | 'unlocked';
    /** Additional technical notes */
    notes: string[];
  };
  /** Legal considerations for handling */
  legalConsiderations: string[];
  /** Chain of custody tracking */
  chainOfCustody: {
    /** Required documentation steps */
    steps: string[];
    /** Required documentation items */
    documentation: string[];
    /** Storage requirements */
    storage: string;
    /** Access log entries */
    accessLog: Array<{
      /** ISO timestamp of access */
      timestamp: string;
      /** Person accessing evidence */
      person: string;
      /** Purpose of access */
      purpose: string;
      /** Any changes or actions taken */
      actions: string[];
    }>;
  };
  /** Photos or documentation files */
  documentation: Array<{
    /** Type of documentation */
    type: 'photo' | 'document' | 'log';
    /** File name or reference */
    reference: string;
    /** ISO timestamp of creation */
    timestamp: string;
    /** Description of the documentation */
    description: string;
  }>;
}

/**
 * Represents a crime scene containing cryptocurrency evidence
 */
export interface CrimeScene {
  /** Unique identifier for the scene */
  id: string;
  /** Type of crime scene */
  type: 'residence' | 'business' | 'vehicle' | 'storage';
  /** Location description */
  location: string;
  /** ISO timestamp of arrival */
  arrivalTime: string;
  /** Detailed scene description */
  description: string;
  /** Digital evidence found at scene */
  evidence: DigitalEvidence[];
  /** Critical warnings for evidence handling */
  criticalWarnings: string[];
  /** Required procedures */
  procedures: {
    /** Initial response steps */
    initial: string[];
    /** Documentation requirements */
    documentation: string[];
    /** Evidence collection steps */
    collection: string[];
    /** Evidence preservation requirements */
    preservation: string[];
  };
  /** Scene security measures */
  security: {
    /** Access control measures */
    accessControl: string[];
    /** Network security measures */
    networkSecurity: string[];
    /** Physical security measures */
    physicalSecurity: string[];
  };
  /** Personnel on scene */
  personnel: Array<{
    /** Name of person */
    name: string;
    /** Role at scene */
    role: string;
    /** Time present (ISO timestamps) */
    timePresent: {
      arrival: string;
      departure: string;
    };
    /** Actions performed */
    actions: string[];
  }>;
}

/**
 * Represents a forensic workstation for digital evidence
 */
export interface ForensicWorkstation {
  /** Unique identifier */
  id: string;
  /** Workstation name/number */
  name: string;
  /** Hardware specifications */
  hardware: {
    /** System specifications */
    system: string;
    /** Write blockers */
    writeBlockers: string[];
    /** Other hardware tools */
    tools: string[];
  };
  /** Installed software */
  software: Array<{
    /** Software name */
    name: string;
    /** Version number */
    version: string;
    /** Last validation date */
    lastValidated: string;
    /** Validation status */
    validationStatus: 'current' | 'expired' | 'pending';
  }>;
  /** Calibration status */
  calibration: {
    /** Last calibration date */
    lastCalibration: string;
    /** Next calibration due */
    nextCalibration: string;
    /** Calibration status */
    status: 'current' | 'due' | 'overdue';
  };
}

/**
 * Represents a digital evidence storage facility
 */
export interface StorageFacility {
  /** Facility identifier */
  id: string;
  /** Facility name */
  name: string;
  /** Security measures */
  security: {
    /** Access control type */
    accessControl: string;
    /** Environmental controls */
    environmental: string[];
    /** Monitoring systems */
    monitoring: string[];
  };
  /** Storage conditions */
  conditions: {
    /** Temperature range */
    temperature: string;
    /** Humidity range */
    humidity: string;
    /** Other conditions */
    other: string[];
  };
  /** Storage locations */
  locations: Array<{
    /** Location identifier */
    id: string;
    /** Location description */
    description: string;
    /** Evidence stored here */
    evidence: string[];
  }>;
}