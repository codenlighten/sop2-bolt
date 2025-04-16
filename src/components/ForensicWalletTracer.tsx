import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, ArrowRight, Shield, Database, Building2, Wallet } from 'lucide-react';

/**
 * Represents a cryptocurrency transaction with forensic analysis data
 * @interface Transaction
 */
interface Transaction {
  /** Unique identifier for the transaction */
  id: string;
  /** Source wallet address */
  from: string;
  /** Destination wallet address or service */
  to: string;
  /** Transaction amount with currency unit */
  amount: string;
  /** ISO timestamp of the transaction */
  timestamp: string;
  /** Classification of the transaction type */
  type: 'Mixer Transfer' | 'Mixed Output' | 'Exchange Deposit' | 'Wallet Transfer';
  /** Risk assessment level */
  risk: 'high' | 'medium' | 'low';
  /** Analysis notes and observations */
  notes: string[];
}

/**
 * Sample transaction data for demonstration
 * In a real implementation, this would be fetched from a blockchain analysis API
 */
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    from: '1A1zP1...QGefi2',
    to: 'Mixer Service',
    amount: '10.5 BTC',
    timestamp: '2025-03-01 10:00:00',
    type: 'Mixer Transfer',
    risk: 'high',
    notes: [
      'Funds sent to known mixing service',
      'Multiple outputs expected',
      'High-risk pattern identified'
    ]
  },
  {
    id: '2',
    from: 'Mixer Service',
    to: 'Multiple Addresses',
    amount: '10.4 BTC',
    timestamp: '2025-03-01 10:15:00',
    type: 'Mixed Output',
    risk: 'high',
    notes: [
      'Multiple small transfers',
      'Privacy-focused behavior',
      'Attempting to break transaction trail'
    ]
  },
  {
    id: '3',
    from: '3F1tAaz...Xn4Cfg',
    to: 'Exchange A',
    amount: '2.5 BTC',
    timestamp: '2025-03-01 11:00:00',
    type: 'Exchange Deposit',
    risk: 'medium',
    notes: [
      'Regulated exchange deposit',
      'KYC requirements in place',
      'Part of larger transaction pattern'
    ]
  }
];

/**
 * ForensicWalletTracer Component
 * 
 * A tool for law enforcement to analyze cryptocurrency wallet activity and trace
 * transaction patterns. This component provides:
 * 
 * - Wallet address search functionality
 * - Transaction history visualization
 * - Risk assessment and analysis
 * - Pattern recognition and recommendations
 * 
 * @component
 */
export function ForensicWalletTracer() {
  // Track the wallet address being investigated
  const [walletAddress, setWalletAddress] = useState('');
  
  // Currently selected transaction for detailed analysis
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  
  // Controls visibility of analysis panel
  const [showAnalysis, setShowAnalysis] = useState(false);

  /**
   * Handles wallet address search submission
   * In a real implementation, this would query blockchain analysis APIs
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAnalysis(true);
  };

  /**
   * Determines the appropriate icon for a transaction type
   * @param {Transaction['type']} type - The transaction type
   * @returns {JSX.Element} The icon component
   */
  const getTransactionIcon = (type: Transaction['type']): JSX.Element => {
    switch (type) {
      case 'Mixer Transfer':
        return <Database className="w-5 h-5 text-gray-500" />;
      case 'Exchange Deposit':
        return <Building2 className="w-5 h-5 text-gray-500" />;
      default:
        return <Wallet className="w-5 h-5 text-gray-500" />;
    }
  };

  /**
   * Gets the appropriate CSS classes for risk level indicators
   * @param {Transaction['risk']} risk - Risk level
   * @returns {string} CSS class string
   */
  const getRiskLevelClasses = (risk: Transaction['risk']): string => {
    switch (risk) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Forensic Wallet Analysis
        </h3>
        <p className="text-gray-600">
          Trace cryptocurrency transactions and analyze wallet behavior patterns.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter wallet address (e.g., 1A1zP1...QGefi2)"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </form>

      {showAnalysis && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Transaction List */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Related Transactions:</h4>
              {sampleTransactions.map(tx => (
                <button
                  key={tx.id}
                  className={`w-full p-4 text-left rounded-lg border transition-colors ${
                    selectedTx?.id === tx.id
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedTx(tx)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(tx.type)}
                      <span className="font-medium text-gray-900">{tx.type}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getRiskLevelClasses(tx.risk)}`}>
                      {tx.risk.toUpperCase()} RISK
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-gray-500">From</div>
                      <div className="font-mono text-gray-900">{tx.from}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">To</div>
                      <div className="font-mono text-gray-900">{tx.to}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Amount</div>
                      <div className="text-gray-900">{tx.amount}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Time</div>
                      <div className="text-gray-900">{tx.timestamp}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Transaction Analysis Panel */}
            <div>
              {selectedTx ? (
                <div className="space-y-6">
                  {/* Analysis Notes */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Analysis Notes:</h4>
                    <ul className="space-y-2">
                      {selectedTx.notes.map((note, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-3">Recommendations:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                        <span className="text-blue-800">
                          Track all related wallet addresses
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                        <span className="text-blue-800">
                          Monitor for additional mixing attempts
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                        <span className="text-blue-800">
                          Document all transaction patterns
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2" />
                    <p>Select a transaction to view analysis</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}