import React from 'react';
import { BlockchainVisualizer } from '../components/BlockchainVisualizer';
import { ChallengeCard } from '../components/ChallengeCard';
import { QuizCard } from '../components/QuizCard';
import { CaseStudyTimeline } from '../components/CaseStudyTimeline';
import { 
  Shield, 
  Globe2, 
  Clock, 
  Lock, 
  Scale,
  ArrowRight
} from 'lucide-react';

const quizQuestions = [
  {
    question: "What makes cryptocurrency transactions unique compared to traditional banking?",
    options: [
      "They are reversible",
      "They are immutable and decentralized",
      "They require a central bank",
      "They are always anonymous"
    ],
    correctAnswer: 1,
    explanation: "Cryptocurrency transactions are unique because they are immutable (cannot be changed once recorded) and decentralized (not controlled by any single authority). This makes them different from traditional banking transactions which can be reversed and are controlled by central authorities."
  },
  {
    question: "Which of the following is NOT a common cryptocurrency crime?",
    options: [
      "Drug trafficking",
      "Insider trading",
      "Ransomware attacks",
      "Money laundering"
    ],
    correctAnswer: 1,
    explanation: "While insider trading can occur in cryptocurrency markets, it's less common compared to traditional securities. The most common crypto crimes are drug trafficking, ransomware attacks, and money laundering due to the pseudonymous nature of blockchain transactions."
  }
];

export function Introduction() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Procedures for Cryptocurrency Crime Investigations
        </h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1.1 Purpose of this SOP Handbook
          </h2>
          <div className="prose prose-blue max-w-none">
            <p>
              The rapid evolution of financial technology has introduced cryptocurrency as both a tool for legitimate economic growth and a conduit for illicit activities. Law enforcement agencies must adapt their investigative methodologies to navigate the complexities of digital assets, blockchain technology, and decentralized finance (DeFi).
            </p>
            <p>
              This handbook is designed to equip local, state, and federal law enforcement officers with the necessary knowledge and strategies to detect, investigate, and prosecute cryptocurrency-related crimes effectively. It provides structured, actionable guidance covering evidence collection, blockchain forensics, legal considerations, and international cooperation.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                By following this SOP, officers will be able to:
              </h3>
              <ul className="space-y-2 text-blue-900">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                  Recognize and secure cryptocurrency-related evidence at crime scenes.
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                  Apply blockchain forensic techniques to track illicit transactions.
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                  Work collaboratively with financial institutions, exchanges, and forensic analytics firms.
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                  Overcome jurisdictional challenges in cross-border digital asset investigations.
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                  Understand the legal frameworks necessary to prosecute cryptocurrency-related crimes effectively.
                </li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
              <p className="text-yellow-800 font-medium">
                Why This Matters: Traditional financial crime investigation methods do not directly apply to blockchain-based transactions. This handbook fills that knowledge gap.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1.2 Cryptocurrency in Modern Crime: A Growing Challenge
          </h2>
          <div className="prose prose-blue max-w-none">
            <p>
              Cryptocurrencies have been widely adopted for their advantages in speed, security, and decentralization. However, criminals also exploit these features for fraud, money laundering, ransomware attacks, and illicit trade.
            </p>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 my-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Key Criminal Use Cases of Cryptocurrency:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">Human Trafficking & Exploitation</h4>
                  <p className="text-gray-600 text-sm">Payments for illegal services on dark web marketplaces.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">Drug & Weapons Trade</h4>
                  <p className="text-gray-600 text-sm">Crypto transactions evade traditional banking oversight.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">Fraud & Investment Scams</h4>
                  <p className="text-gray-600 text-sm">Ponzi schemes, rug pulls, and phishing attacks.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">Ransomware Attacks</h4>
                  <p className="text-gray-600 text-sm">Cybercriminals demand ransom payments in Bitcoin or Monero.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">Terrorist Financing</h4>
                  <p className="text-gray-600 text-sm">Cryptocurrencies are used to fund operations globally.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">Money Laundering</h4>
                  <p className="text-gray-600 text-sm">Criminals obscure illicit funds through mixers, DeFi platforms, and NFT transactions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1.3 The Importance of Law Enforcement Adaptation
          </h2>
          <div className="prose prose-blue max-w-none">
            <p>
              Traditional financial crimes rely on centralized financial institutions, making it easier to subpoena records and freeze assets. Cryptocurrencies, by contrast, are decentralized, removing the need for a trusted third party.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">
                To investigate digital asset crimes, law enforcement must adapt by learning:
              </h3>
              <ul className="space-y-3 text-green-900">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-700 text-sm">1</span>
                  </div>
                  How cryptocurrency transactions work and how they differ from traditional banking.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-700 text-sm">2</span>
                  </div>
                  How to recognize digital evidence, including hardware wallets, private keys, and encrypted storage devices.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-700 text-sm">3</span>
                  </div>
                  How to track illicit transactions using blockchain explorers and forensic analytics tools.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-700 text-sm">4</span>
                  </div>
                  How to legally seize digital assets while preserving their integrity for court proceedings.
                </li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-6">
              <p className="text-red-700">
                Failure to modernize investigative training risks missed evidence, case dismissals, and emboldened cybercriminals.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            1.4 Key Investigative Challenges in Cryptocurrency Crime
          </h2>
          
          <div className="space-y-6">
            <ChallengeCard
              number={1}
              title="Pseudonymity vs. Anonymity"
              icon={Shield}
              description={
                <ul className="list-disc pl-4">
                  <li>Bitcoin and Ethereum transactions are public but do not immediately reveal personal identities.</li>
                  <li>Privacy coins like Monero (XMR) and Zcash (ZEC) intentionally obscure transaction details.</li>
                  <li>Investigators must use forensic clustering techniques to link transactions to real-world identities.</li>
                </ul>
              }
            />
            
            <ChallengeCard
              number={2}
              title="Cross-Jurisdictional Investigations"
              icon={Globe2}
              description={
                <ul className="list-disc pl-4">
                  <li>Crypto transactions occur on a global network, complicating asset recovery.</li>
                  <li>Some exchanges operate in unregulated jurisdictions, requiring international cooperation.</li>
                  <li>Law enforcement must engage Interpol, Europol, and the Financial Action Task Force (FATF) for cross-border cases.</li>
                </ul>
              }
            />
            
            <ChallengeCard
              number={3}
              title="Rapidly Evolving Criminal Techniques"
              icon={Clock}
              description={
                <ul className="list-disc pl-4">
                  <li>Mixers, tumblers, DeFi, and NFT-based laundering make it difficult to follow the money.</li>
                  <li>Criminals exploit smart contracts and automated trading bots to move assets at high speed.</li>
                  <li>Investigators must stay ahead by learning how these techniques work.</li>
                </ul>
              }
            />
            
            <ChallengeCard
              number={4}
              title="Difficulty in Seizing & Freezing Digital Assets"
              icon={Lock}
              description={
                <ul className="list-disc pl-4">
                  <li>Unlike bank accounts, crypto wallets do not have a central authority to freeze funds.</li>
                  <li>Law enforcement must know how to identify, seize, and secure private keys without compromising evidence.</li>
                </ul>
              }
            />
            
            <ChallengeCard
              number={5}
              title="Presenting Crypto Evidence in Court"
              icon={Scale}
              description={
                <ul className="list-disc pl-4">
                  <li>Prosecutors and judges often lack blockchain knowledge, making legal proceedings complex.</li>
                  <li>The burden of proof for ownership and criminal intent in crypto cases is higher.</li>
                  <li>Investigators must provide clear, court-admissible forensic evidence.</li>
                </ul>
              }
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            1.5 Case Study: Colonial Pipeline Ransomware Attack
          </h2>
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              The Colonial Pipeline ransomware attack represents a landmark case in cryptocurrency-related
              crime investigation. This case study demonstrates the complex interplay between
              cybercrime, cryptocurrency transactions, and law enforcement response.
            </p>
          </div>
          <CaseStudyTimeline />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Interactive Component: Blockchain Transaction Visualization
          </h2>
          <BlockchainVisualizer />
          
          <div className="mt-6 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Pro Tips:</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-gray-500" />
                <span>Bookmark blockchain explorers like Etherscan and WhatsOnChain for future investigations.</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-gray-500" />
                <span>Use transaction IDs to track the flow of funds across multiple addresses.</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-gray-500" />
                <span>Monitor large transactions that might indicate criminal activity.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Knowledge Check: Understanding Cryptocurrency Crime
          </h2>
          <QuizCard questions={quizQuestions} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Conclusion: The Need for Continuous Learning
          </h2>
          <div className="prose prose-blue max-w-none">
            <p>
              Cryptocurrency crime is an ever-evolving landscape. Criminals are developing new methods to obscure transactions, evade detection, and exploit legal loopholes. Law enforcement must remain vigilant and adaptive.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 my-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Understanding Cryptocurrency & Blockchain Technology</h4>
                    <p className="text-gray-600">Learn the fundamentals of blockchain, key cryptocurrency concepts, and transaction structures.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Recognizing Cryptocurrency in Criminal Activity</h4>
                    <p className="text-gray-600">Identify how cryptocurrencies are used in illegal finance and what red flags to watch for.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm font-medium">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Crime Scene Handling & Evidence Collection</h4>
                    <p className="text-gray-600">Best practices for securing, preserving, and analyzing digital evidence.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}