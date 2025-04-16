import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, ArrowRight, FileText, Globe, Lock, Wallet, Camera, Search, Database, FileWarning, Scale } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  description: string;
  type: 'ransomware' | 'nft_scam' | 'exchange_hack' | 'dark_market';
  evidence: {
    walletAddresses: string[];
    transactions: Array<{
      from: string;
      to: string;
      amount: string;
      timestamp: string;
    }>;
    additionalInfo: string[];
    deviceTypes: string[];
    criticalEvidence: string[];
  };
  decisions: Array<{
    id: string;
    text: string;
    consequences: {
      success: boolean;
      message: string;
      impact: string[];
      evidencePreservation: string[];
      legalImplications: string[];
    };
  }>;
  bestPractices: {
    evidenceHandling: string[];
    documentation: string[];
    chainOfCustody: string[];
    technicalConsiderations: string[];
  };
}

const scenarios: Scenario[] = [
  {
    id: 'ransomware_1',
    title: 'Corporate Ransomware Attack',
    description: 'A major corporation has been hit with ransomware. Multiple cryptocurrency wallets and hardware devices need to be secured.',
    type: 'ransomware',
    evidence: {
      walletAddresses: [
        'bc1q...wn54 (Attacker\'s Initial Wallet)',
        'Multiple Mixer Addresses',
        'Exchange Wallet'
      ],
      transactions: [
        {
          from: 'Company Wallet',
          to: 'bc1q...wn54',
          amount: '75 BTC',
          timestamp: '2025-05-01 10:00 UTC'
        },
        {
          from: 'bc1q...wn54',
          to: 'Mixer Service',
          amount: '45 BTC',
          timestamp: '2025-05-01 14:30 UTC'
        }
      ],
      additionalInfo: [
        'Ransomware strain identified as "DarkSide"',
        'Multiple ransom notes found on systems',
        'Hardware wallets discovered in CEO office',
        'Exchange login sessions active on computers'
      ],
      deviceTypes: [
        'Hardware wallets',
        'Unlocked computers',
        'Mobile devices',
        'USB drives'
      ],
      criticalEvidence: [
        'Active exchange sessions',
        'Hardware wallet PINs',
        'Transaction records',
        'Communication logs'
      ]
    },
    decisions: [
      {
        id: 'secure_devices',
        text: 'Immediately secure all cryptocurrency storage devices and document their locations',
        consequences: {
          success: true,
          message: 'Critical evidence preserved and properly documented.',
          impact: [
            'Preserved access to funds',
            'Maintained evidence integrity',
            'Clear documentation trail'
          ],
          evidencePreservation: [
            'Hardware wallets secured',
            'Device states documented',
            'Photographs taken',
            'Chain of custody established'
          ],
          legalImplications: [
            'Evidence admissibility maintained',
            'Proper seizure procedures followed',
            'Documentation supports legal proceedings'
          ]
        }
      },
      {
        id: 'attempt_access',
        text: 'Try to access the hardware wallets to verify funds',
        consequences: {
          success: false,
          message: 'Attempting access risks evidence tampering and could trigger security wipes.',
          impact: [
            'Potential evidence destruction',
            'Compromised chain of custody',
            'Legal admissibility issues'
          ],
          evidencePreservation: [
            'Device state altered',
            'Potential data loss',
            'Security mechanisms triggered'
          ],
          legalImplications: [
            'Evidence tampering concerns',
            'Admissibility challenges',
            'Procedural violations'
          ]
        }
      }
    ],
    bestPractices: {
      evidenceHandling: [
        'Photograph all devices in original locations',
        'Use anti-static bags for hardware wallets',
        'Document all visible display information',
        'Maintain power state of active devices'
      ],
      documentation: [
        'Create detailed evidence log',
        'Record serial numbers and conditions',
        'Document visible wallet addresses',
        'Photograph screen contents'
      ],
      chainOfCustody: [
        'Label all evidence properly',
        'Use tamper-evident bags',
        'Track all transfers of custody',
        'Secure storage procedures'
      ],
      technicalConsiderations: [
        'Use write blockers for device access',
        'Preserve RAM contents if possible',
        'Document network connections',
        'Capture volatile data'
      ]
    }
  },
  {
    id: 'exchange_hack',
    title: 'Cryptocurrency Exchange Breach',
    description: 'A cryptocurrency exchange reports unauthorized withdrawals. Multiple hot wallets have been compromised.',
    type: 'exchange_hack',
    evidence: {
      walletAddresses: [
        'Exchange Hot Wallet',
        'Multiple Attacker Wallets',
        'Mixer Services'
      ],
      transactions: [
        {
          from: 'Exchange Hot Wallet',
          to: 'Attacker Wallet 1',
          amount: '1000 ETH',
          timestamp: '2025-05-02 15:20 UTC'
        },
        {
          from: 'Attacker Wallet 1',
          to: 'Tornado Cash',
          amount: '500 ETH',
          timestamp: '2025-05-02 15:45 UTC'
        }
      ],
      additionalInfo: [
        'Security breach detected in exchange infrastructure',
        'Multiple unauthorized API calls',
        'Suspicious IP addresses identified',
        'Abnormal withdrawal patterns'
      ],
      deviceTypes: [
        'Exchange servers',
        'Security logs',
        'API documentation',
        'Employee devices'
      ],
      criticalEvidence: [
        'Server logs',
        'API access records',
        'Transaction data',
        'Employee access logs'
      ]
    },
    decisions: [
      {
        id: 'freeze_accounts',
        text: 'Work with exchange to freeze affected accounts and document all transactions',
        consequences: {
          success: true,
          message: 'Quick response prevents further unauthorized withdrawals.',
          impact: [
            'Limited financial damage',
            'Preserved evidence trail',
            'Clear incident timeline'
          ],
          evidencePreservation: [
            'Transaction records secured',
            'Access logs preserved',
            'Account states documented'
          ],
          legalImplications: [
            'Proper incident response',
            'Regulatory compliance maintained',
            'Evidence chain preserved'
          ]
        }
      },
      {
        id: 'system_shutdown',
        text: 'Immediately shut down all exchange systems',
        consequences: {
          success: false,
          message: 'Complete shutdown destroys volatile evidence and disrupts legitimate business.',
          impact: [
            'Loss of volatile data',
            'Service disruption',
            'Customer impact'
          ],
          evidencePreservation: [
            'RAM data lost',
            'Active connections broken',
            'Transaction tracking compromised'
          ],
          legalImplications: [
            'Potential liability issues',
            'Customer complaints',
            'Regulatory concerns'
          ]
        }
      }
    ],
    bestPractices: {
      evidenceHandling: [
        'Capture volatile memory',
        'Secure log files',
        'Document system states',
        'Preserve network data'
      ],
      documentation: [
        'Record incident timeline',
        'Document affected accounts',
        'Log all response actions',
        'Track unauthorized access'
      ],
      chainOfCustody: [
        'Secure digital evidence',
        'Track data access',
        'Document collection methods',
        'Maintain evidence integrity'
      ],
      technicalConsiderations: [
        'Use forensic tools',
        'Preserve timestamps',
        'Monitor live systems',
        'Track blockchain transactions'
      ]
    }
  }
];

export function CyberTrainingSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showBestPractices, setShowBestPractices] = useState(false);
  const [showTechnical, setShowTechnical] = useState(false);

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setSelectedDecision(null);
    setShowResult(false);
    setShowBestPractices(false);
    setShowTechnical(false);
  };

  const handleDecisionSubmit = () => {
    if (!selectedScenario || !selectedDecision) return;

    const decision = selectedScenario.decisions.find(d => d.id === selectedDecision);
    if (decision?.consequences.success) {
      setScore(prev => prev + 1);
    }
    setShowResult(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Cyber Crime Scene Investigation Training
        </h3>
        <p className="text-gray-600">
          Practice investigating cryptocurrency-related crime scenes through realistic scenarios.
          Learn proper evidence handling, documentation, and chain of custody procedures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scenario Selection */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Training Scenarios:</h4>
          <div className="space-y-4">
            {scenarios.map(scenario => (
              <button
                key={scenario.id}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  selectedScenario?.id === scenario.id
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => handleScenarioSelect(scenario)}
              >
                <div className="flex items-center gap-2 mb-2">
                  {scenario.type === 'ransomware' ? (
                    <Lock className="w-5 h-5 text-red-600" />
                  ) : scenario.type === 'exchange_hack' ? (
                    <Database className="w-5 h-5 text-purple-600" />
                  ) : (
                    <Globe className="w-5 h-5 text-blue-600" />
                  )}
                  <h5 className="font-medium text-gray-900">{scenario.title}</h5>
                </div>
                <p className="text-sm text-gray-600">{scenario.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Scenario Details & Decisions */}
        <div>
          {selectedScenario ? (
            <div className="space-y-6">
              {/* Evidence Analysis */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Evidence Analysis:</h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Critical Evidence:</h5>
                    <ul className="space-y-2">
                      {selectedScenario.evidence.criticalEvidence.map((evidence, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Camera className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600">{evidence}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Devices to Secure:</h5>
                    <ul className="space-y-2">
                      {selectedScenario.evidence.deviceTypes.map((device, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Shield className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600">{device}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Additional Information:</h5>
                    <ul className="space-y-2">
                      {selectedScenario.evidence.additionalInfo.map((info, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <FileText className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{info}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Decision Making */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Make Your Decision:</h4>
                <div className="space-y-3">
                  {selectedScenario.decisions.map(decision => (
                    <button
                      key={decision.id}
                      className={`w-full p-4 text-left rounded-lg border transition-colors ${
                        selectedDecision === decision.id
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedDecision(decision.id)}
                      disabled={showResult}
                    >
                      {decision.text}
                    </button>
                  ))}
                </div>

                {!showResult && (
                  <button
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleDecisionSubmit}
                    disabled={!selectedDecision}
                  >
                    Submit Decision
                  </button>
                )}
              </div>

              {/* Results */}
              {showResult && selectedDecision && (
                <div>
                  {selectedScenario.decisions.find(d => d.id === selectedDecision)?.consequences.success ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-green-900">Correct Approach!</h4>
                          <p className="text-green-700">
                            {selectedScenario.decisions.find(d => d.id === selectedDecision)?.consequences.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-red-900">Incorrect Approach</h4>
                          <p className="text-red-700">
                            {selectedScenario.decisions.find(d => d.id === selectedDecision)?.consequences.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 space-y-4">
                    <button
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      onClick={() => setShowBestPractices(!showBestPractices)}
                    >
                      {showBestPractices ? 'Hide' : 'Show'} Best Practices
                    </button>

                    {showBestPractices && (
                      <div className="space-y-4">
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <h5 className="font-medium text-blue-900 mb-2">Evidence Handling:</h5>
                          <ul className="space-y-2">
                            {selectedScenario.bestPractices.evidenceHandling.map((practice, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                                <span className="text-blue-800">{practice}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <h5 className="font-medium text-purple-900 mb-2">Documentation:</h5>
                          <ul className="space-y-2">
                            {selectedScenario.bestPractices.documentation.map((doc, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <FileText className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                                <span className="text-purple-800">{doc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <h5 className="font-medium text-green-900 mb-2">Chain of Custody:</h5>
                          <ul className="space-y-2">
                            {selectedScenario.bestPractices.chainOfCustody.map((step, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Scale className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                                <span className="text-green-800">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    <button
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      onClick={() => setShowTechnical(!showTechnical)}
                    >
                      {showTechnical ? 'Hide' : 'Show'} Technical Considerations
                    </button>

                    {showTechnical && (
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h5 className="font-medium text-yellow-900 mb-2">Technical Requirements:</h5>
                        <ul className="space-y-2">
                          {selectedScenario.bestPractices.technicalConsiderations.map((tech, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Database className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                              <span className="text-yellow-800">{tech}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Search className="w-8 h-8 mx-auto mb-2" />
                <p>Select a scenario to begin training</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Educational Tips */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">Investigation Tips:</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Always document the original state of digital evidence before any interaction
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Use proper tools and containers for each type of cryptocurrency evidence
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Maintain detailed chain of custody records for all digital assets
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Consider both technical and legal implications of evidence handling
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}