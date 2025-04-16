import React from 'react';
import { ForensicWalletTracer } from '../components/ForensicWalletTracer';
import { MoneyFlowTracker } from '../components/MoneyFlowTracker';
import { AssetRecoverySimulator } from '../components/AssetRecoverySimulator';
import { QuizCard } from '../components/QuizCard';
import { 
  Search, 
  Link2, 
  Shield, 
  AlertTriangle, 
  ArrowRight, 
  Database,
  Eye,
  Lock,
  FileWarning,
  ExternalLink,
  Fingerprint,
  Scale,
  Globe,
  Wallet
} from 'lucide-react';

const quizQuestions = [
  {
    question: "What is the first step in cryptocurrency asset recovery?",
    options: [
      "Immediately seize all devices",
      "Document and preserve blockchain evidence",
      "Contact the exchange",
      "Arrest the suspect"
    ],
    correctAnswer: 1,
    explanation: "Proper documentation and preservation of blockchain evidence is crucial as the first step in asset recovery to ensure admissibility in court and maintain the chain of custody."
  },
  {
    question: "Which tool is most useful for tracing mixed cryptocurrency?",
    options: [
      "Basic blockchain explorer",
      "Advanced clustering algorithms",
      "Exchange records only",
      "Bank statements"
    ],
    correctAnswer: 1,
    explanation: "Advanced clustering algorithms are essential for tracing cryptocurrency that has gone through mixing services, as they can identify patterns and connections between seemingly unrelated transactions."
  },
  {
    question: "What is required to seize cryptocurrency from a hardware wallet?",
    options: [
      "Just the wallet address",
      "The private key or seed phrase",
      "Exchange login",
      "Internet connection"
    ],
    correctAnswer: 1,
    explanation: "Access to the private key or seed phrase is necessary to seize cryptocurrency from a hardware wallet. Without these, the funds remain inaccessible even if you have physical possession of the device."
  }
];

interface DigitalAssetRecoveryProps {
  onComplete?: () => void;
}

export function DigitalAssetRecovery({ onComplete }: DigitalAssetRecoveryProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Digital Asset Recovery & Blockchain Forensics
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            5.1 Interactive Exercise: Forensic Wallet Analysis
          </h2>
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Learn to trace cryptocurrency transactions through mixing services and identify
              suspicious patterns using forensic analysis tools.
            </p>
          </div>
          <ForensicWalletTracer />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            5.2 Money Flow Analysis
          </h2>
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Track how cryptocurrency moves between wallets, exchanges, and other services.
              Identify potential money laundering patterns.
            </p>
          </div>
          <MoneyFlowTracker />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            5.3 Asset Recovery Simulation
          </h2>
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Practice seizing and recovering cryptocurrency assets through various scenarios.
              Learn proper procedures for different types of wallets and storage methods.
            </p>
          </div>
          <AssetRecoverySimulator />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5.4 Knowledge Check: Asset Recovery
          </h2>
          <QuizCard questions={quizQuestions} moduleId="asset_recovery" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            5.5 Best Practices for Digital Asset Recovery
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Evidence Collection & Preservation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Documentation</h4>
                      <p className="text-sm text-gray-600">
                        Record all blockchain transactions and wallet addresses
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Security</h4>
                      <p className="text-sm text-gray-600">
                        Secure private keys and seed phrases properly
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-medium text-blue-900 mb-4">Recovery Process:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FileWarning className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900">Initial Assessment</h5>
                    <p className="text-blue-800">
                      Identify wallet types and storage methods used
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900">Access Methods</h5>
                    <p className="text-blue-800">
                      Determine legal means of accessing funds
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Fingerprint className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900">Chain of Custody</h5>
                    <p className="text-blue-800">
                      Maintain proper documentation throughout recovery
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5.6 Legal Considerations
          </h2>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Legal Requirements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Scale className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Court Orders</h4>
                        <p className="text-sm text-gray-600">
                          Obtain necessary warrants and orders
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Jurisdiction</h4>
                        <p className="text-sm text-gray-600">
                          Consider international legal requirements
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Important Notice:</h4>
                    <p className="text-yellow-800">
                      Always consult legal counsel before attempting to seize or recover
                      cryptocurrency assets. Different jurisdictions may have varying
                      requirements and restrictions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end mt-8">
          <button
            onClick={onComplete}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            Complete Chapter
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}