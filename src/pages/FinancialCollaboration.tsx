import React from 'react';
import { SarFilingExercise } from '../components/SarFilingExercise';
import { BankingTransactionAI } from '../components/BankingTransactionAI';
import { DeFiFraudSandbox } from '../components/DeFiFraudSandbox';
import { CrossExaminationGame } from '../components/CrossExaminationGame';
import { QuizCard } from '../components/QuizCard';
import {
  Building2,
  AlertTriangle,
  ArrowRight,
  FileText,
  Shield,
  Globe,
  Lock,
  BadgeCheck,
  Database,
  Search,
  Users,
  Handshake
} from 'lucide-react';

const quizQuestions = [
  {
    question: "What information do cryptocurrency exchanges collect under KYC regulations?",
    options: [
      "IP address and browser history",
      "Name, government ID, and proof of address",
      "Preferred cryptocurrencies",
      "Private keys"
    ],
    correctAnswer: 1,
    explanation: "Under Know Your Customer (KYC) regulations, cryptocurrency exchanges must collect identifying information including legal name, government-issued ID, and proof of address to verify customer identities and prevent financial crimes."
  },
  {
    question: "How can banks help track illicit crypto transactions?",
    options: [
      "By monitoring large fiat deposits from exchanges",
      "By blocking all crypto transactions",
      "By creating fake accounts",
      "By using decentralized wallets"
    ],
    correctAnswer: 0,
    explanation: "Banks can help identify illicit crypto activity by monitoring for suspicious patterns in fiat currency deposits from cryptocurrency exchanges, which often indicate attempts to cash out criminal proceeds."
  },
  {
    question: "What is the primary purpose of a SAR filing?",
    options: [
      "To report all crypto transactions",
      "To notify law enforcement of suspicious activity",
      "To request exchange data",
      "To freeze accounts"
    ],
    correctAnswer: 1,
    explanation: "Suspicious Activity Reports (SARs) are filed to notify law enforcement about potentially suspicious financial activity that might indicate money laundering, fraud, or other criminal behavior."
  }
];

function ServiceProviderCard({
  name,
  description,
  capabilities,
  icon: Icon
}: {
  name: string;
  description: string;
  capabilities: string[];
  icon: typeof Building2;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Key Capabilities:</h4>
            <ul className="space-y-2">
              {capabilities.map((capability, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-600">{capability}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FinancialCollaboration({ onComplete }: { onComplete?: () => void }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Collaboration with Financial Institutions & Service Providers
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            7.1 AI-Powered Transaction Risk Analysis
          </h2>
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Use artificial intelligence to analyze crypto-to-fiat transactions and identify
              potential money laundering patterns based on amount, jurisdiction, and wallet history.
            </p>
          </div>
          <BankingTransactionAI />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            7.2 Interactive Exercise: SAR Filing Decision Making
          </h2>
          <SarFilingExercise />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            7.3 DeFi Fraud Detection Training
          </h2>
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Learn to identify and prevent common DeFi exploits like rug pulls and flash loan attacks.
              Practice analyzing smart contracts and transaction patterns for suspicious activity.
            </p>
          </div>
          <DeFiFraudSandbox />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            7.4 Courtroom Evidence Preparation
          </h2>
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Practice defending blockchain evidence and financial analysis in court.
              Learn to explain complex cryptocurrency concepts to judges and juries.
            </p>
          </div>
          <CrossExaminationGame />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7.5 Knowledge Check: Financial Institution Collaboration
          </h2>
          <QuizCard questions={quizQuestions} moduleId="financial_collaboration" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            7.6 Working with Different Types of Financial Institutions
          </h2>

          <div className="space-y-6">
            <ServiceProviderCard
              icon={Building2}
              name="Traditional Banks"
              description="Banks play a crucial role in identifying crypto-related transactions and suspicious activity."
              capabilities={[
                "Monitor fiat currency deposits from exchanges",
                "File Suspicious Activity Reports (SARs)",
                "Maintain transaction records",
                "Assist in asset recovery"
              ]}
            />

            <ServiceProviderCard
              icon={Globe}
              name="Cryptocurrency Exchanges"
              description="Regulated exchanges are valuable partners in tracking and preventing financial crimes."
              capabilities={[
                "Implement KYC/AML procedures",
                "Monitor suspicious transactions",
                "Cooperate with law enforcement",
                "Freeze suspicious accounts"
              ]}
            />

            <ServiceProviderCard
              icon={Shield}
              name="Blockchain Analytics Firms"
              description="Specialized companies providing tools and expertise for crypto investigations."
              capabilities={[
                "Track transactions across chains",
                "Identify high-risk wallets",
                "Generate forensic reports",
                "Provide expert testimony"
              ]}
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7.7 Best Practices for Financial Institution Collaboration
          </h2>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Building Effective Partnerships
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Handshake className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Establish Points of Contact</h4>
                        <p className="text-sm text-gray-600">
                          Maintain relationships with compliance teams at financial institutions
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Secure Data Sharing</h4>
                        <p className="text-sm text-gray-600">
                          Follow proper protocols for requesting and handling sensitive information
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-medium text-blue-900 mb-4">Key Considerations:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <BadgeCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900">Legal Requirements</h5>
                      <p className="text-blue-800">
                        Understand data privacy laws and information sharing regulations
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900">Training & Education</h5>
                      <p className="text-blue-800">
                        Provide guidance on identifying crypto-related suspicious activity
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900">Data Management</h5>
                      <p className="text-blue-800">
                        Establish clear procedures for handling and storing financial records
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Conclusion: Strengthening Financial Intelligence
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm font-medium">8</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Setting Up Specialized Crypto Crime Units
                  </h4>
                  <p className="text-gray-600">
                    Learn how to establish dedicated law enforcement units for cryptocurrency crime
                    investigations and build the necessary technical expertise.
                  </p>
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