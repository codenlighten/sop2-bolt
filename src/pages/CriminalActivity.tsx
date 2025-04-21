import React from 'react';
import { TransactionPatternGame } from '../components/TransactionPatternGame';
import { SuspiciousTransactionSimulator } from '../components/SuspiciousTransactionSimulator';
import { CryptoScamAnalyzer } from '../components/CryptoScamAnalyzer';
import { QuizCard } from '../components/QuizCard';
import { ChapterBadges } from '../components/ChapterBadges';
import { chapters } from '../data/chapters';
import { Users, Pill as Pills, ShieldAlert, Banknote, ArrowRight, AlertTriangle, Search, Shield } from 'lucide-react';

const quizQuestions = [
  {
    question: "Which of these is a red flag for potential human trafficking using cryptocurrency?",
    options: [
      "Large purchases of NFTs",
      "Small, frequent transactions between multiple wallets",
      "Depositing funds into centralized exchanges",
      "Buying Bitcoin with a credit card"
    ],
    correctAnswer: 1,
    explanation: "Small, frequent transactions between multiple wallets are often associated with human trafficking operations, as they represent regular payments for illicit services while trying to avoid detection thresholds."
  },
  {
    question: "Which of these crimes is commonly associated with Monero (XMR)?",
    options: [
      "Investment fraud",
      "Ransomware payments",
      "NFT scams",
      "Identity theft"
    ],
    correctAnswer: 1,
    explanation: "Ransomware attackers often demand payment in Monero (XMR) because its privacy features make transactions untraceable, unlike Bitcoin which leaves a public transaction trail."
  }
];

function CrimeTypeCard({ 
  icon: Icon, 
  title, 
  description, 
  redFlags 
}: { 
  icon: typeof Users;
  title: string;
  description: React.ReactNode;
  redFlags: string[];
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
          <div className="text-gray-600 mb-4">{description}</div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Red Flags:</h4>
            <ul className="space-y-2">
              {redFlags.map((flag, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CriminalActivity({ onComplete }: { onComplete?: () => void }) {
  const criminalActivityChapter = chapters.find(c => c.id === 'criminal-activity');
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Recognizing Cryptocurrency in Criminal Activity
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            3.1 Interactive Exercise: Identifying Suspicious Transactions
          </h2>
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Learn to identify potentially illegal cryptocurrency transactions by analyzing
              patterns, amounts, and risk indicators. This skill is crucial for law enforcement
              officers investigating crypto-related crimes.
            </p>
          </div>
          <SuspiciousTransactionSimulator />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3.2 Transaction Pattern Recognition
          </h2>
          <TransactionPatternGame />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3.3 Crypto Scam Analysis
          </h2>
          <CryptoScamAnalyzer />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3.4 Common Types of Cryptocurrency-Related Crimes
          </h2>

          <div className="space-y-6">
            <CrimeTypeCard
              icon={Users}
              title="Human Trafficking & Exploitation"
              description="Criminals use cryptocurrency to facilitate human trafficking operations through dark web marketplaces and encrypted communication channels."
              redFlags={[
                "Frequent small-value transactions to multiple wallets",
                "Transactions in high-risk geographic regions",
                "Dark web advertisements with crypto payment options",
                "Unusual transactions linked to escort services"
              ]}
            />

            <CrimeTypeCard
              icon={Pills}
              title="Drug Trafficking"
              description="Drug traffickers leverage cryptocurrency for anonymous transactions on dark web markets and international money movement."
              redFlags={[
                "Multiple small transactions leading to single withdrawal",
                "Darknet marketplace wallet addresses",
                "Suspicious packages correlated with crypto transactions",
                "Local P2P cash-to-crypto exchanges"
              ]}
            />

            <CrimeTypeCard
              icon={ShieldAlert}
              title="Fraud & Scams"
              description="Cryptocurrency scams include investment fraud, phishing attacks, and social engineering schemes targeting digital assets."
              redFlags={[
                "Victim complaints about similar wallet addresses",
                "Transaction clusters leading to scam wallets",
                "Fake exchanges suddenly withdrawing liquidity",
                "Suspicious groups promoting unrealistic returns"
              ]}
            />

            <CrimeTypeCard
              icon={Banknote}
              title="Money Laundering"
              description="Criminals use cryptocurrency to obscure the origin of illicit funds through complex transaction patterns and mixing services."
              redFlags={[
                "Large transactions with no verifiable source",
                "Use of non-KYC compliant exchanges",
                "Frequent transactions through known laundering wallets",
                "Structured transactions below reporting thresholds"
              ]}
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3.5 Knowledge Check: Cryptocurrency Crime Patterns
          </h2>
          <QuizCard questions={quizQuestions} moduleId="criminal_activity" />
        </section>

        {criminalActivityChapter && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Badges for this Chapter
            </h2>
            <ChapterBadges chapter={criminalActivityChapter} />
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Conclusion: Detecting Criminal Activity
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Takeaways:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                <span className="text-gray-600">
                  Monitor transaction patterns and amounts for suspicious activity
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                <span className="text-gray-600">
                  Pay attention to wallet addresses linked to known criminal activity
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                <span className="text-gray-600">
                  Understand common scam techniques and red flags
                </span>
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