import { useState } from 'react';
import { AlertTriangle, ArrowRight, Search, Shield, Building2, Wallet, Link } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: string;
  timestamp: string;
  type: 'suspicious' | 'normal';
  pattern: {
    name: string;
    description: string;
    indicators: string[];
    riskLevel: 'high' | 'medium' | 'low';
  };
  relatedTx?: string[];
  details: {
    fee: string;
    confirmations: number;
    exchangeInfo?: {
      name: string;
      kyc: boolean;
    };
  };
}

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    from: '0x742d...1a3b',
    to: '0x9f3c...4d2e',
    amount: '0.05 BTC',
    timestamp: '2025-03-01T10:00:00Z',
    type: 'suspicious',
    pattern: {
      name: 'Structuring',
      description: 'Multiple small transactions to different wallets in short time period',
      indicators: [
        'Multiple transactions under reporting threshold',
        'Different destination wallets',
        'Short time intervals',
        'Similar amounts'
      ],
      riskLevel: 'high'
    },
    relatedTx: ['2', '3'],
    details: {
      fee: '0.0001 BTC',
      confirmations: 6
    }
  },
  {
    id: '2',
    from: '0x742d...1a3b',
    to: '0x5e2b...8a1c',
    amount: '0.04 BTC',
    timestamp: '2025-03-01T10:02:00Z',
    type: 'suspicious',
    pattern: {
      name: 'Structuring',
      description: 'Part of a series of small transactions from same source',
      indicators: [
        'Same source wallet',
        'Amount below threshold',
        'Part of transaction series',
        'Coordinated timing'
      ],
      riskLevel: 'high'
    },
    relatedTx: ['1', '3'],
    details: {
      fee: '0.0001 BTC',
      confirmations: 6
    }
  },
  {
    id: '3',
    from: '0x742d...1a3b',
    to: '0x3a4d...7f2e',
    amount: '0.03 BTC',
    timestamp: '2025-03-01T10:04:00Z',
    type: 'suspicious',
    pattern: {
      name: 'Structuring',
      description: 'Final transaction in structuring pattern',
      indicators: [
        'Completes pattern series',
        'Similar characteristics',
        'Known structuring wallet',
        'Timed sequence'
      ],
      riskLevel: 'high'
    },
    relatedTx: ['1', '2'],
    details: {
      fee: '0.0001 BTC',
      confirmations: 6
    }
  },
  {
    id: '4',
    from: 'Binance',
    to: '0x1234...5678',
    amount: '5.0 BTC',
    timestamp: '2025-03-01T11:00:00Z',
    type: 'normal',
    pattern: {
      name: 'Exchange Withdrawal',
      description: 'Large but legitimate exchange withdrawal',
      indicators: [
        'Known exchange source',
        'KYC verified account',
        'Normal withdrawal amount',
        'Regular pattern'
      ],
      riskLevel: 'low'
    },
    details: {
      fee: '0.0002 BTC',
      confirmations: 12,
      exchangeInfo: {
        name: 'Binance',
        kyc: true
      }
    }
  },
  {
    id: '5',
    from: '0xabcd...efgh',
    to: 'Mixer Service',
    amount: '10.0 BTC',
    timestamp: '2025-03-01T12:00:00Z',
    type: 'suspicious',
    pattern: {
      name: 'Mixer Usage',
      description: 'Large amount sent to known cryptocurrency mixer',
      indicators: [
        'High-risk service used',
        'Large transaction amount',
        'Privacy-seeking behavior',
        'No clear business purpose'
      ],
      riskLevel: 'high'
    },
    details: {
      fee: '0.0005 BTC',
      confirmations: 3
    }
  }
];

export function TransactionPatternGame() {
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [score, setScore] = useState(0);
  const [showRelated, setShowRelated] = useState(false);
  const { updateSimulationScore } = useProgress();

  const handleTransactionSelect = (id: string) => {
    if (!submitted) {
      const newSelected = new Set(selectedTransactions);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      setSelectedTransactions(newSelected);
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    sampleTransactions.forEach(transaction => {
      if (
        (transaction.type === 'suspicious' && selectedTransactions.has(transaction.id)) ||
        (transaction.type === 'normal' && !selectedTransactions.has(transaction.id))
      ) {
        correct++;
      }
    });
    const finalScore = (correct / sampleTransactions.length) * 100;
    setScore(finalScore);
    setSubmitted(true);
    updateSimulationScore('transaction_pattern', finalScore);
  };

  const handleReset = () => {
    setSelectedTransactions(new Set());
    setSubmitted(false);
    setScore(0);
    setSelectedTx(null);
    setShowRelated(false);
  };

  const getRelatedTransactions = (tx: Transaction) => {
    if (!tx.relatedTx) return [];
    return sampleTransactions.filter(t => tx.relatedTx?.includes(t.id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Transaction Pattern Recognition Exercise
        </h3>
        <p className="text-gray-600">
          Analyze these transactions and identify patterns that might indicate criminal activity.
          Look for related transactions and common money laundering techniques.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transaction List */}
        <div className="space-y-4">
          {sampleTransactions.map(tx => {
            const isSelected = selectedTransactions.has(tx.id);
            const isCorrect = submitted && (
              (tx.type === 'suspicious' && isSelected) ||
              (tx.type === 'normal' && !isSelected)
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
                    {tx.details.exchangeInfo ? (
                      <Building2 className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Wallet className="w-5 h-5 text-gray-500" />
                    )}
                    <span className="font-medium text-gray-900">Transaction {tx.id}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    tx.pattern.riskLevel === 'high'
                      ? 'bg-red-100 text-red-700'
                      : tx.pattern.riskLevel === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                  }`}>
                    {tx.pattern.riskLevel.toUpperCase()} RISK
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <div className="text-sm font-medium text-gray-500">From</div>
                    <div className="font-mono text-sm text-gray-900">{tx.from}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">To</div>
                    <div className="font-mono text-sm text-gray-900">{tx.to}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Amount</div>
                    <div className="text-gray-900">{tx.amount}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Time</div>
                    <div className="text-gray-900">
                      {new Date(tx.timestamp).toLocaleTimeString()}
                    </div>
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

        {/* Pattern Analysis */}
        <div>
          {selectedTx ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">{selectedTx.pattern.name}</h4>
                <p className="text-gray-600 mb-4">{selectedTx.pattern.description}</p>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-900">Risk Indicators:</h5>
                  {selectedTx.pattern.indicators.map((indicator, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{indicator}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTx.relatedTx && (
                <div>
                  <button
                    onClick={() => setShowRelated(!showRelated)}
                    className="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {showRelated ? 'Hide' : 'Show'} Related Transactions
                  </button>

                  {showRelated && (
                    <div className="mt-4 space-y-4">
                      {getRelatedTransactions(selectedTx).map(tx => (
                        <div key={tx.id} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Link className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-blue-900">Transaction {tx.id}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <div className="text-blue-800">From:</div>
                              <div className="font-mono text-blue-900">{tx.from}</div>
                            </div>
                            <div>
                              <div className="text-blue-800">To:</div>
                              <div className="font-mono text-blue-900">{tx.to}</div>
                            </div>
                            <div>
                              <div className="text-blue-800">Amount:</div>
                              <div className="text-blue-900">{tx.amount}</div>
                            </div>
                            <div>
                              <div className="text-blue-800">Time:</div>
                              <div className="text-blue-900">
                                {new Date(tx.timestamp).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {selectedTx.details.exchangeInfo && (
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-medium text-green-900 mb-3">Exchange Information:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-green-600" />
                      <span className="text-green-800">
                        Exchange: {selectedTx.details.exchangeInfo.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-green-800">
                        KYC Status: {selectedTx.details.exchangeInfo.kyc ? 'Verified' : 'Unverified'}
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
                <p>Select a transaction to analyze patterns</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
        <div>
          {submitted && (
            <div className="text-gray-900">
              Score: {score.toFixed(0)}% ({Math.round(score * sampleTransactions.length / 100)} / {sampleTransactions.length} correct)
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
        <h4 className="font-medium text-blue-900 mb-2">Pattern Recognition Tips:</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Look for multiple related transactions that could indicate structuring
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Pay attention to timing patterns and transaction amounts
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Consider the use of high-risk services like mixers
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Verify exchange transactions against KYC status
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}