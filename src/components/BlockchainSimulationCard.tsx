import React, { useState } from 'react';
import { ArrowRight, Wallet, Database, Lock, CheckCircle, AlertTriangle, Clock, Hash, FileText, Shield, Globe } from 'lucide-react';

interface Transaction {
  from: string;
  to: string;
  amount: string;
  status: 'pending' | 'confirming' | 'confirmed';
  timestamp: string;
  details: {
    fee: string;
    confirmations: number;
    blockHeight?: number;
  };
}

interface SimulationStep {
  title: string;
  description: string;
  icon: typeof Wallet;
  status: 'pending' | 'active' | 'completed';
  details: string[];
  technicalNotes: string[];
}

export function BlockchainSimulationCard() {
  const [step, setStep] = useState(0);
  const [transaction, setTransaction] = useState<Transaction>({
    from: '0x742d...1a3b',
    to: '0x9f3c...4d2e',
    amount: '0.5 BTC',
    status: 'pending',
    timestamp: new Date().toISOString(),
    details: {
      fee: '0.0001 BTC',
      confirmations: 0
    }
  });
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const steps: SimulationStep[] = [
    {
      title: 'Transaction Creation',
      description: 'Wallet creates and signs the transaction with private key',
      icon: Wallet,
      status: step === 0 ? 'active' : step > 0 ? 'completed' : 'pending',
      details: [
        'Transaction inputs and outputs are defined',
        'Transaction fee is calculated',
        'Digital signature is created using private key',
        'Raw transaction is serialized'
      ],
      technicalNotes: [
        'ECDSA signature algorithm used',
        'Transaction follows Bitcoin protocol format',
        'Inputs reference previous UTXO set',
        'Output includes recipient address and amount'
      ]
    },
    {
      title: 'Network Propagation',
      description: 'Transaction is broadcast to the Bitcoin network',
      icon: Globe,
      status: step === 1 ? 'active' : step > 1 ? 'completed' : 'pending',
      details: [
        'Transaction enters mempool',
        'Nodes validate transaction format',
        'Network nodes relay to peers',
        'Initial zero-confirmation status'
      ],
      technicalNotes: [
        'P2P network protocol messaging',
        'Transaction verification rules applied',
        'Double-spend checks performed',
        'Mempool acceptance criteria evaluated'
      ]
    },
    {
      title: 'Mining Process',
      description: 'Miners include transaction in a new block',
      icon: Database,
      status: step === 2 ? 'active' : step > 2 ? 'completed' : 'pending',
      details: [
        'Transaction selected from mempool',
        'Block header created with merkle root',
        'Proof-of-work mining begins',
        'Block found with valid nonce'
      ],
      technicalNotes: [
        'SHA-256 mining algorithm',
        'Merkle tree construction',
        'Difficulty target calculation',
        'Coinbase transaction included'
      ]
    },
    {
      title: 'Block Confirmation',
      description: 'Network reaches consensus on the new block',
      icon: Lock,
      status: step === 3 ? 'active' : step > 3 ? 'completed' : 'pending',
      details: [
        'Block propagates to network',
        'Nodes verify block validity',
        'Transaction marked as confirmed',
        'Block added to blockchain'
      ],
      technicalNotes: [
        'Consensus rules verification',
        'Chain reorganization checks',
        'UTXO set updates',
        'Block height incremented'
      ]
    }
  ];

  const handleNextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      if (step === 0) setTransaction(t => ({ ...t, status: 'pending' }));
      if (step === 1) {
        setTransaction(t => ({ 
          ...t, 
          status: 'confirming',
          details: { ...t.details, confirmations: 1 }
        }));
      }
      if (step === 2) {
        setTransaction(t => ({ 
          ...t, 
          status: 'confirmed',
          details: { 
            ...t.details, 
            confirmations: 6,
            blockHeight: 800001
          }
        }));
      }
    }
  };

  const handleReset = () => {
    setStep(0);
    setTransaction(t => ({ 
      ...t, 
      status: 'pending',
      details: {
        fee: '0.0001 BTC',
        confirmations: 0
      }
    }));
    setShowTechnicalDetails(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Database className="w-5 h-5 text-blue-600" />
        Blockchain Transaction Lifecycle
      </h3>

      <div className="space-y-8">
        {/* Transaction Details */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-gray-500">From Wallet</div>
              <div className="font-mono text-gray-900">{transaction.from}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">To Wallet</div>
              <div className="font-mono text-gray-900">{transaction.to}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Amount</div>
              <div className="font-medium text-gray-900">{transaction.amount}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Status</div>
              <div className={`font-medium ${
                transaction.status === 'confirmed' 
                  ? 'text-green-600' 
                  : transaction.status === 'confirming'
                    ? 'text-yellow-600'
                    : 'text-blue-600'
              }`}>
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                {transaction.status === 'confirming' && ` (${transaction.details.confirmations} confirmation)`}
                {transaction.status === 'confirmed' && ` (${transaction.details.confirmations} confirmations)`}
              </div>
            </div>
            {transaction.details.blockHeight && (
              <div className="col-span-2">
                <div className="text-sm font-medium text-gray-500">Block Height</div>
                <div className="font-mono text-gray-900">#{transaction.details.blockHeight}</div>
              </div>
            )}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isActive = index === step;
            const isComplete = index < step;

            return (
              <div 
                key={index}
                className={`flex items-start gap-4 p-4 rounded-lg border ${
                  isActive 
                    ? 'bg-blue-50 border-blue-200'
                    : isComplete
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isActive 
                    ? 'bg-blue-100'
                    : isComplete
                      ? 'bg-green-100'
                      : 'bg-gray-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    isActive 
                      ? 'text-blue-600'
                      : isComplete
                        ? 'text-green-600'
                        : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    isActive 
                      ? 'text-blue-900'
                      : isComplete
                        ? 'text-green-900'
                        : 'text-gray-900'
                  }`}>
                    {s.title}
                  </h4>
                  <p className={
                    isActive 
                      ? 'text-blue-700'
                      : isComplete
                        ? 'text-green-700'
                        : 'text-gray-600'
                  }>
                    {s.description}
                  </p>

                  {(isActive || isComplete) && (
                    <div className="mt-3 space-y-2">
                      {s.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <ArrowRight className={`w-4 h-4 flex-shrink-0 mt-1 ${
                            isActive ? 'text-blue-500' : 'text-green-500'
                          }`} />
                          <span className={
                            isActive ? 'text-blue-700' : 'text-green-700'
                          }>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {isActive && (
                    <div className="mt-4">
                      <button
                        onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        {showTechnicalDetails ? 'Hide' : 'Show'} Technical Details
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {showTechnicalDetails && (
                        <div className="mt-3 p-3 bg-blue-100 rounded-lg border border-blue-200">
                          <div className="text-sm font-medium text-blue-900 mb-2">Technical Notes:</div>
                          <div className="space-y-2">
                            {s.technicalNotes.map((note, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <Shield className="w-4 h-4 text-blue-700 flex-shrink-0 mt-1" />
                                <span className="text-sm text-blue-800">{note}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Reset
          </button>
          <button
            onClick={handleNextStep}
            disabled={step === steps.length - 1}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
          </button>
        </div>
      </div>

      {/* Educational Notes */}
      <div className="mt-8 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-900">Investigation Notes:</h4>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                <span className="text-yellow-800">
                  Transactions in mempool are unconfirmed and could be replaced
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                <span className="text-yellow-800">
                  Wait for multiple confirmations before considering large transactions final
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                <span className="text-yellow-800">
                  Monitor network for double-spend attempts during confirmation period
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}