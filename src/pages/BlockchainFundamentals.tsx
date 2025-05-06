import React from 'react';
import { BlockchainSimulator } from '../components/BlockchainSimulator';
import { BlockchainSimulationCard } from '../components/BlockchainSimulationCard';
import { BlockchainPuzzle } from '../components/BlockchainPuzzle';
import { WalletTypes } from '../components/WalletTypes';
import { QuizCard } from '../components/QuizCard';
import { ChapterBadges } from '../components/ChapterBadges';
import { chapters } from '../data/chapters';
import { 
  Link,
  ShieldCheck,
  Users,
  Lock,
  Wallet,
  Code,
  ArrowRight
} from 'lucide-react';

const quizQuestions = [
  {
    question: "What is a blockchain?",
    options: [
      "A type of database that stores immutable transaction records",
      "A private financial ledger",
      "A physical chain used to secure cryptocurrency",
      "A program that controls Bitcoin"
    ],
    correctAnswer: 0,
    explanation: "A blockchain is a distributed database or ledger that stores transaction records in a way that makes them immutable and transparent. Each block contains multiple transactions, and blocks are linked together cryptographically."
  },
  {
    question: "Which of the following is an example of a privacy coin?",
    options: [
      "Bitcoin",
      "Ethereum",
      "Monero",
      "Dogecoin"
    ],
    correctAnswer: 2,
    explanation: "Monero (XMR) is a privacy coin that uses advanced cryptographic techniques like ring signatures and stealth addresses to hide transaction details. Unlike Bitcoin or Ethereum, Monero transactions are completely private by default."
  }
];

export function BlockchainFundamentals({ onComplete }: { onComplete?: () => void }) {
  const blockchainChapter = chapters.find(c => c.id === 'crypto-basics');
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Understanding Cryptocurrency & Blockchain Technology
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2.1 Fundamentals of Blockchain
          </h2>
          <div className="prose prose-blue max-w-none">
            <p>
              Blockchain is a decentralized, immutable digital ledger that records transactions across a distributed network of computers. Unlike traditional databases controlled by a single authority, blockchain technology ensures tamper resistance, transparency, and trustless transactions.
            </p>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 my-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Key Characteristics of Blockchain:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Decentralization</h4>
                    <p className="text-sm text-gray-600">No single entity controls the blockchain; instead, it operates across a network of nodes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Immutability</h4>
                    <p className="text-sm text-gray-600">Transactions, once recorded, cannot be altered, ensuring data integrity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Link className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Transparency</h4>
                    <p className="text-sm text-gray-600">Public blockchains allow anyone to view transactions, fostering accountability.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Consensus Mechanisms</h4>
                    <p className="text-sm text-gray-600">Transactions are verified through network agreement mechanisms such as PoW or PoS.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
              <p className="text-blue-900">
                <strong>Example:</strong> In Bitcoin's blockchain, transactions are grouped into "blocks," which are verified by miners and added to the chain approximately every 10 minutes.
              </p>
            </div>
          </div>

          <BlockchainSimulator />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2.2 Interactive Block Structure Learning
          </h2>
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Understanding the structure of a blockchain block is crucial for investigators.
              Each block contains specific components that work together to ensure security,
              immutability, and proper chain linkage.
            </p>
          </div>
          <BlockchainPuzzle />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2.3 Interactive Demonstration: How Blockchain Transactions Work
          </h2>
          <BlockchainSimulationCard />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2.4 Types of Cryptocurrency Wallets
          </h2>
          <WalletTypes />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Knowledge Check: Understanding Blockchain Technology
          </h2>
          <QuizCard questions={quizQuestions} moduleId="blockchain_fundamentals" />
        </section>

        {blockchainChapter && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Badges for this Chapter
            </h2>
            <ChapterBadges chapter={blockchainChapter} />
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Conclusion: Blockchain Fundamentals for Investigators
          </h2>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Takeaways:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                <span className="text-gray-600">
                  Blockchain's immutable nature makes it a reliable source of evidence
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                <span className="text-gray-600">
                  Different wallet types require different investigative approaches
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                <span className="text-gray-600">
                  Understanding block structure helps trace transaction flows
                </span>
              </li>
            </ul>
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