import React, { useState } from 'react';
import { Brain, AlertTriangle, CheckCircle, XCircle, ArrowRight, DollarSign, Wallet, BarChart, Zap } from 'lucide-react';

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: string;
  country: string;
  date: string;
  type: string;
  riskLevel: 'high' | 'medium' | 'low';
  riskFactors: string[];
  explanation: string;
}

const riskThresholds = {
  amount: {
    high: 100000,
    medium: 50000
  },
  countries: {
    high: ['Switzerland', 'Cayman Islands', 'Malta'],
    medium: ['Singapore', 'Hong Kong', 'Luxembourg']
  }
};

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    from: '0x742d...1a3b',
    to: 'Swiss Bank Account #1234',
    amount: '$150,000',
    country: 'Switzerland',
    date: '2025-05-01',
    type: 'Crypto-to-Fiat',
    riskLevel: 'high',
    riskFactors: [
      'Large amount over $100,000',
      'High-risk jurisdiction',
      'Multiple prior mixer transactions',
      'Rapid conversion pattern'
    ],
    explanation: 'Transaction shows classic signs of money laundering: large amount, high-risk jurisdiction, and suspicious wallet history.'
  },
  {
    id: '2',
    from: '0x9f3c...4d2e',
    to: 'Bank Account #5678',
    amount: '$25,000',
    country: 'United States',
    date: '2025-05-01',
    type: 'Exchange Withdrawal',
    riskLevel: 'low',
    riskFactors: [
      'Moderate amount',
      'Known exchange source',
      'Regular trading pattern',
      'Compliant jurisdiction'
    ],
    explanation: 'Normal withdrawal pattern from regulated exchange to verified bank account.'
  },
  {
    id: '3',
    from: '0x5e2b...8a1c',
    to: 'Cayman Bank #9012',
    amount: '$75,000',
    country: 'Cayman Islands',
    date: '2025-05-02',
    type: 'Crypto-to-Fiat',
    riskLevel: 'medium',
    riskFactors: [
      'Significant amount',
      'Offshore jurisdiction',
      'Multiple wallet hops',
      'Structured deposits'
    ],
    explanation: 'Amount and jurisdiction raise concerns, but transaction pattern shows some legitimate indicators.'
  }
];

export function BankingTransactionAI() {
  const [walletAddress, setWalletAddress] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [country, setCountry] = useState('');
  const [analysis, setAnalysis] = useState<Transaction | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const analyzeTransaction = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert amount to numeric value, removing currency symbols and commas
    const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
    const riskFactorsList: string[] = [];
    let riskLevel: Transaction['riskLevel'] = 'low';

    // Amount analysis
    if (numericAmount >= riskThresholds.amount.high) {
      riskFactorsList.push('Large amount over $100,000');
      riskLevel = 'high';
    } else if (numericAmount >= riskThresholds.amount.medium) {
      riskFactorsList.push('Significant amount over $50,000');
      riskLevel = 'medium';
    }

    // Country analysis
    if (riskThresholds.countries.high.includes(country)) {
      riskFactorsList.push('High-risk jurisdiction');
      riskLevel = 'high';
    } else if (riskThresholds.countries.medium.includes(country)) {
      riskFactorsList.push('Medium-risk jurisdiction');
      if (riskLevel !== 'high') {
        riskLevel = 'medium';
      }
    }

    // Simulated wallet history analysis
    if (walletAddress.startsWith('0x742d')) {
      riskFactorsList.push('Wallet linked to previous suspicious activity');
      riskLevel = 'high';
    }

    const newAnalysis: Transaction = {
      id: Date.now().toString(),
      from: walletAddress,
      to: bankAccount,
      amount: `$${numericAmount.toLocaleString()}`,
      country,
      date: new Date().toISOString().split('T')[0],
      type: 'Crypto-to-Fiat',
      riskLevel,
      riskFactors: riskFactorsList,
      explanation: riskLevel === 'high'
        ? 'Transaction exhibits multiple high-risk indicators suggesting potential money laundering.'
        : riskLevel === 'medium'
          ? 'Some risk factors present but not conclusive evidence of illicit activity.'
          : 'Transaction appears to follow normal patterns with low risk indicators.'
    };

    setAnalysis(newAnalysis);
    setShowExplanation(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          AI Transaction Risk Analysis
        </h3>
        <p className="text-gray-600">
          Input crypto-to-fiat transaction details for AI risk assessment based on amount,
          jurisdiction, and wallet history patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Form */}
        <div>
          <form onSubmit={analyzeTransaction} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source Wallet Address
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="e.g., 0x742d...1a3b"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination Bank Account
              </label>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                placeholder="e.g., CH93-0000-0000-0000"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (USD)
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g., 100000"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a country</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Singapore">Singapore</option>
                <option value="United States">United States</option>
                <option value="Malta">Malta</option>
                <option value="Hong Kong">Hong Kong</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Analyze Transaction
            </button>
          </form>

          {/* Sample Transactions */}
          <div className="mt-8">
            <h4 className="font-medium text-gray-900 mb-4">Sample Transactions:</h4>
            <div className="space-y-4">
              {sampleTransactions.map(tx => (
                <button
                  key={tx.id}
                  className="w-full p-4 text-left bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100"
                  onClick={() => {
                    setWalletAddress(tx.from);
                    setBankAccount(tx.to);
                    setAmount(tx.amount);
                    setCountry(tx.country);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-900">{tx.amount}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tx.riskLevel === 'high'
                        ? 'bg-red-100 text-red-700'
                        : tx.riskLevel === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                    }`}>
                      {tx.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {tx.from} → {tx.to}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <div>
          {analysis ? (
            <div className="space-y-6">
              <div className={`p-4 rounded-lg ${
                analysis.riskLevel === 'high'
                  ? 'bg-red-50 border border-red-200'
                  : analysis.riskLevel === 'medium'
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-green-50 border border-green-200'
              }`}>
                <div className="flex items-start gap-3">
                  {analysis.riskLevel === 'high' ? (
                    <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  ) : analysis.riskLevel === 'medium' ? (
                    <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className={`font-medium ${
                      analysis.riskLevel === 'high'
                        ? 'text-red-900'
                        : analysis.riskLevel === 'medium'
                          ? 'text-yellow-900'
                          : 'text-green-900'
                    }`}>
                      {analysis.riskLevel === 'high'
                        ? 'High Risk Transaction Detected'
                        : analysis.riskLevel === 'medium'
                          ? 'Medium Risk Indicators Present'
                          : 'Low Risk Transaction'
                    }
                    </h4>
                    <p className={
                      analysis.riskLevel === 'high'
                        ? 'text-red-700'
                        : analysis.riskLevel === 'medium'
                          ? 'text-yellow-700'
                          : 'text-green-700'
                    }>
                      {analysis.explanation}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-4">Risk Factors:</h4>
                <ul className="space-y-2">
                  {analysis.riskFactors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                onClick={() => setShowExplanation(!showExplanation)}
              >
                {showExplanation ? 'Hide' : 'Show'} AI Analysis Explanation
              </button>

              {showExplanation && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">AI Analysis Breakdown:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-blue-800">
                            Amount Analysis: {
                              parseFloat(analysis.amount.replace(/[^0-9.]/g, '')) >= 100000
                                ? 'Large transaction amount indicates potential structuring'
                                : 'Amount within normal transaction range'
                            }
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-blue-800">
                            Jurisdiction Risk: {
                              riskThresholds.countries.high.includes(analysis.country)
                                ? 'High-risk jurisdiction known for financial secrecy'
                                : riskThresholds.countries.medium.includes(analysis.country)
                                  ? 'Medium-risk jurisdiction with some oversight concerns'
                                  : 'Low-risk jurisdiction with strong regulatory framework'
                            }
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-blue-800">
                            Wallet Analysis: {
                              analysis.from.startsWith('0x742d')
                                ? 'Source wallet has suspicious transaction history'
                                : 'No significant red flags in wallet history'
                            }
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Brain className="w-8 h-8 mx-auto mb-2" />
                <p>Enter transaction details for AI analysis</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}