import React from 'react';
import { CourtroomSimulation } from '../components/CourtroomSimulation';
import { QuizCard } from '../components/QuizCard';
import {
  Scale,
  AlertTriangle,
  ArrowRight,
  FileText,
  Shield,
  Globe,
  Lock,
  BadgeCheck,
  Building2,
  Gavel,
  FileSearch,
  Link
} from 'lucide-react';

const quizQuestions = [
  {
    question: "What is required for blockchain evidence to be admissible in court?",
    options: [
      "Only a screenshot of transactions",
      "Proper documentation and chain of custody",
      "Witness testimony only",
      "Suspect confession"
    ],
    correctAnswer: 1,
    explanation: "Blockchain evidence requires proper documentation and chain of custody to be admissible in court, including how it was collected, preserved, and analyzed."
  },
  {
    question: "Which legal principle is most relevant to cryptocurrency seizure?",
    options: [
      "Double jeopardy",
      "Civil forfeiture",
      "Miranda rights",
      "Statute of limitations"
    ],
    correctAnswer: 1,
    explanation: "Civil forfeiture laws are most commonly used in cryptocurrency seizures, allowing law enforcement to seize assets linked to criminal activity."
  },
  {
    question: "What is required for a valid cryptocurrency search warrant?",
    options: [
      "Only the wallet address",
      "Specific digital evidence and locations to be searched",
      "Exchange account only",
      "General description of crypto assets"
    ],
    correctAnswer: 1,
    explanation: "Search warrants for cryptocurrency must specifically describe the digital evidence to be seized and the locations to be searched, including devices and digital storage locations."
  }
];

interface LegalFrameworkProps {
  onComplete?: () => void;
}

export function LegalFramework({ onComplete }: LegalFrameworkProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Legal Framework for Crypto Crime Prosecution
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            9.1 Interactive Exercise: Building a Crypto Crime Case
          </h2>
          <CourtroomSimulation />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            9.2 Knowledge Check: Legal Framework
          </h2>
          <QuizCard questions={quizQuestions} moduleId="legal_framework" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            9.3 Legal Considerations for Cryptocurrency Cases
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Evidence Admissibility Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Documentation</h4>
                      <p className="text-sm text-gray-600">
                        Maintain detailed records of evidence collection and analysis
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Chain of Custody</h4>
                      <p className="text-sm text-gray-600">
                        Track all access and transfers of digital evidence
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-medium text-blue-900 mb-4">Legal Requirements:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Scale className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900">Proper Authorization</h5>
                    <p className="text-blue-800">
                      Ensure all searches and seizures are legally authorized
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900">Jurisdiction</h5>
                    <p className="text-blue-800">
                      Consider international laws and cross-border requirements
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900">Privacy Laws</h5>
                    <p className="text-blue-800">
                      Comply with data protection and privacy regulations
                    </p>
                  </div>
                </li>
              </ul>
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