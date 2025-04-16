import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, ArrowRight, Database, Search, Globe } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  category: 'blockchain' | 'cyber' | 'financial';
  description: string;
  features: string[];
  cost: number;
  trainingRequired: number; // hours
  courtAdmissible: boolean;
}

const availableTools: Tool[] = [
  {
    id: '1',
    name: 'Chainalysis Reactor',
    category: 'blockchain',
    description: 'Advanced blockchain analysis platform for tracing cryptocurrency transactions',
    features: [
      'Transaction visualization',
      'Wallet clustering',
      'Risk scoring',
      'Exchange attribution'
    ],
    cost: 50000,
    trainingRequired: 40,
    courtAdmissible: true
  },
  {
    id: '2',
    name: 'Maltego',
    category: 'cyber',
    description: 'OSINT and graphical link analysis tool for investigations',
    features: [
      'Data visualization',
      'Entity correlation',
      'Social network analysis',
      'Cryptocurrency transforms'
    ],
    cost: 15000,
    trainingRequired: 20,
    courtAdmissible: true
  },
  {
    id: '3',
    name: 'CipherTrace',
    category: 'blockchain',
    description: 'Cryptocurrency intelligence platform for compliance and investigations',
    features: [
      'Transaction monitoring',
      'Risk assessment',
      'Regulatory reporting',
      'Exchange integration'
    ],
    cost: 40000,
    trainingRequired: 30,
    courtAdmissible: true
  },
  {
    id: '4',
    name: 'Cellebrite UFED',
    category: 'cyber',
    description: 'Mobile device forensics platform',
    features: [
      'Wallet app extraction',
      'Key recovery',
      'Transaction history',
      'Chat analysis'
    ],
    cost: 25000,
    trainingRequired: 25,
    courtAdmissible: true
  },
  {
    id: '5',
    name: 'AMLBot',
    category: 'financial',
    description: 'Anti-money laundering analysis tool',
    features: [
      'Transaction screening',
      'Risk scoring',
      'Alert generation',
      'Compliance reporting'
    ],
    cost: 20000,
    trainingRequired: 15,
    courtAdmissible: true
  }
];

export function ToolSelectionSimulator() {
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set());
  const [budget, setBudget] = useState(100000);
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToolSelect = (toolId: string) => {
    const tool = availableTools.find(t => t.id === toolId);
    if (!tool) return;

    const newSelected = new Set(selectedTools);
    if (newSelected.has(toolId)) {
      newSelected.delete(toolId);
      setBudget(prev => prev + tool.cost);
    } else if (tool.cost <= budget) {
      newSelected.add(toolId);
      setBudget(prev => prev - tool.cost);
    }
    setSelectedTools(newSelected);
  };

  const calculateEffectiveness = () => {
    const selected = Array.from(selectedTools).map(id => 
      availableTools.find(t => t.id === id)!
    );

    // Check if we have at least one tool from each category
    const hasBlockchain = selected.some(t => t.category === 'blockchain');
    const hasCyber = selected.some(t => t.category === 'cyber');
    const hasFinancial = selected.some(t => t.category === 'financial');

    // Check if all tools are court admissible
    const allAdmissible = selected.every(t => t.courtAdmissible);

    // Calculate total training time
    const totalTraining = selected.reduce((sum, tool) => sum + tool.trainingRequired, 0);

    return {
      score: (hasBlockchain ? 33 : 0) + (hasCyber ? 33 : 0) + (hasFinancial ? 34 : 0),
      balanced: hasBlockchain && hasCyber && hasFinancial,
      admissible: allAdmissible,
      training: totalTraining
    };
  };

  const filteredTools = availableTools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Forensic Tool Selection
        </h3>
        <p className="text-gray-600">
          Choose the right combination of blockchain analysis tools, cybercrime
          investigation software, and forensic equipment for your unit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tool Selection */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Available Tools:</h4>
            <div className="text-sm text-gray-600">
              Budget: <span className="font-medium">${budget.toLocaleString()}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-4">
            {filteredTools.map(tool => {
              const isSelected = selectedTools.has(tool.id);
              const canAfford = tool.cost <= budget || isSelected;
              
              return (
                <button
                  key={tool.id}
                  className={`w-full p-4 text-left rounded-lg border transition-colors ${
                    isSelected
                      ? 'bg-blue-50 border-blue-200'
                      : canAfford
                        ? 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        : 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => canAfford && handleToolSelect(tool.id)}
                  disabled={!canAfford && !isSelected}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {tool.category === 'blockchain' ? (
                        <Database className="w-5 h-5 text-blue-600" />
                      ) : tool.category === 'cyber' ? (
                        <Shield className="w-5 h-5 text-purple-600" />
                      ) : (
                        <Globe className="w-5 h-5 text-green-600" />
                      )}
                      <h5 className="font-medium text-gray-900">{tool.name}</h5>
                    </div>
                    <span className="text-sm text-gray-600">${tool.cost.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {tool.features.map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-gray-600">
                        Training: {tool.trainingRequired}h
                      </div>
                      {tool.courtAdmissible && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Court Admissible</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedTools.size > 0 && !showResults && (
            <button
              className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setShowResults(true)}
            >
              Analyze Tool Selection
            </button>
          )}
        </div>

        {/* Analysis & Results */}
        <div>
          {showResults ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Selected Tools:</h4>
                <div className="space-y-3">
                  {Array.from(selectedTools).map(toolId => {
                    const tool = availableTools.find(t => t.id === toolId)!;
                    return (
                      <div
                        key={toolId}
                        className="flex items-center justify-between p-3 bg-white rounded border border-gray-200"
                      >
                        <div className="flex items-center gap-2">
                          {tool.category === 'blockchain' ? (
                            <Database className="w-4 h-4 text-blue-600" />
                          ) : tool.category === 'cyber' ? (
                            <Shield className="w-4 h-4 text-purple-600" />
                          ) : (
                            <Globe className="w-4 h-4 text-green-600" />
                          )}
                          <span className="text-gray-900">{tool.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          ${tool.cost.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Effectiveness Analysis */}
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
                          Tool Selection Analysis
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
                              {analysis.balanced ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                              <span>Balanced coverage across categories</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {analysis.admissible ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                              <span>All tools court admissible</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-gray-600" />
                              <span>Total training required: {analysis.training}h</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <button
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={() => {
                  setShowResults(false);
                  setSelectedTools(new Set());
                  setBudget(100000);
                }}
              >
                Start Over
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2" />
                <p>Select tools to analyze effectiveness</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}