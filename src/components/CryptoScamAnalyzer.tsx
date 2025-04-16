import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, ArrowRight, Shield, Search, FileText, Brain, Globe, Lock, Building2, Wallet, DollarSign } from 'lucide-react';

interface ScamIndicator {
  id: string;
  type: string;
  description: string;
  riskLevel: 'high' | 'medium' | 'low';
  examples: string[];
  technicalIndicators: string[];
  preventionSteps: string[];
  investigationSteps: string[];
  realWorldCases?: {
    name: string;
    description: string;
    outcome: string;
  }[];
}

const scamIndicators: ScamIndicator[] = [
  {
    id: '1',
    type: 'Investment Fraud',
    description: 'Fraudulent investment schemes promising unrealistic returns',
    riskLevel: 'high',
    examples: [
      'Guaranteed 100% weekly returns',
      'Risk-free investment opportunities',
      'Secret trading algorithms',
      'Celebrity endorsements',
      'Limited time pressure tactics'
    ],
    technicalIndicators: [
      'Multiple wallet addresses collecting funds',
      'Rapid fund movement to exchanges',
      'Large number of small deposits',
      'Automated withdrawal patterns'
    ],
    preventionSteps: [
      'Verify investment platform licenses',
      'Check team background and credentials',
      'Research project documentation',
      'Analyze smart contract code'
    ],
    investigationSteps: [
      'Track fund collection patterns',
      'Identify promotional channels',
      'Document victim statements',
      'Map wallet network structure'
    ],
    realWorldCases: [
      {
        name: 'BitConnect Collapse',
        description: 'Ponzi scheme promising 1% daily returns',
        outcome: '$2.5 billion investor losses'
      },
      {
        name: 'OneCoin Scam',
        description: 'Fake cryptocurrency investment scheme',
        outcome: '$4 billion fraudulent operation'
      }
    ]
  },
  {
    id: '2',
    type: 'Rug Pulls',
    description: 'Developers abandon project after raising funds',
    riskLevel: 'high',
    examples: [
      'Anonymous team members',
      'Locked liquidity for short period',
      'Massive social media promotion',
      'Unrealistic tokenomics',
      'Copy-pasted contracts'
    ],
    technicalIndicators: [
      'Hidden minting functions',
      'Ownership concentration',
      'Backdoor functions in contract',
      'Restricted selling mechanisms'
    ],
    preventionSteps: [
      'Audit smart contract code',
      'Check liquidity lock period',
      'Verify team identities',
      'Analyze token distribution'
    ],
    investigationSteps: [
      'Review contract deployment history',
      'Track promotional campaigns',
      'Document liquidity removal',
      'Identify connected wallets'
    ],
    realWorldCases: [
      {
        name: 'Squid Game Token',
        description: 'Token based on Netflix show with selling restrictions',
        outcome: '$3.38 million stolen'
      }
    ]
  },
  {
    id: '3',
    type: 'Phishing Attacks',
    description: 'Fake websites and apps stealing crypto credentials',
    riskLevel: 'high',
    examples: [
      'Fake exchange login pages',
      'Malicious wallet apps',
      'Clipboard hijacking malware',
      'Social media impersonation',
      'Fake support channels'
    ],
    technicalIndicators: [
      'Similar domain names',
      'Invalid SSL certificates',
      'Wallet address replacement',
      'Automated fund transfers'
    ],
    preventionSteps: [
      'Verify website URLs carefully',
      'Use hardware wallets',
      'Enable 2FA authentication',
      'Check for SSL certificates'
    ],
    investigationSteps: [
      'Collect phishing site data',
      'Track stolen fund movement',
      'Identify hosting providers',
      'Document victim reports'
    ]
  },
  {
    id: '4',
    type: 'Smart Contract Exploits',
    description: 'Vulnerabilities in DeFi protocols and smart contracts',
    riskLevel: 'high',
    examples: [
      'Flash loan attacks',
      'Price manipulation',
      'Reentrancy exploits',
      'Oracle manipulation',
      'Infinite minting bugs'
    ],
    technicalIndicators: [
      'Large flash loans',
      'Multiple contract interactions',
      'Unusual price movements',
      'Complex transaction chains'
    ],
    preventionSteps: [
      'Regular security audits',
      'Implement circuit breakers',
      'Use proven code libraries',
      'Monitor contract events'
    ],
    investigationSteps: [
      'Analyze transaction traces',
      'Review contract interactions',
      'Document exploit method',
      'Track stolen assets'
    ],
    realWorldCases: [
      {
        name: 'Poly Network Hack',
        description: 'Cross-chain protocol exploit',
        outcome: '$610 million stolen and returned'
      }
    ]
  }
];

interface CrimeType {
  id: string;
  name: string;
  description: string;
  indicators: string[];
  investigationMethods: string[];
  caseStudies: {
    title: string;
    description: string;
    outcome: string;
  }[];
}

const crimeTypes: CrimeType[] = [
  {
    id: 'ransomware',
    name: 'Ransomware Attacks',
    description: 'Malicious software encrypting data for ransom',
    indicators: [
      'Large BTC payments to new addresses',
      'Multiple victim payments to same wallet',
      'Usage of mixing services',
      'Conversion to privacy coins'
    ],
    investigationMethods: [
      'Track ransom payments',
      'Monitor known ransomware wallets',
      'Analyze exchange cashouts',
      'Identify infrastructure providers'
    ],
    caseStudies: [
      {
        title: 'Colonial Pipeline Attack',
        description: 'Major pipeline operation disrupted',
        outcome: '$4.4 million ransom paid and partially recovered'
      }
    ]
  },
  {
    id: 'darkmarket',
    name: 'Dark Market Operations',
    description: 'Illegal marketplace transactions',
    indicators: [
      'Regular payments to known markets',
      'Use of privacy coins',
      'Multiple small transactions',
      'Peer-to-peer exchanges'
    ],
    investigationMethods: [
      'Monitor market wallets',
      'Track vendor payments',
      'Analyze customer patterns',
      'Document shipping data'
    ],
    caseStudies: [
      {
        title: 'Silk Road Takedown',
        description: 'Major dark web marketplace',
        outcome: 'Site seized and billions in BTC confiscated'
      }
    ]
  }
];

export function CryptoScamAnalyzer() {
  const [selectedIndicator, setSelectedIndicator] = useState<ScamIndicator | null>(null);
  const [selectedCrime, setSelectedCrime] = useState<CrimeType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTechnical, setShowTechnical] = useState(false);
  const [showCaseStudies, setShowCaseStudies] = useState(false);

  const filteredIndicators = scamIndicators.filter(indicator =>
    indicator.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    indicator.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Cryptocurrency Scam Analysis Tool
        </h3>
        <p className="text-gray-600">
          Learn to identify common cryptocurrency scams and criminal patterns.
          Understand warning signs and investigation techniques.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scam Indicators */}
        <div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search scam types..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-4">
            {filteredIndicators.map(indicator => (
              <button
                key={indicator.id}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  selectedIndicator?.id === indicator.id
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedIndicator(indicator)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{indicator.type}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    indicator.riskLevel === 'high'
                      ? 'bg-red-100 text-red-700'
                      : indicator.riskLevel === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                  }`}>
                    {indicator.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
                <p className="text-sm text-gray-600">{indicator.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Analysis Panel */}
        <div>
          {selectedIndicator ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Warning Signs:</h4>
                <ul className="space-y-2">
                  {selectedIndicator.examples.map((example, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  onClick={() => setShowTechnical(!showTechnical)}
                >
                  {showTechnical ? 'Hide' : 'Show'} Technical Analysis
                </button>

                {showTechnical && (
                  <div className="mt-4 space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h5 className="font-medium text-blue-900 mb-2">Technical Indicators:</h5>
                      <ul className="space-y-2">
                        {selectedIndicator.technicalIndicators.map((indicator, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Brain className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                            <span className="text-blue-800">{indicator}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h5 className="font-medium text-green-900 mb-2">Prevention Steps:</h5>
                      <ul className="space-y-2">
                        {selectedIndicator.preventionSteps.map((step, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Shield className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                            <span className="text-green-800">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <h5 className="font-medium text-purple-900 mb-2">Investigation Steps:</h5>
                      <ul className="space-y-2">
                        {selectedIndicator.investigationSteps.map((step, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Search className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                            <span className="text-purple-800">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {selectedIndicator.realWorldCases && (
                <div>
                  <button
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    onClick={() => setShowCaseStudies(!showCaseStudies)}
                  >
                    {showCaseStudies ? 'Hide' : 'Show'} Case Studies
                  </button>

                  {showCaseStudies && (
                    <div className="mt-4 space-y-4">
                      {selectedIndicator.realWorldCases.map((case_, index) => (
                        <div key={index} className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                          <h5 className="font-medium text-yellow-900">{case_.name}</h5>
                          <p className="text-yellow-800 mt-1">{case_.description}</p>
                          <p className="text-yellow-700 mt-2 text-sm">Outcome: {case_.outcome}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2" />
                <p>Select a scam type to analyze patterns</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Common Crime Types */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Common Cryptocurrency Crime Types
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {crimeTypes.map(crime => (
            <div
              key={crime.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                {crime.id === 'ransomware' ? (
                  <Lock className="w-6 h-6 text-red-600" />
                ) : (
                  <Globe className="w-6 h-6 text-purple-600" />
                )}
                <h4 className="text-lg font-semibold text-gray-900">{crime.name}</h4>
              </div>
              <p className="text-gray-600 mb-4">{crime.description}</p>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Warning Signs:</h5>
                  <ul className="space-y-2">
                    {crime.indicators.map((indicator, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                        <span className="text-gray-600">{indicator}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Investigation Methods:</h5>
                  <ul className="space-y-2">
                    {crime.investigationMethods.map((method, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Search className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                        <span className="text-gray-600">{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {crime.caseStudies.map((case_, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h5 className="font-medium text-gray-900">{case_.title}</h5>
                    <p className="text-gray-600 mt-1">{case_.description}</p>
                    <p className="text-gray-500 mt-2 text-sm">Outcome: {case_.outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Tips */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">Investigation Tips:</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Document all suspicious indicators and patterns thoroughly
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Use blockchain analysis tools to track fund movements
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Collect evidence from social media and communication channels
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Preserve all digital evidence following proper procedures
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}