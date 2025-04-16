import { DigitalEvidence, CrimeScene, ForensicWorkstation, StorageFacility } from '../types/evidence';

/**
 * Validates the chain of custody documentation for digital evidence
 * 
 * Checks for:
 * - Required documentation
 * - Proper timestamps
 * - Access logs
 * - Storage requirements
 * 
 * @param {DigitalEvidence} evidence - The evidence to validate
 * @returns {boolean} True if chain of custody is valid
 */
export const validateChainOfCustody = (evidence: DigitalEvidence): boolean => {
  // Check for required documentation
  if (!evidence.chainOfCustody.documentation.length) return false;
  if (!evidence.chainOfCustody.steps.length) return false;
  if (!evidence.chainOfCustody.storage) return false;
  
  // Validate access log entries
  if (evidence.chainOfCustody.accessLog.length > 0) {
    const validAccessLog = evidence.chainOfCustody.accessLog.every(entry => {
      return entry.timestamp && entry.person && entry.purpose && entry.actions.length > 0;
    });
    if (!validAccessLog) return false;
  }

  // Validate documentation entries
  const validDocs = evidence.documentation.every(doc => {
    return doc.type && doc.reference && doc.timestamp && doc.description;
  });
  if (!validDocs) return false;

  return true;
};

/**
 * Gets handling instructions for different types of digital evidence
 * 
 * @param {DigitalEvidence['type']} type - Type of digital evidence
 * @returns {string[]} Array of handling instructions
 */
export const getEvidenceHandlingInstructions = (type: DigitalEvidence['type']): string[] => {
  const baseInstructions = [
    'Document original location and condition',
    'Photograph before handling',
    'Use appropriate evidence containers',
    'Maintain chain of custody'
  ];

  switch (type) {
    case 'hardware_wallet':
      return [
        ...baseInstructions,
        'Use anti-static bags',
        'Do not attempt to access',
        'Document any visible displays',
        'Preserve power state',
        'Record serial numbers',
        'Note any visible damage',
        'Document any connected devices'
      ];
    case 'mobile_device':
      return [
        ...baseInstructions,
        'Enable airplane mode immediately',
        'Use Faraday bags',
        'Document screen contents',
        'Preserve battery power',
        'Note locked/unlocked state',
        'Record visible apps',
        'Document network connections'
      ];
    case 'computer':
      return [
        ...baseInstructions,
        'Document running processes',
        'Use write blockers',
        'Capture RAM if powered on',
        'Note network connections',
        'Record open applications',
        'Document visible screens',
        'Preserve power state'
      ];
    case 'paper_wallet':
      return [
        ...baseInstructions,
        'Handle with gloves',
        'Store in evidence envelope',
        'Document all visible text',
        'Photograph QR codes',
        'Note any damage or marks',
        'Preserve physical condition',
        'Avoid folding or creasing'
      ];
    case 'seed_phrase':
      return [
        ...baseInstructions,
        'Handle with extreme care',
        'Document exact word sequence',
        'Note any annotations',
        'Store securely',
        'Restrict access',
        'Maintain confidentiality',
        'Record context found'
      ];
    default:
      return baseInstructions;
  }
};

/**
 * Gets storage requirements for different types of digital evidence
 * 
 * @param {DigitalEvidence} evidence - The evidence item
 * @returns {string[]} Array of storage requirements
 */
export const getStorageRequirements = (evidence: DigitalEvidence): string[] => {
  const baseRequirements = [
    'Secure evidence locker',
    'Limited access',
    'Environmental controls',
    'Chain of custody documentation'
  ];

  switch (evidence.type) {
    case 'hardware_wallet':
      return [
        ...baseRequirements,
        'Anti-static protection',
        'Temperature control',
        'Power state maintenance',
        'Humidity control',
        'ESD protection',
        'Secure containment',
        'Access logging'
      ];
    case 'mobile_device':
      return [
        ...baseRequirements,
        'Faraday shielding',
        'Battery maintenance',
        'Signal blocking',
        'Temperature monitoring',
        'Charging protocols',
        'Access restrictions',
        'Status monitoring'
      ];
    case 'computer':
      return [
        ...baseRequirements,
        'Write blocker usage',
        'Power management',
        'Temperature control',
        'Dust protection',
        'Component security',
        'Access logging',
        'Status monitoring'
      ];
    case 'paper_wallet':
      return [
        ...baseRequirements,
        'Moisture control',
        'UV protection',
        'Acid-free storage',
        'Physical protection',
        'Temperature control',
        'Access restrictions',
        'Handling protocols'
      ];
    case 'seed_phrase':
      return [
        ...baseRequirements,
        'High-security storage',
        'Access restrictions',
        'Physical protection',
        'Environmental control',
        'Regular auditing',
        'Backup protocols',
        'Emergency procedures'
      ];
    default:
      return baseRequirements;
  }
};

/**
 * Validates a forensic workstation for evidence processing
 * 
 * @param {ForensicWorkstation} workstation - The workstation to validate
 * @returns {{ valid: boolean; issues: string[] }} Validation results and any issues
 */
export const validateForensicWorkstation = (
  workstation: ForensicWorkstation
): { valid: boolean; issues: string[] } => {
  const issues: string[] = [];

  // Check calibration status
  if (workstation.calibration.status === 'overdue') {
    issues.push('Workstation calibration is overdue');
  }

  // Check software validation
  const invalidSoftware = workstation.software.filter(
    sw => sw.validationStatus !== 'current'
  );
  if (invalidSoftware.length > 0) {
    issues.push(`Software validation needed: ${invalidSoftware.map(sw => sw.name).join(', ')}`);
  }

  // Check required hardware
  if (!workstation.hardware.writeBlockers.length) {
    issues.push('No write blockers configured');
  }

  return {
    valid: issues.length === 0,
    issues
  };
};

/**
 * Validates storage facility conditions for digital evidence
 * 
 * @param {StorageFacility} facility - The storage facility to validate
 * @returns {{ valid: boolean; issues: string[] }} Validation results and any issues
 */
export const validateStorageFacility = (
  facility: StorageFacility
): { valid: boolean; issues: string[] } => {
  const issues: string[] = [];

  // Check security measures
  if (!facility.security.accessControl) {
    issues.push('No access control system specified');
  }
  if (!facility.security.monitoring.length) {
    issues.push('No monitoring systems specified');
  }

  // Check environmental controls
  if (!facility.conditions.temperature || !facility.conditions.humidity) {
    issues.push('Environmental conditions not fully specified');
  }

  // Check storage locations
  if (!facility.locations.length) {
    issues.push('No storage locations defined');
  }

  return {
    valid: issues.length === 0,
    issues
  };
};

/**
 * Creates an access log entry for digital evidence
 * 
 * @param {DigitalEvidence} evidence - The evidence being accessed
 * @param {string} person - Person accessing the evidence
 * @param {string} purpose - Purpose of access
 * @param {string[]} actions - Actions performed
 * @returns {DigitalEvidence} Updated evidence with new access log entry
 */
export const logEvidenceAccess = (
  evidence: DigitalEvidence,
  person: string,
  purpose: string,
  actions: string[]
): DigitalEvidence => {
  return {
    ...evidence,
    chainOfCustody: {
      ...evidence.chainOfCustody,
      accessLog: [
        ...evidence.chainOfCustody.accessLog,
        {
          timestamp: new Date().toISOString(),
          person,
          purpose,
          actions
        }
      ]
    }
  };
};