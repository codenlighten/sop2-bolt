import React from 'react';
import { EmergingThreatsSimulator } from '../components/EmergingThreatsSimulator';
import { CrossChainAnalyzer } from '../components/CrossChainAnalyzer';
import { QuizCard } from '../components/QuizCard';
import { 
  Brain, 
  AlertTriangle, 
  ArrowRight, 
  Database, 
  Shield, 
  Lock, 
  Globe, 
  Laptop, 
  Wallet, 
  Code, 
  Cuboid as Cube, 
  Fingerprint, 
  BadgeCheck, 
  Building2 
} from 'lucide-react';

const quizQuestions = [
  {
    question: "What is a major security risk posed by quantum computing?",
    options: [
      "Faster mining",
      "Breaking blockchain encryption",
      "Creating unlimited cryptocurrency",
      "Slowing down transaction speeds"
    ],
    correctAnswer: 1,
    explanation: "Quantum computers could potentially break the cryptographic algorithms that secure blockchain transactions, making current encryption methods vulnerable. This is why the development of quantum-resistant cryptography is crucial."
  },
  {
    question: "Which technology is most commonly used for cross-chain laundering?",
    options: [
      "Smart contracts",
      "Cross-chain bridges",
      "Proof of Work",
      "SegWit"
    ],
    correctAnswer: 1,
    explanation: "Cross-chain bridges are frequently exploited for money laundering as they allow criminals to move assets between different blockchains, making it harder to track the flow of funds."
  }
];

function TrendCard({
  icon: Icon,
  title,
  description,
  challenges
}: {
  icon: typeof Brain;
  title: string;
  description: string;
  challenges: string[];
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Law Enforcement Challenges:</h4>
        <ul className="space-y-2">
          {challenges.map((challenge, index) => (
            <li key={index} className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
              <span className="text-gray-600">{challenge}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CrimeTechniqueCard({
  title,
  description,
  howItWorks,
  tracking
}: {
  title: string;
  description: string;
  howItWorks: string;
  tracking: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-4">
        <div>
          <div className="text-sm font-medium text-gray-900 mb-2">How It Works:</div>
          <p className="text-gray-600">{howItWorks}</p>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900 mb-2">How to Track:</div>
          <p className="text-gray-600">{tracking}</p>
        </div>
      </div>
    </div>
  );
}

export function FutureTrends({ onComplete }: { onComplete?: () => void }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Future Trends in Cryptocurrency Crime & Law Enforcement Response
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            10.1 Interactive Exercise: Emerging Threats & Countermeasures
          </h2>
          <EmergingThreatsSimulator />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            10.2 Knowledge Check: Future Trends
          </h2>
          <QuizCard questions={quizQuestions} moduleId="future_trends" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            10.3 Emerging Cryptocurrency Crime Trends
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrendCard
              icon={Database}
              title="DeFi Exploits"
              description="Criminals exploit decentralized finance protocols to launder money and commit fraud"
              challenges={[
                "No central authority to issue subpoenas",
                "Complex smart contract interactions",
                "Cross-chain transactions hide trails"
              ]}
            />
            <TrendCard
              icon={Brain}
              title="AI-Generated Crypto Fraud"
              description="AI deepfakes and synthetic identities are used in cryptocurrency scams"
              challenges={[
                "Hard to verify legitimate vs. fake accounts",
                "AI-powered phishing attacks",
                "Automated scam operations"
              ]}
            />
            <TrendCard
              icon={Cube}
              title="Metaverse Financial Crimes"
              description="Crypto crimes extend into virtual worlds and digital assets"
              challenges={[
                "New jurisdictional challenges",
                "Virtual asset valuation issues",
                "Complex ownership rights"
              ]}
            />
            <TrendCard
              icon={Lock}
              title="Quantum Computing Risks"
              description="Future quantum attacks could break cryptocurrency encryption"
              challenges={[
                "Need for post-quantum cryptography",
                "Vulnerable private keys",
                "Legacy system risks"
              ]}
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            10.4 Cross-Chain Money Laundering
          </h2>
          
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Modern money launderers exploit the complexity of multiple blockchain networks to obscure
              the trail of illicit funds. Learn to track assets across different chains and identify
              common laundering patterns.
            </p>
          </div>

          <CrossChainAnalyzer />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            10.5 Preparing for Quantum Threats
          </h2>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              How Quantum Computing Threatens Cryptocurrencies
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Private Key Vulnerability</h4>
                  <p className="text-gray-600">
                    Quantum computers could break current encryption standards, exposing private keys
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Network Security</h4>
                  <p className="text-gray-600">
                    Bitcoin and Ethereum use vulnerable elliptic curve cryptography
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Global Impact</h4>
                  <p className="text-gray-600">
                    Entire blockchain networks could be compromised if quantum resistance isn't implemented
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">
              Law Enforcement Response to Quantum Threats
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Fingerprint className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">Monitor Development</h4>
                  <p className="text-yellow-800">
                    Track progress in quantum-resistant blockchain protocols
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BadgeCheck className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">Prepare for Transition</h4>
                  <p className="text-yellow-800">
                    Develop procedures for investigating quantum-resistant cryptocurrencies
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">Update Security</h4>
                  <p className="text-yellow-800">
                    Ensure evidence collection methods are quantum-safe
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Conclusion: Staying Ahead of Crypto Crime
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Steps</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Laptop className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Invest in Advanced Tools</h4>
                  <p className="text-gray-600">
                    Maintain cutting-edge forensic capabilities for cross-chain analysis
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Continuous Training</h4>
                  <p className="text-gray-600">
                    Keep investigators updated on emerging crypto crime techniques
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">International Cooperation</h4>
                  <p className="text-gray-600">
                    Strengthen global partnerships to combat evolving crypto threats
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