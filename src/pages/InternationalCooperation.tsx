import { GlobalCryptoMap } from '../components/GlobalCryptoMap';
import { InternationalInvestigationSimulator } from '../components/InternationalInvestigationSimulator';
import { QuizCard } from '../components/QuizCard';
import {
  Globe,
  ArrowRight,
  Building2,
  Scale,
  Shield,
  ExternalLink,
  Users,
  Handshake
} from 'lucide-react';

const quizQuestions = [
  {
    question: "What is an MLAT used for in crypto investigations?",
    options: [
      "To encrypt blockchain transactions",
      "To request legal assistance between countries",
      "To identify scam wallets",
      "To confiscate NFTs"
    ],
    correctAnswer: 1,
    explanation: "Mutual Legal Assistance Treaties (MLATs) are formal agreements between countries that allow law enforcement agencies to request and share evidence across borders, which is crucial for investigating international cryptocurrency crimes."
  },
  {
    question: "Which organization oversees international AML compliance?",
    options: [
      "FBI",
      "FATF",
      "SEC",
      "Europol"
    ],
    correctAnswer: 1,
    explanation: "The Financial Action Task Force (FATF) is the global money laundering and terrorist financing watchdog that sets international standards for AML compliance, including cryptocurrency regulations."
  }
];

interface AgencyCardProps {
  name: string;
  jurisdiction: string;
  role: string;
  website: string;
}

function AgencyCard({ name, jurisdiction, role, website }: AgencyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm">Visit</span>
        </a>
      </div>
      <div className="space-y-3">
        <div>
          <div className="text-sm font-medium text-gray-500">Jurisdiction</div>
          <div className="text-gray-900">{jurisdiction}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500">Role</div>
          <div className="text-gray-600">{role}</div>
        </div>
      </div>
    </div>
  );
}

interface ChallengeCardProps {
  icon: typeof Globe;
  title: string;
  description: string;
  solution: string;
}

function ChallengeCard({ icon: Icon, title, description, solution }: ChallengeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm font-medium text-gray-900 mb-2">Solution:</div>
        <p className="text-gray-600">{solution}</p>
      </div>
    </div>
  );
}

export function InternationalCooperation({ onComplete }: { onComplete?: () => void }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          International Cooperation & Jurisdictional Challenges
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            6.1 Interactive Exercise: International Investigation Request
          </h2>
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Learn how to file and manage MLAT requests for seizing cryptocurrency assets
              in foreign jurisdictions. Practice navigating international legal requirements
              and documentation.
            </p>
          </div>
          <InternationalInvestigationSimulator />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            6.2 Global Cryptocurrency Regulation Overview
          </h2>
          <GlobalCryptoMap />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6.3 Knowledge Check: International Cooperation
          </h2>
          <QuizCard questions={quizQuestions} moduleId="international" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            6.4 Working with Global Law Enforcement Agencies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AgencyCard
              name="Interpol"
              jurisdiction="Global"
              role="Cybercrime Directorate tracks financial crimes and issues Red Notices"
              website="https://www.interpol.int"
            />
            <AgencyCard
              name="Europol (EC3)"
              jurisdiction="European Union"
              role="Investigates money laundering & dark web crypto crime"
              website="https://www.europol.europa.eu"
            />
            <AgencyCard
              name="FATF"
              jurisdiction="Global"
              role="Enforces AML/KYC rules, including the FATF Travel Rule"
              website="https://www.fatf-gafi.org"
            />
            <AgencyCard
              name="FBI Cybercrime Division"
              jurisdiction="United States"
              role="Investigates ransomware, fraud, and crypto-related cybercrime"
              website="https://www.fbi.gov/investigate/cyber"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              How to Engage with International Law Enforcement
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Submit Formal Requests</h4>
                  <p className="text-blue-800">Work through official channels like Interpol and Europol</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Handshake className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Participate in Intelligence Sharing</h4>
                  <p className="text-blue-800">Join networks like Europol's Virtual Currencies Task Force</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Leverage FATF Regulations</h4>
                  <p className="text-blue-800">Use the Travel Rule to obtain sender/receiver data</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            6.5 Engaging Foreign Cryptocurrency Exchanges
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChallengeCard
                icon={Building2}
                title="Jurisdictional Conflicts"
                description="Many exchanges operate in crypto-friendly countries with loose AML laws"
                solution="Focus on regulated exchanges in MLAT-partner countries that are more likely to cooperate"
              />
              <ChallengeCard
                icon={Scale}
                title="Lack of Compliance"
                description="Some offshore exchanges do not follow KYC regulations"
                solution="Work with local law enforcement in the exchange's jurisdiction to obtain records"
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Legal Tools for Engaging Foreign Exchanges
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Mutual Legal Assistance Treaties (MLATs)</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Formal agreements between countries allowing data exchange</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Used to request exchange account records</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Direct Exchange Cooperation</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Many exchanges have compliance teams willing to assist</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Some proactively flag suspicious activity</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Conclusion: Strengthening International Collaboration
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm font-medium">7</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Collaboration with Financial Institutions & Service Providers
                  </h4>
                  <p className="text-gray-600">
                    Learn how to work with banks, exchanges, and compliance teams to track illicit funds
                    and prevent cryptocurrency-based money laundering.
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