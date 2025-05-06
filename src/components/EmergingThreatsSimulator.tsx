import { useState } from 'react';
import { Brain, Shield, AlertTriangle, CheckCircle, XCircle, ArrowRight, Database, Search, Globe, Lock } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface Threat {
  id: string;
  name: string;
  description: string;
  type: 'technical' | 'financial' | 'operational';
  countermeasures: string[];
  timeline: string;
  impact: string[];
  detectionMethods: string[];
  mitigationSteps: string[];
  realWorldExamples?: string[];
}

interface Countermeasure {
  id: string;
  name: string;
  description: string;
  effectiveness: 'high' | 'medium' | 'low';
  applicableThreats: string[];
  implementationTime: string;
  resourceRequirements: string[];
  limitations: string[];
  successMetrics: string[];
}

const threats: Threat[] = [
  {
    id: '1',
    name: 'Quantum Computing Attacks',
    description: 'Future quantum computers could break current blockchain encryption',
    type: 'technical',
    countermeasures: ['quantum-resistant', 'key-rotation'],
    timeline: '5-10 years',
    impact: [
      'Compromise of private keys',
      'Unauthorized access to wallets',
      'Blockchain security breakdown',
      'Mass theft of digital assets'
    ],
    detectionMethods: [
      'Monitor quantum computing developments',
      'Track encryption vulnerability research',
      'Assess blockchain protocol updates',
      'Analyze network anomalies'
    ],
    mitigationSteps: [
      'Implement quantum-resistant cryptography',
      'Regular key rotation protocols',
      'Upgrade blockchain consensus mechanisms',
      'Enhanced network monitoring'
    ],
    realWorldExamples: [
      'IBM\'s 127-qubit quantum processor development',
      'Google\'s quantum supremacy experiment',
      'Post-quantum cryptography proposals'
    ]
  },
  {
    id: '2',
    name: 'Cross-Chain Money Laundering',
    description: 'Using multiple blockchain bridges to obscure transaction trails',
    type: 'financial',
    countermeasures: ['bridge-monitoring', 'chain-analysis'],
    timeline: 'Current threat',
    impact: [
      'Complex fund tracing',
      'Jurisdictional challenges',
      'Increased criminal anonymity',
      'Regulatory compliance issues'
    ],
    detectionMethods: [
      'Cross-chain transaction monitoring',
      'Bridge activity analysis',
      'Pattern recognition algorithms',
      'Suspicious address clustering'
    ],
    mitigationSteps: [
      'Enhanced bridge surveillance',
      'Multi-chain analytics tools',
      'International cooperation frameworks',
      'Standardized reporting protocols'
    ],
    realWorldExamples: [
      'Ronin Bridge $625M hack (2022)',
      'Wormhole Bridge $320M exploit',
      'Poly Network $610M attack'
    ]
  },
  {
    id: '3',
    name: 'AI-Generated Crypto Scams',
    description: 'Using artificial intelligence to create sophisticated fraud schemes',
    type: 'operational',
    countermeasures: ['ai-detection', 'pattern-recognition'],
    timeline: 'Immediate concern',
    impact: [
      'Highly convincing social engineering',
      'Automated scam operations',
      'Targeted victim profiling',
      'Rapid scam adaptation'
    ],
    detectionMethods: [
      'AI-powered fraud detection',
      'Behavioral analysis',
      'Natural language processing',
      'Social media monitoring'
    ],
    mitigationSteps: [
      'AI-based defense systems',
      'Public awareness campaigns',
      'Real-time scam reporting',
      'Platform security measures'
    ],
    realWorldExamples: [
      'DeepFake CEO crypto scams',
      'AI-generated phishing campaigns',
      'Automated trading manipulation'
    ]
  }
];

const countermeasures: Countermeasure[] = [
  {
    id: 'quantum-resistant',
    name: 'Quantum-Resistant Cryptography',
    description: 'Implement post-quantum cryptographic algorithms',
    effectiveness: 'high',
    applicableThreats: ['1'],
    implementationTime: '2-3 years',
    resourceRequirements: [
      'Cryptography expertise',
      'Protocol upgrade infrastructure',
      'Testing environment',
      'Security audits'
    ],
    limitations: [
      'Early stage technology',
      'Performance overhead',
      'Complex implementation',
      'Limited real-world testing'
    ],
    successMetrics: [
      'Successful algorithm validation',
      'Security audit results',
      'Performance benchmarks',
      'Adoption rate'
    ]
  },
  {
    id: 'bridge-monitoring',
    name: 'Cross-Chain Bridge Monitoring',
    description: 'Track transactions across different blockchain networks',
    effectiveness: 'high',
    applicableThreats: ['2'],
    implementationTime: '6-12 months',
    resourceRequirements: [
      'Multi-chain analytics tools',
      'Bridge integration APIs',
      'Real-time monitoring systems',
      'Data storage infrastructure'
    ],
    limitations: [
      'Complex data correlation',
      'Privacy coin limitations',
      'Resource intensive',
      'Technical complexity'
    ],
    successMetrics: [
      'Transaction trace success rate',
      'Alert accuracy',
      'Response time',
      'Recovery rate'
    ]
  },
  {
    id: 'ai-detection',
    name: 'AI-Powered Fraud Detection',
    description: 'Use machine learning to identify scam patterns',
    effectiveness: 'medium',
    applicableThreats: ['3'],
    implementationTime: '3-6 months',
    resourceRequirements: [
      'ML expertise',
      'Training data',
      'Computing resources',
      'Model maintenance'
    ],
    limitations: [
      'False positives',
      'Model bias',
      'Requires constant updates',
      'Resource intensive'
    ],
    successMetrics: [
      'Detection accuracy',
      'False positive rate',
      'Response time',
      'Prevention rate'
    ]
  }
];

export function EmergingThreatsSimulator() {
  const { updateSimulationScore } = useProgress();
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [selectedCountermeasures, setSelectedCountermeasures] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState<'impact' | 'detection' | 'mitigation' | 'examples' | null>(null);
  const [showImplementation, setShowImplementation] = useState(false);

  const handleCountermeasureSelect = (countermeasureId: string) => {
    if (!submitted) {
      const newSelected = new Set(selectedCountermeasures);
      if (newSelected.has(countermeasureId)) {
        newSelected.delete(countermeasureId);
      } else {
        newSelected.add(countermeasureId);
      }
      setSelectedCountermeasures(newSelected);
    }
  };

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (selectedThreat) { 
      const { score } = calculateEffectiveness();
      updateSimulationScore('emerging_threats', score); 
    }
  };

  const handleReset = () => {
    setSelectedCountermeasures(new Set());
    setSubmitted(false);
    setShowDetails(null);
    setShowImplementation(false);
  };

  const filteredThreats = threats.filter(threat =>
    threat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    threat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateEffectiveness = () => {
    const selected = Array.from(selectedCountermeasures).map(id => 
      countermeasures.find(c => c.id === id)!
    );

    const hasHighEffectiveness = selected.some(c => c.effectiveness === 'high');
    const hasMediumEffectiveness = selected.some(c => c.effectiveness === 'medium');
    const hasMultipleCountermeasures = selected.length > 1;

    let score = 0;
    if (hasHighEffectiveness) score += 50;
    if (hasMediumEffectiveness) score += 30;
    if (hasMultipleCountermeasures) score += 20;

    return {
      score,
      hasHighEffectiveness,
      hasMediumEffectiveness,
      comprehensive: hasMultipleCountermeasures
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Future Threats & Countermeasures Simulator
        </h3>
        <p className="text-gray-600">
          Analyze emerging cryptocurrency threats and select appropriate countermeasures.
          Learn to prepare for future challenges in crypto crime investigation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Threats List */}
        <div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search threats..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-4">
            {filteredThreats.map((threat) => (
              <button
                key={threat.id}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  selectedThreat?.id === threat.id
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => {
                  setSelectedThreat(threat);
                  setSelectedCountermeasures(new Set());
                  setSubmitted(false);
                  setShowDetails(null);
                  setShowImplementation(false);
                }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    threat.type === 'technical'
                      ? 'bg-purple-100'
                      : threat.type === 'financial'
                        ? 'bg-green-100'
                        : 'bg-blue-100'
                  }`}>
                    {threat.type === 'technical' ? (
                      <Lock className="w-5 h-5 text-purple-600" />
                    ) : threat.type === 'financial' ? (
                      <Database className="w-5 h-5 text-green-600" />
                    ) : (
                      <Brain className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{threat.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{threat.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        threat.type === 'technical'
                          ? 'bg-purple-100 text-purple-700'
                          : threat.type === 'financial'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                      }`}>
                        {threat.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">Timeline: {threat.timeline}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Threat Analysis & Countermeasures */}
        <div>
          {selectedThreat ? (
            <div className="space-y-6">
              {/* Threat Details */}
              <div className="space-y-4">
                <button
                  className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  onClick={() => setShowDetails(showDetails === 'impact' ? null : 'impact')}
                >
                  {showDetails === 'impact' ? 'Hide' : 'Show'} Impact Analysis
                </button>
                
                {showDetails === 'impact' && (
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h5 className="font-medium text-red-900 mb-2">Potential Impact:</h5>
                    <ul className="space-y-2">
                      {selectedThreat.impact.map((impact, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                          <span className="text-red-700">{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  onClick={() => setShowDetails(showDetails === 'detection' ? null : 'detection')}
                >
                  {showDetails === 'detection' ? 'Hide' : 'Show'} Detection Methods
                </button>
                
                {showDetails === 'detection' && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-2">How to Detect:</h5>
                    <ul className="space-y-2">
                      {selectedThreat.detectionMethods.map((method, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Search className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-blue-700">{method}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  onClick={() => setShowDetails(showDetails === 'mitigation' ? null : 'mitigation')}
                >
                  {showDetails === 'mitigation' ? 'Hide' : 'Show'} Mitigation Steps
                </button>
                
                {showDetails === 'mitigation' && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h5 className="font-medium text-green-900 mb-2">How to Mitigate:</h5>
                    <ul className="space-y-2">
                      {selectedThreat.mitigationSteps.map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-green-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedThreat.realWorldExamples && (
                  <>
                    <button
                      className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      onClick={() => setShowDetails(showDetails === 'examples' ? null : 'examples')}
                    >
                      {showDetails === 'examples' ? 'Hide' : 'Show'} Real-World Examples
                    </button>
                    
                    {showDetails === 'examples' && (
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h5 className="font-medium text-yellow-900 mb-2">Case Studies:</h5>
                        <ul className="space-y-2">
                          {selectedThreat.realWorldExamples.map((example, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Globe className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-1" />
                              <span className="text-yellow-700">{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Countermeasures */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Available Countermeasures:</h4>
                <div className="space-y-4">
                  {countermeasures
                    .filter(measure => measure.applicableThreats.includes(selectedThreat.id))
                    .map(measure => {
                      const isSelected = selectedCountermeasures.has(measure.id);
                      
                      return (
                        <div key={measure.id} className="space-y-4">
                          <button
                            className={`w-full text-left p-4 rounded-lg border transition-colors ${
                              isSelected
                                ? 'bg-blue-50 border-blue-200'
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                            onClick={() => handleCountermeasureSelect(measure.id)}
                            disabled={submitted}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                measure.effectiveness === 'high'
                                  ? 'bg-green-100'
                                  : measure.effectiveness === 'medium'
                                    ? 'bg-yellow-100'
                                    : 'bg-red-100'
                              }`}>
                                <Shield className={`w-5 h-5 ${
                                  measure.effectiveness === 'high'
                                    ? 'text-green-600'
                                    : measure.effectiveness === 'medium'
                                      ? 'text-yellow-600'
                                      : 'text-red-600'
                                }`} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h5 className="font-medium text-gray-900">{measure.name}</h5>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    measure.effectiveness === 'high'
                                      ? 'bg-green-100 text-green-700'
                                      : measure.effectiveness === 'medium'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-red-100 text-red-700'
                                  }`}>
                                    {measure.effectiveness.toUpperCase()} EFFECTIVENESS
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{measure.description}</p>
                                <div className="mt-2 text-sm text-gray-500">
                                  Implementation Time: {measure.implementationTime}
                                </div>
                              </div>
                            </div>
                          </button>

                          {isSelected && (
                            <div className="pl-4">
                              <button
                                className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                onClick={() => setShowImplementation(!showImplementation)}
                              >
                                {showImplementation ? 'Hide' : 'Show'} Implementation Details
                              </button>
                              
                              {showImplementation && (
                                <div className="mt-4 space-y-4">
                                  <div className="p-4 bg-gray-50 rounded-lg">
                                    <h6 className="font-medium text-gray-900 mb-2">Resource Requirements:</h6>
                                    <ul className="space-y-2">
                                      {measure.resourceRequirements.map((req, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                                          <span className="text-gray-600">{req}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="p-4 bg-gray-50 rounded-lg">
                                    <h6 className="font-medium text-gray-900 mb-2">Limitations:</h6>
                                    <ul className="space-y-2">
                                      {measure.limitations.map((limitation, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                          <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-1" />
                                          <span className="text-gray-600">{limitation}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="p-4 bg-gray-50 rounded-lg">
                                    <h6 className="font-medium text-gray-900 mb-2">Success Metrics:</h6>
                                    <ul className="space-y-2">
                                      {measure.successMetrics.map((metric, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                                          <span className="text-gray-600">{metric}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>

                {selectedCountermeasures.size > 0 && !submitted && (
                  <button
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={handleSubmit}
                  >
                    Analyze Countermeasure Selection
                  </button>
                )}
              </div>

              {/* Results */}
              {submitted && (
                <div>
                  {(() => {
                    const analysis = calculateEffectiveness();
                    return (
                      <div className={`rounded-lg p-4 border ${
                        analysis.score >= 90
                          ? 'bg-green-50 border-green-200'
                          : analysis.score >= 60
                            ? 'bg-yellow-50 border-yellow-200'
                            : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-start gap-3">
                          {analysis.score >= 90 ? (
                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                          ) : analysis.score >= 60 ? (
                            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                          )}
                          <div>
                            <h4 className={`font-medium ${
                              analysis.score >= 90
                                ? 'text-green-900'
                                : analysis.score >= 60
                                  ? 'text-yellow-900'
                                  : 'text-red-900'
                            }`}>
                              Countermeasure Analysis
                            </h4>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Effectiveness Score:</span>
                                <span className={`text-sm ${
                                  analysis.score >= 90
                                    ? 'text-green-700'
                                    : analysis.score >= 60
                                      ? 'text-yellow-700'
                                      : 'text-red-700'
                                }`}>
                                  {analysis.score}%
                                </span>
                              </div>
                              <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2">
                                  {analysis.hasHighEffectiveness ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-600" />
                                  )}
                                  <span>Includes high-effectiveness measures</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {analysis.comprehensive ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-600" />
                                  )}
                                  <span>Comprehensive coverage</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <button
                    className="w-full mt-4 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    onClick={handleReset}
                  >
                    Try Different Countermeasures
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2" />
                <p>Select a threat to analyze countermeasures</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}