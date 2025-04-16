import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, FileText, ArrowRight, Search } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  amount: string;
  type: string;
  source: string;
  destination: string;
  flags: string[];
  requiresSAR: boolean;
}

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-03-01',
    amount: '$50,000',
    type: 'Crypto Exchange Deposit',
    source: 'Multiple Unidentified Wallets',
    destination: 'Bank Account #1234',
    flags: [
      'Multiple small deposits consolidated',
      'Known mixer wallet involvement',
      'Unusual transaction pattern'
    ],
    requiresSAR: true
  },
  {
    id: '2',
    date: '2025-03-02',
    amount: '$5,000',
    type: 'Wire Transfer',
    source: 'Bank Account #5678',
    destination: 'Crypto Exchange',
    flags: [
      'Regular customer',
      'Known source of funds',
      'Normal trading pattern'
    ],
    requiresSAR: false
  },
  {
    id: '3',
    date: '2025-03-03',
    amount: '$75,000',
    type: 'Crypto Exchange Withdrawal',
    source: 'Exchange Account',
    destination: 'Multiple Bank Accounts',
    flags: [
      'Structured withdrawals',
      'High-risk jurisdiction transfers',
      'No clear business purpose'
    ],
    requiresSAR: true
  }
];

export function SarFilingExercise() {
  const [decisions, setDecisions] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const handleDecision = (txId: string, decision: boolean) => {
    if (!submitted) {
      setDecisions(prev => ({
        ...prev,
        [txId]: decision
      }));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setDecisions({});
    setSubmitted(false);
    setSelectedTx(null);
  };

  const getScore = () => {
    return Object.entries(decisions).reduce((score, [txId, decision]) => {
      const tx = sampleTransactions.find(t => t.id === txId);
      return score + (tx?.requiresSAR === decision ? 1 : 0);
    }, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Suspicious Activity Report (SAR) Filing Exercise
        </h3>
        <p className="text-gray-600">
          Review the following transactions and determine if they require a SAR filing.
          Consider transaction patterns, amounts, and risk factors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transaction List */}
        <div className="space-y-4">
          {sampleTransactions.map((tx) => {
            const hasDecision = decisions[tx.id] !== undefined;
            const isCorrect = submitted && decisions[tx.id] === tx.requiresSAR;

            return (
              <div
                key={tx.id}
                className={`p-4 rounded-lg border cursor-pointer ${
                  submitted
                    ? isCorrect
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                    : selectedTx?.id === tx.id
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-gray-50 border-gray-200'
                }`}
                onClick={() => setSelectedTx(tx)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Transaction #{tx.id}</h4>
                  {submitted && (
                    isCorrect
                      ? <CheckCircle className="w-5 h-5 text-green-600" />
                      : <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <div className="text-gray-500">Date</div>
                    <div>{tx.date}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Amount</div>
                    <div>{tx.amount}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Type</div>
                    <div>{tx.type}</div>
                  </div>
                </div>
                {!submitted && (
                  <div className="flex gap-2">
                    <button
                      className={`flex-1 px-3 py-1 rounded text-sm font-medium ${
                        decisions[tx.id] === true
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecision(tx.id, true);
                      }}
                    >
                      File SAR
                    </button>
                    <button
                      className={`flex-1 px-3 py-1 rounded text-sm font-medium ${
                        decisions[tx.id] === false
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecision(tx.id, false);
                      }}
                    >
                      No SAR
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Transaction Details */}
        <div>
          {selectedTx ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Transaction Details</h4>
                  <p className="text-gray-600">Review the transaction information and risk factors</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Transaction Flow:</h5>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{selectedTx.source}</span>
                    <ArrowRight className="w-4 h-4" />
                    <span>{selectedTx.destination}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Risk Factors:</h5>
                  <ul className="space-y-2">
                    {selectedTx.flags.map((flag, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                        <span className="text-gray-600">{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {submitted && (
                  <div className={`p-4 rounded-lg ${
                    selectedTx.requiresSAR
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-green-50 border border-green-200'
                  }`}>
                    <h5 className={`font-medium ${
                      selectedTx.requiresSAR ? 'text-red-900' : 'text-green-900'
                    } mb-2`}>
                      Correct Action:
                    </h5>
                    <p className={
                      selectedTx.requiresSAR ? 'text-red-700' : 'text-green-700'
                    }>
                      {selectedTx.requiresSAR
                        ? 'This transaction requires SAR filing due to suspicious patterns and high-risk indicators.'
                        : 'No SAR required. Transaction appears to be legitimate with clear source of funds.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Search className="w-8 h-8 mx-auto mb-2" />
                <p>Select a transaction to review details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
        <div>
          {submitted && (
            <div className="text-gray-900">
              Score: {getScore()} / {sampleTransactions.length} correct
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
              disabled={Object.keys(decisions).length !== sampleTransactions.length}
            >
              Submit Decisions
            </button>
          )}
        </div>
      </div>
    </div>
  );
}