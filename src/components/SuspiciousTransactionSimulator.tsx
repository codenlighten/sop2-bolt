import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Search, ArrowRight, Shield, Database, Building2, Wallet, Globe, Link, FileText } from 'lucide-react';

interface Transaction {
  id: string;
  senderWallet: string;
  receiverWallet: string;
  amount: string;
  date: string;
  type: string;
  riskIndicators: string[];
  riskLevel: 'high' | 'medium' | 'low';
  patternType: string;
  relatedTransactions?: string[];
  exchangeData?: {
    platform: string;
    kyc: boolean;
    jurisdiction: string;
  };
  technicalDetails: {
    blockHeight: number;
    confirmations: number;
    fee: string;
    protocol: string;
  };
  investigationNotes: string[];
  isSuspicious: boolean;
}

const transactions: Transaction[] = [
  {
    id: 'TX001',
    senderWallet: '1A1zP1...QGefi2',
    receiverWallet: 'Mixer Service',
    amount: '10.0 BTC',
    date: '2025-05-01',
    type: 'Mixer Transfer',
    riskIndicators: [
      'Large amount sent to known mixer',
      'Multiple outputs planned',
      'High-risk service used',
      'Previous darknet market interactions',
      'Complex wallet clustering pattern'
    ],
    riskLevel: 'high',
    patternType: 'Money Laundering',
    relatedTransactions: ['TX002', 'TX003'],
    technicalDetails: {
      blockHeight: 800001,
      confirmations: 6,
      fee: '0.0005 BTC',
      protocol: 'Bitcoin'
    },
    investigationNotes: [
      'Wallet linked to previous ransomware case',
      'Multiple mixer services used in sequence',
      'Attempt to break transaction trail'
    ],
    isSuspicious: true
  },
  {
    id: 'TX002',
    senderWallet: 'Binance',
    receiverWallet: '3J98t1...Wn4Cfg',
    amount: '0.5 BTC',
    date: '2025-05-01',
    type: 'Exchange Withdrawal',
    riskIndicators: [
      'KYC verified withdrawal',
      'Regular trading pattern',
      'Known exchange source',
      'Normal transaction size'
    ],
    riskLevel: 'low',
    patternType: 'Normal Trading',
    exchangeData: {
      platform: 'Binance',
      kyc: true,
      jurisdiction: 'US'
    },
    technicalDetails: {
      blockHeight: 800002,
      confirmations: 15,
      fee: '0.0002 BTC',
      protocol: 'Bitcoin'
    },
    investigationNotes: [
      'Regular trading activity',
      'Verified exchange account',
      'No suspicious patterns'
    ],
    isSuspicious: false
  },
  {
    id: 'TX003',
    senderWallet: '1Draq2...3fwYhM',
    receiverWallet: 'Dark Market',
    amount: '5.0 BTC',
    date: '2025-05-02',
    type: 'Market Transfer',
    riskIndicators: [
      'Known illicit marketplace',
      'High-value transfer',
      'Suspicious wallet history',
      'Multiple small inputs combined',
      'Privacy coin conversion attempt'
    ],
    riskLevel: 'high',
    patternType: 'Illicit Trade',
    relatedTransactions: ['TX001'],
    technicalDetails: {
      blockHeight: 800005,
      confirmations: 3,
      fee: '0.0008 BTC',
      protocol: 'Bitcoin'
    },
    investigationNotes: [
      'Wallet associated with dark market vendor',
      'Pattern matches drug trafficking',
      'Multiple jurisdiction involvement'
    ],
    isSuspicious: true
  },
  {
    id: 'TX004',
    senderWallet: '1BvBMD...2HUQY',
    receiverWallet: '3QJmnh...K8zpCP',
    amount: '0.1 BTC',
    date: '2025-05-02',
    type: 'P2P Transfer',
    riskIndicators: [
      'Small value transfer',
      'Known personal wallets',
      'Regular transaction pattern',
      'Clear transaction purpose'
    ],
    riskLevel: 'low',
    patternType: 'Personal Transfer',
    technicalDetails: {
      blockHeight: 800007,
      confirmations: 12,
      fee: '0.0001 BTC',
      protocol: 'Bitcoin'
    },
    investigationNotes: [
      'Regular P2P transaction',
      'Both wallets have clean history',
      'Normal usage pattern'
    ],
    isSuspicious: false
  },
  {
    id: 'TX005',
    senderWallet: 'Multiple Sources',
    receiverWallet: '1MKXuF...9iYrZo',
    amount: '2.5 BTC',
    date: '2025-05-03',
    type: 'Consolidation',
    riskIndicators: [
      'Multiple small inputs',
      'Structured transactions',
      'Pattern of layering',
      'Privacy-focused behavior',
      'Known high-risk addresses'
    ],
    riskLevel: 'high',
    patternType: 'Structuring',
    relatedTransactions: ['TX001', 'TX003'],
    technicalDetails: {
      blockHeight: 800010,
      confirmations: 2,
      fee: '0.0003 BTC',
      protocol: 'Bitcoin'
    },
    investigationNotes: [
      'Classic structuring pattern',
      'Attempt to avoid detection thresholds',
      'Connected to multiple suspicious addresses'
    ],
    isSuspicious: true
  }
];

export function SuspiciousTransactionSimulator() {
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [score, setScore] = useState(0);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [showInvestigationNotes, setShowInvestigationNotes] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTransactionSelect = (txId: string) => {
    if (!submitted) {
      const newSelected = new Set(selectedTransactions);
      if (newSelected.has(txId)) {
        newSelected.delete(txId);
      } else {
        newSelected.add(txId);
      }
      setSelectedTransactions(newSelected);
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    transactions.forEach(tx => {
      if (
        (tx.isSuspicious && selectedTransactions.has(tx.id)) ||
        (!tx.isSuspicious && !selectedTransactions.has(tx.id))
      ) {
        correct++;
      }
    });
    setScore((correct / transactions.length) * 100);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedTransactions(new Set());
    setSubmitted(false);
    setScore(0);
    setSelectedTx(null);
    setShowTechnicalDetails(false);
    setShowInvestigationNotes(false);
  };

  const filteredTransactions = transactions.filter(tx =>
    tx.senderWallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.receiverWallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.amount.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Suspicious Transaction Analysis
        </h3>
        <p className="text-gray-600">
          Review these cryptocurrency transactions and identify suspicious patterns that might indicate
          criminal activity. Flag any transactions that require further investigation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transaction List */}
        <div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-4">
            {filteredTransactions.map(tx => {
              const isSelected = selectedTransactions.has(tx.id);
              const isCorrect = submitted && (
                (tx.isSuspicious && isSelected) ||
                (!tx.isSuspicious && !isSelected)
              );
              
              return (
                <div
                  key={tx.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    submitted
                      ? isCorrect
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                      : isSelected
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setSelectedTx(tx);
                    if (!submitted) handleTransactionSelect(tx.id);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {tx.type === 'Mixer Transfer' ? (
                        <Globe className="w-5 h-5 text-gray-500" />
                      ) : tx.type === 'Exchange Withdrawal' ? (
                        <Building2 className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Wallet className="w-5 h-5 text-gray-500" />
                      )}
                      <span className="font-medium text-gray-900">Transaction {tx.id}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getRiskLevelColor(tx.riskLevel)}`}>
                      {tx.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <div className="text-sm font-medium text-gray-500">From</div>
                      <div className="font-mono text-sm text-gray-900">{tx.senderWallet}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">To</div>
                      <div className="font-mono text-sm text-gray-900">{tx.receiverWallet}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Amount</div>
                      <div className="text-gray-900">{tx.amount}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Type</div>
                      <div className="text-gray-900">{tx.type}</div>
                    </div>
                  </div>

                  {!submitted && (
                    <button
                      className={`w-full mt-2 px-3 py-1 rounded text-sm font-medium ${
                        isSelected
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTransactionSelect(tx.id);
                      }}
                    >
                      {isSelected ? 'Flagged as Suspicious' : 'Flag as Suspicious'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Transaction Analysis */}
        <div>
          {selectedTx ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Risk Analysis:</h4>
                <div className="space-y-3">
                  {selectedTx.riskIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{indicator}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                  className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 mb-3"
                >
                  {showTechnicalDetails ? 'Hide' : 'Show'} Technical Details
                </button>

                {showTechnicalDetails && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-3">Technical Information:</h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-blue-800">Block Height:</div>
                        <div className="font-mono text-blue-900">
                          #{selectedTx.technicalDetails.blockHeight}
                        </div>
                      </div>
                      <div>
                        <div className="text-blue-800">Confirmations:</div>
                        <div className="text-blue-900">
                          {selectedTx.technicalDetails.confirmations}
                        </div>
                      </div>
                      <div>
                        <div className="text-blue-800">Network Fee:</div>
                        <div className="text-blue-900">
                          {selectedTx.technicalDetails.fee}
                        </div>
                      </div>
                      <div>
                        <div className="text-blue-800">Protocol:</div>
                        <div className="text-blue-900">
                          {selectedTx.technicalDetails.protocol}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowInvestigationNotes(!showInvestigationNotes)}
                  className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 mt-3"
                >
                  {showInvestigationNotes ? 'Hide' : 'Show'} Investigation Notes
                </button>

                {showInvestigationNotes && (
                  <div className="mt-3 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h5 className="font-medium text-yellow-900 mb-3">Investigation Notes:</h5>
                    <div className="space-y-2">
                      {selectedTx.investigationNotes.map((note, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-yellow-700 flex-shrink-0 mt-1" />
                          <span className="text-yellow-800">{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedTx.relatedTransactions && (
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-3">Related Transactions:</h4>
                  <div className="space-y-2">
                    {selectedTx.relatedTransactions.map((txId, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Link className="w-4 h-4 text-purple-600" />
                        <span className="text-purple-800">Transaction {txId}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTx.exchangeData && (
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-medium text-green-900 mb-3">Exchange Information:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-green-600" />
                      <span className="text-green-800">Platform: {selectedTx.exchangeData.platform}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-green-800">
                        KYC Status: {selectedTx.exchangeData.kyc ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-green-600" />
                      <span className="text-green-800">
                        Jurisdiction: {selectedTx.exchangeData.jurisdiction}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Search className="w-8 h-8 mx-auto mb-2" />
                <p>Select a transaction to analyze details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
        <div>
          {submitted && (
            <div className="text-gray-900">
              Score: {score.toFixed(0)}% ({Math.round(score * transactions.length / 100)} / {transactions.length} correct)
            </div>
          )}
        </div>
        <div>
          {submitted ? (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Check Answers
            </button>
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
              Look for transactions involving known high-risk services like mixers
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Monitor patterns of multiple small transactions that could indicate structuring
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Pay attention to transactions with known dark market addresses
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Consider the context of related transactions and wallet histories
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}