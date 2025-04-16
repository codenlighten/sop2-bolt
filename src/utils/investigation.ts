import { Case, InternationalRequest, ForensicReport, SeizureOrder } from '../types/investigation';

/**
 * Validates an MLAT request for completeness and correctness
 * 
 * @param {InternationalRequest} request - The MLAT request to validate
 * @returns {boolean} True if the request is valid
 */
export const validateMLATRequest = (request: InternationalRequest): boolean => {
  // Check for required elements
  if (!request.country) return false;
  if (!request.requirements.length) return false;
  if (!request.timeframe) return false;
  
  // Validate jurisdiction info if provided
  if (request.jurisdictionInfo) {
    if (!request.jurisdictionInfo.agencies.length) return false;
    if (!request.jurisdictionInfo.treaties.length) return false;
    if (!request.jurisdictionInfo.requirements.length) return false;
  }

  // Validate status
  if (!request.status.current) return false;
  if (!request.status.history.length) return false;

  return true;
};

/**
 * Gets jurisdiction-specific requirements for international requests
 * 
 * @param {string} country - Target country
 * @returns {string[]} Array of requirements
 */
export const getJurisdictionRequirements = (country: string): string[] => {
  const baseRequirements = [
    'Formal request through proper channels',
    'Evidence of criminal activity',
    'Clear connection to jurisdiction',
    'Proper documentation'
  ];

  switch (country.toLowerCase()) {
    case 'switzerland':
      return [
        ...baseRequirements,
        'Dual criminality evidence',
        'German/French/Italian translations',
        'Bank secrecy considerations',
        'Detailed asset tracing documentation',
        'Proof of criminal origin of funds',
        'Swiss legal representative'
      ];
    case 'singapore':
      return [
        ...baseRequirements,
        'Local law enforcement endorsement',
        'Regulatory compliance evidence',
        'MAS guidelines adherence',
        'Suspicious transaction reports',
        'Exchange compliance records',
        'Asset freezing orders'
      ];
    case 'cayman islands':
      return [
        ...baseRequirements,
        'CIMA notification requirements',
        'Local counsel engagement',
        'Detailed fund tracing',
        'Beneficial ownership information',
        'Exchange cooperation agreements'
      ];
    default:
      return baseRequirements;
  }
};

/**
 * Formats a forensic report for presentation
 * 
 * @param {ForensicReport} report - The report to format
 * @returns {string} Formatted report text
 */
export const formatForensicReport = (report: ForensicReport): string => {
  const formatDate = (date: string) => new Date(date).toLocaleDateString();
  
  return `
Forensic Analysis Report
=======================
Report ID: ${report.id}
Case: ${report.caseId}
Type: ${report.type}
Author: ${report.metadata.author}
Date: ${formatDate(report.metadata.created)}
${report.metadata.reviewed ? `Reviewed by: ${report.metadata.reviewer}` : 'Pending Review'}

Key Findings
-----------
${report.findings.map(f => `- ${f}`).join('\n')}

Methodology
----------
Tools Used:
${report.methodology.tools.map(t => `- ${t}`).join('\n')}

Procedures:
${report.methodology.procedures.map(p => `- ${p}`).join('\n')}

Standards:
${report.methodology.standards.map(s => `- ${s}`).join('\n')}

Evidence Analyzed
---------------
Digital Evidence: ${report.evidence.digital.length} items
Blockchain Data: ${report.evidence.blockchain.length} transactions
Additional Items: ${report.evidence.additional.length} items

Timeline
--------
${report.timeline.map(t => `
${formatDate(t.date)}: ${t.event}
Details: ${t.details}
${t.technicalNotes ? `Technical Notes:\n${t.technicalNotes.map(n => `  - ${n}`).join('\n')}` : ''}`
).join('\n')}

Recommendations
--------------
${report.recommendations.map(r => `- ${r}`).join('\n')}
`.trim();
};

/**
 * Validates a seizure order for completeness
 * 
 * @param {SeizureOrder} order - The seizure order to validate
 * @returns {{ valid: boolean; issues: string[] }} Validation results
 */
export const validateSeizureOrder = (
  order: SeizureOrder
): { valid: boolean; issues: string[] } => {
  const issues: string[] = [];

  // Check authority
  if (!order.authority.court) {
    issues.push('Missing issuing court');
  }
  if (!order.authority.caseNumber) {
    issues.push('Missing case number');
  }
  if (!order.authority.issueDate) {
    issues.push('Missing issue date');
  }

  // Check assets
  if (!order.assets.length) {
    issues.push('No assets specified');
  }
  order.assets.forEach((asset, index) => {
    if (!asset.identifier) {
      issues.push(`Missing identifier for asset ${index + 1}`);
    }
    if (!asset.estimatedValue) {
      issues.push(`Missing value estimate for asset ${index + 1}`);
    }
  });

  // Check execution
  if (!order.execution.agency) {
    issues.push('Missing executing agency');
  }

  return {
    valid: issues.length === 0,
    issues
  };
};

/**
 * Creates a case timeline entry
 * 
 * @param {Case} case_ - The case to update
 * @param {string} type - Event type
 * @param {string} description - Event description
 * @param {string[]} personnel - Involved personnel
 * @param {string[]} [relatedEvidence] - Related evidence IDs
 * @returns {Case} Updated case with new timeline entry
 */
export const addCaseTimelineEntry = (
  case_: Case,
  type: Case['timeline'][0]['type'],
  description: string,
  personnel: string[],
  relatedEvidence?: string[]
): Case => {
  return {
    ...case_,
    timeline: [
      ...case_.timeline,
      {
        timestamp: new Date().toISOString(),
        type,
        description,
        personnel,
        relatedEvidence
      }
    ],
    lastUpdated: new Date().toISOString()
  };
};

/**
 * Adds a note to a case
 * 
 * @param {Case} case_ - The case to update
 * @param {string} author - Note author
 * @param {string} content - Note content
 * @param {string[]} tags - Note tags/categories
 * @returns {Case} Updated case with new note
 */
export const addCaseNote = (
  case_: Case,
  author: string,
  content: string,
  tags: string[]
): Case => {
  return {
    ...case_,
    notes: [
      ...case_.notes,
      {
        timestamp: new Date().toISOString(),
        author,
        content,
        tags
      }
    ],
    lastUpdated: new Date().toISOString()
  };
};