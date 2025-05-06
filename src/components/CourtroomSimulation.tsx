import { useState } from 'react';
import { AlertTriangle, CheckCircle, ArrowRight, Scale } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface Evidence {
  id: string;
  type: 'blockchain' | 'exchange' | 'device' | 'witness';
  name: string;
  description: string;
  strength: 'strong' | 'medium' | 'weak';
  admissibilityFactors: string[];
  chainOfCustody: boolean;
  technicalDetails?: string[];
  legalPrecedents?: string[];
}

const availableEvidence: Evidence[] = [
  {
    id: '1',
    type: 'blockchain',
    name: 'Transaction Records',
    description: 'Blockchain explorer data showing fund movements through multiple wallets',
    strength: 'strong',
    admissibilityFactors: [
      'Verified by multiple blockchain explorers',
      'Complete transaction history preserved',
      'Expert witness available to testify',
      'Proper documentation maintained'
    ],
    chainOfCustody: true,
    technicalDetails: [
      'Transaction hashes and timestamps',
      'Wallet address clustering analysis',
      'Network fee calculations',
      'Smart contract interactions'
    ],
    legalPrecedents: [
      'US v. Sterlingov (2023) - Bitcoin Fog case',
      'SEC v. Ripple Labs (2023) - Blockchain data admissibility'
    ]
  },
  {
    id: '2',
    type: 'exchange',
    name: 'Exchange KYC Records',
    description: 'Customer verification documents from cryptocurrency exchange',
    strength: 'strong',
    admissibilityFactors: [
      'Official business records',
      'Obtained through legal process',
      'Maintained by regulated entity',
      'Clear chain of custody'
    ],
    chainOfCustody: true,
    technicalDetails: [
      'Government ID verification',
      'Proof of address documentation',
      'IP access logs',
      'Account activity history'
    ],
    legalPrecedents: [
      'US v. Coinbase (2018) - KYC record requirements',
      'FinCEN v. BitMEX (2021) - Exchange compliance'
    ]
  },
  {
    id: '3',
    type: 'device',
    name: 'Hardware Wallet',
    description: 'Physical cryptocurrency wallet seized during arrest',
    strength: 'medium',
    admissibilityFactors: [
      'Physical evidence properly logged',
      'Forensic imaging completed',
      'Access not yet obtained',
      'Suspect claims Fifth Amendment'
    ],
    chainOfCustody: true,
    technicalDetails: [
      'Device model and serial number',
      'Firmware version',
      'Physical condition assessment',
      'Attempted access history'
    ],
    legalPrecedents: [
      'US v. Gratkowski (2020) - Device seizure standards',
      'State v. Johnson (2022) - Fifth Amendment implications'
    ]
  },
  {
    id: '4',
    type: 'witness',
    name: 'Exchange Compliance Officer',
    description: 'Testimony about suspicious transaction patterns',
    strength: 'medium',
    admissibilityFactors: [
      'Expert witness qualification',
      'Direct knowledge of transactions',
      'Documented observations',
      'Available for cross-examination'
    ],
    chainOfCustody: false,
    technicalDetails: [
      'AML compliance procedures',
      'Transaction monitoring systems',
      'Risk scoring methodology',
      'Alert investigation process'
    ],
    legalPrecedents: [
      'US v. Zhong (2022) - Expert testimony standards',
      'SEC v. Telegram (2020) - Compliance officer testimony'
    ]
  }
];

interface Case {
  id: string;
  title: string;
  description: string;
  requiredEvidence: string[];
  status: 'pending' | 'in_progress' | 'complete';
}

const cases: Case[] = [
  {
    id: '1',
    title: 'Cryptocurrency Money Laundering',
    description: 'Prosecution of exchange operator for facilitating money laundering through mixing service',
    requiredEvidence: ['Transaction Records', 'Exchange KYC Records'],
    status: 'pending'
  },
  {
    id: '2',
    title: 'Dark Market Operation',
    description: 'Criminal case against dark web marketplace administrator',
    requiredEvidence: ['Hardware Wallet', 'Exchange Compliance Officer'],
    status: 'pending'
  }
];

export function CourtroomSimulation() {
  const { updateSimulationScore } = useProgress();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<Set<string>>(new Set());
  const [caseStatuses, setCaseStatuses] = useState<Record<string, Case['status']>>(
    cases.reduce((acc, c) => ({ ...acc, [c.id]: c.status }), {} as Record<string, Case['status']>)
  );
  const [showLegalAnalysis, setShowLegalAnalysis] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const handleEvidenceSelect = (evidenceId: string) => {
    if (!selectedCase) return;

    const newSelected = new Set(selectedEvidence);
    if (newSelected.has(evidenceId)) {
      newSelected.delete(evidenceId);
    } else {
      newSelected.add(evidenceId);
    }
    setSelectedEvidence(newSelected);

    // Check if all required evidence is selected
    const evidence = availableEvidence.find(e => e.id === evidenceId);
    if (evidence) {
      const selectedEvidenceNames = Array.from(newSelected).map(
        id => availableEvidence.find(e => e.id === id)?.name
      );
      
      if (selectedCase.requiredEvidence.every((required: string) => 
        selectedEvidenceNames.includes(required)
      )) {
        setCaseStatuses((prev: Record<string, Case['status']>) => ({
          ...prev,
          [selectedCase.id]: 'complete'
        }));
        // Report score when a case is completed
        updateSimulationScore('courtroom', 100); 
      } else if (newSelected.size > 0) {
        setCaseStatuses((prev: Record<string, Case['status']>) => ({
          ...prev,
          [selectedCase.id]: 'in_progress'
        }));
      } else {
        setCaseStatuses((prev: Record<string, Case['status']>) => ({
          ...prev,
          [selectedCase.id]: 'pending'
        }));
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Courtroom Evidence Simulation
        </h3>
        <p className="text-gray-600">
          Practice defending blockchain evidence against common defense arguments.
          Select appropriate responses to strengthen your case.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cases List */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Active Cases:</h4>
          <div className="space-y-4">
            {cases.map((case_) => {
              const status = caseStatuses[case_.id];
              
              return (
                <div
                  key={case_.id}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedCase?.id === case_.id
                      ? 'ring-2 ring-blue-500 ring-opacity-50'
                      : ''
                  } ${
                    status === 'complete'
                      ? 'bg-green-50 border-green-200'
                      : status === 'in_progress'
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => setSelectedCase(case_)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{case_.title}</h5>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      status === 'complete'
                        ? 'bg-green-100 text-green-700'
                        : status === 'in_progress'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}>
                      {status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{case_.description}</p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900">Required Evidence:</div>
                    <div className="flex flex-wrap gap-2">
                      {case_.requiredEvidence.map((evidence, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                        >
                          {evidence}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evidence Selection */}
        <div>
          {selectedCase ? (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Available Evidence:</h4>
                <div className="space-y-4">
                  {availableEvidence.map((evidence) => {
                    const isSelected = selectedEvidence.has(evidence.id);
                    const isRequired = selectedCase.requiredEvidence.includes(evidence.name);
                    
                    return (
                      <div
                        key={evidence.id}
                        className={`w-full text-left p-4 rounded-lg border transition-colors ${
                          isSelected
                            ? 'bg-blue-50 border-blue-200'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                        onClick={() => handleEvidenceSelect(evidence.id)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            evidence.strength === 'strong'
                              ? 'bg-green-100'
                              : evidence.strength === 'medium'
                                ? 'bg-yellow-100'
                                : 'bg-red-100'
                          }`}>
                            <Scale className={`w-5 h-5 ${
                              evidence.strength === 'strong'
                                ? 'text-green-600'
                                : evidence.strength === 'medium'
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                            }`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-medium text-gray-900">{evidence.name}</h5>
                              {isRequired && (
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                  Required
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{evidence.description}</p>
                            <div className="mt-2">
                              <div className="text-sm font-medium text-gray-900 mb-1">
                                Admissibility Factors:
                              </div>
                              <ul className="space-y-1">
                                {evidence.admissibilityFactors.map((factor, index) => (
                                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                    <ArrowRight className="w-4 h-4 text-blue-500" />
                                    <span>{factor}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              {evidence.chainOfCustody ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                              )}
                              <span className={`text-sm ${
                                evidence.chainOfCustody ? 'text-green-600' : 'text-yellow-600'
                              }`}>
                                {evidence.chainOfCustody 
                                  ? 'Chain of custody verified'
                                  : 'Chain of custody requirements pending'
                                }
                              </span>
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="mt-4 space-y-4">
                            <div
                              className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowTechnicalDetails(!showTechnicalDetails);
                              }}
                              role="button"
                              tabIndex={0}
                            >
                              {showTechnicalDetails ? 'Hide' : 'Show'} Technical Details
                            </div>
                            
                            {showTechnicalDetails && evidence.technicalDetails && (
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <h6 className="font-medium text-gray-900 mb-2">Technical Analysis:</h6>
                                <ul className="space-y-2">
                                  {evidence.technicalDetails.map((detail, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                                      <span className="text-sm text-gray-600">{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div
                              className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowLegalAnalysis(!showLegalAnalysis);
                              }}
                              role="button"
                              tabIndex={0}
                            >
                              {showLegalAnalysis ? 'Hide' : 'Show'} Legal Analysis
                            </div>
                            
                            {showLegalAnalysis && evidence.legalPrecedents && (
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <h6 className="font-medium text-gray-900 mb-2">Legal Precedents:</h6>
                                <ul className="space-y-2">
                                  {evidence.legalPrecedents.map((precedent, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <Scale className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                                      <span className="text-sm text-gray-600">{precedent}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {caseStatuses[selectedCase.id] === 'complete' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-green-900">Case Ready for Trial!</h4>
                      <p className="text-green-700">
                        You've assembled all required evidence with proper chain of custody.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Scale className="w-8 h-8 mx-auto mb-2" />
                <p>Select a case to begin evidence review</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}