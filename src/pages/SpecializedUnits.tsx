import React from 'react';
import { CryptoUnitSimulation } from '../components/CryptoUnitSimulation';
import { TeamBuildingExercise } from '../components/TeamBuildingExercise';
import { ToolSelectionSimulator } from '../components/ToolSelectionSimulator';
import { QuizCard } from '../components/QuizCard';
import {
  Users,
  Shield,
  Database,
  Brain,
  Laptop,
  FileText,
  ArrowRight,
  AlertTriangle,
  Globe,
  BadgeCheck,
  Building2,
  Scale
} from 'lucide-react';

const quizQuestions = [
  {
    question: "Which professional is NOT typically part of a cryptocurrency crime unit?",
    options: [
      "Blockchain forensic analyst",
      "Financial investigator",
      "Forensic pathologist",
      "Cybercrime analyst"
    ],
    correctAnswer: 2,
    explanation: "A forensic pathologist specializes in determining cause of death and is not typically needed for cryptocurrency investigations. The core team usually consists of blockchain analysts, financial investigators, and cybercrime experts."
  },
  {
    question: "What is the biggest advantage of a dedicated crypto crime unit?",
    options: [
      "Faster transaction processing",
      "Specialized expertise in blockchain forensics",
      "The ability to manipulate transactions",
      "The ability to create cryptocurrency"
    ],
    correctAnswer: 1,
    explanation: "A dedicated cryptocurrency crime unit's main advantage is having specialized expertise in blockchain forensics, allowing them to effectively trace transactions, identify patterns, and gather evidence for prosecution."
  },
  {
    question: "Which tool is most important for blockchain analysis?",
    options: [
      "Word processor",
      "Blockchain explorer",
      "Email client",
      "Video editor"
    ],
    correctAnswer: 1,
    explanation: "Blockchain explorers are essential tools for cryptocurrency investigations, allowing investigators to trace transactions, analyze wallet activity, and gather evidence."
  }
];

function RoleCard({
  title,
  responsibilities,
  skills,
  icon: Icon
}: {
  title: string;
  responsibilities: string[];
  skills: string[];
  icon: typeof Shield;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Key Responsibilities:</h4>
          <ul className="space-y-2">
            {responsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                <span className="text-gray-600">{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Required Skills:</h4>
          <ul className="space-y-2">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-start gap-2">
                <BadgeCheck className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-600">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function SpecializedUnits() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Setting Up Specialized Crypto Crime Units
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            8.1 Interactive Exercise: Building Your Crypto Crime Task Force
          </h2>
          <CryptoUnitSimulation />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            8.2 Team Building & Skill Assessment
          </h2>
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Learn to identify and recruit the right professionals for your cryptocurrency
              crime unit. Practice evaluating skills and building effective teams.
            </p>
          </div>
          <TeamBuildingExercise />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            8.3 Forensic Tool Selection
          </h2>
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Choose the right combination of blockchain analysis tools, cybercrime
              investigation software, and forensic equipment for your unit.
            </p>
          </div>
          <ToolSelectionSimulator />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            8.4 Knowledge Check: Specialized Units
          </h2>
          <QuizCard questions={quizQuestions} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            8.5 Core Team Roles & Responsibilities
          </h2>

          <div className="space-y-6">
            <RoleCard
              icon={Database}
              title="Blockchain Forensics Expert"
              responsibilities={[
                "Analyze blockchain transactions",
                "Track illicit fund flows",
                "Identify wallet clusters",
                "Generate forensic reports"
              ]}
              skills={[
                "Blockchain analysis",
                "Forensic tools expertise",
                "Data analysis",
                "Programming knowledge"
              ]}
            />

            <RoleCard
              icon={Shield}
              title="Cybercrime Analyst"
              responsibilities={[
                "Monitor darknet markets",
                "Investigate online fraud",
                "Track hacking groups",
                "Analyze malware"
              ]}
              skills={[
                "Cybersecurity expertise",
                "Dark web investigation",
                "Malware analysis",
                "OSINT techniques"
              ]}
            />

            <RoleCard
              icon={Brain}
              title="Financial Investigator"
              responsibilities={[
                "Trace fiat conversions",
                "Work with banks/exchanges",
                "Monitor suspicious transactions",
                "Analyze money flows"
              ]}
              skills={[
                "Financial investigation",
                "AML compliance",
                "Banking regulations",
                "Transaction analysis"
              ]}
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            8.6 Essential Tools & Technologies
          </h2>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Required Tools by Role
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Database className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Blockchain Analysis</h4>
                        <ul className="mt-2 space-y-1 text-sm text-gray-600">
                          <li>Chainalysis Reactor</li>
                          <li>CipherTrace</li>
                          <li>Elliptic</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Cybercrime Analysis</h4>
                        <ul className="mt-2 space-y-1 text-sm text-gray-600">
                          <li>Maltego</li>
                          <li>Tor Browser</li>
                          <li>Network monitoring tools</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-medium text-blue-900 mb-4">Tool Selection Guidelines:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <BadgeCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900">Court Admissibility</h5>
                      <p className="text-blue-800">
                        Ensure tools generate evidence that will be accepted in court
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900">Training Requirements</h5>
                      <p className="text-blue-800">
                        Consider certification and training needs for each tool
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900">Integration Capabilities</h5>
                      <p className="text-blue-800">
                        Tools should work together and export data in compatible formats
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
            Conclusion: Building an Effective Crypto Crime Unit
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm font-medium">9</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Developing a Legal Framework for Crypto Crime Prosecution
                  </h4>
                  <p className="text-gray-600">
                    Learn how to build strong legal cases, ensure evidence admissibility, and
                    prosecute cryptocurrency criminals effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}