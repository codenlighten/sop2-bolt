import React from 'react';
import { CrimeSceneWalkthrough } from '../components/CrimeSceneWalkthrough';
import { DigitalEvidenceAnalyzer } from '../components/DigitalEvidenceAnalyzer';
import { CyberTrainingSimulator } from '../components/CyberTrainingSimulator';
import { QuizCard } from '../components/QuizCard';
import { ChapterBadges } from '../components/ChapterBadges';
import { chapters } from '../data/chapters';
import { 
  Shield, 
  Smartphone, 
  HardDrive, 
  FileText, 
  AlertTriangle,
  ArrowRight,
  Lock,
  Camera,
  Wifi,
  Link,
  FileWarning,
  Fingerprint 
} from 'lucide-react';

const quizQuestions = [
  {
    question: "What is the best practice when encountering a hardware wallet at a crime scene?",
    options: [
      "Immediately try entering possible PINs",
      "Photograph and document the device before handling",
      "Turn off the suspect's phone",
      "Plug it into a computer for analysis"
    ],
    correctAnswer: 1,
    explanation: "Always photograph and document hardware wallets in their original location before handling. This preserves the crime scene and provides crucial evidence about the device's context and condition."
  },
  {
    question: "Why should mobile devices be placed in a Faraday bag?",
    options: [
      "To block remote access and prevent evidence tampering",
      "To prevent battery drain",
      "To activate self-destruct mode",
      "To clean up transaction records"
    ],
    correctAnswer: 0,
    explanation: "Faraday bags block all wireless signals, preventing remote access that could be used to wipe data, transfer funds, or tamper with evidence on the device."
  },
  {
    question: "What should be documented about a paper wallet?",
    options: [
      "Only the public address",
      "Just take a photo of it",
      "All visible information including QR codes and notes",
      "The paper type and size"
    ],
    correctAnswer: 2,
    explanation: "Document all visible information on paper wallets, including public/private keys, QR codes, and any handwritten notes, as these could be crucial for accessing funds or understanding the suspect's activities."
  }
];

function ProcedureCard({ 
  icon: Icon, 
  title, 
  steps 
}: { 
  icon: typeof Shield;
  title: string;
  steps: string[];
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
          <ul className="space-y-3">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gray-600 text-sm font-medium">{index + 1}</span>
                </div>
                <span className="text-gray-600">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function EvidenceTypeCard({
  icon: Icon,
  title,
  items,
  warning
}: {
  icon: typeof Shield;
  title: string;
  items: string[];
  warning?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <ul className="space-y-2 mb-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-gray-600">{item}</span>
          </li>
        ))}
      </ul>
      {warning && (
        <div className="flex items-start gap-2 mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <p className="text-sm text-amber-800">{warning}</p>
        </div>
      )}
    </div>
  );
}

export function CrimeScene({ onComplete }: { onComplete?: () => void }) {
  const crimeSceneChapter = chapters.find(c => c.id === 'crime-scene');
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Crime Scene Handling & Evidence Collection
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            4.1 Interactive Training: Digital Evidence Recognition
          </h2>
          <CrimeSceneWalkthrough />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            4.2 Digital Evidence Classification Exercise
          </h2>
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Learn to identify and properly handle different types of cryptocurrency-related
              evidence found at crime scenes. Understanding proper classification and handling
              procedures is crucial for maintaining chain of custody.
            </p>
          </div>
          <DigitalEvidenceAnalyzer />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            4.3 Cyber Crime Scene Investigation Training
          </h2>
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Practice investigating cryptocurrency-related crime scenes through realistic
              scenarios. Learn proper evidence handling, documentation, and chain of custody
              procedures.
            </p>
          </div>
          <CyberTrainingSimulator />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4.4 Knowledge Check: Evidence Handling Procedures
          </h2>
          <QuizCard questions={quizQuestions} moduleId="crime_scene" />
        </section>

        {crimeSceneChapter && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Badges for this Chapter
            </h2>
            <ChapterBadges chapter={crimeSceneChapter} />
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            4.5 First Responder Procedures at Digital Crime Scenes
          </h2>

          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Handling cryptocurrency-related crime scenes requires specialized procedures to prevent
              tampering, remote access, or destruction of digital evidence. Unlike traditional
              financial crimes, cryptocurrency assets can be transferred instantly if the suspect
              has remote access to their wallet, making rapid intervention critical.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              Key Principles for First Responders:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-blue-800">
                  Preserve all digital evidence immediately. Cryptocurrency wallets, transaction logs,
                  and private keys can be stored on various devices.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Wifi className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-blue-800">
                  Prevent suspect-initiated asset transfers. A suspect can remotely move or erase
                  digital assets using another device or internet access.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Link className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-blue-800">
                  Ensure proper documentation and chain of custody. Courts require meticulous
                  handling of digital evidence to ensure its admissibility.
                </span>
              </li>
            </ul>
          </div>

          <ProcedureCard
            icon={Shield}
            title="Initial Steps Upon Arrival"
            steps={[
              "Secure the scene and restrict access to all electronic devices",
              "Prevent suspects from using phones, laptops, or networked devices",
              "Document and photograph all potential digital evidence before handling",
              "Place mobile devices in Airplane Mode and use Faraday bags",
              "Look for hardware wallets, USB drives, and handwritten seed phrases"
            ]}
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            4.6 Identifying and Securing Cryptocurrency-Related Evidence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EvidenceTypeCard
              icon={HardDrive}
              title="Physical Evidence"
              items={[
                "Hardware Wallets (Ledger, Trezor, KeepKey)",
                "Paper Wallets & Seed Phrases",
                "USB Drives & External Hard Drives",
                "Mobile Devices & Laptops",
                "Crypto Mining Equipment"
              ]}
              warning="Never attempt to access hardware wallets - multiple failed PIN attempts can trigger self-destruct mechanisms"
            />

            <EvidenceTypeCard
              icon={FileText}
              title="Digital Evidence"
              items={[
                "Wallet Applications",
                "Exchange Account Logins",
                "Browser History & Bookmarks",
                "Private Key Files",
                "Encrypted Notes & Password Managers"
              ]}
              warning="Take screenshots of unlocked devices before securing them - wallet access may be lost once devices are locked"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            4.7 Handling Digital Devices
          </h2>

          <div className="space-y-6">
            <ProcedureCard
              icon={Smartphone}
              title="Mobile Phones & Computers"
              steps={[
                "Do not interact with open wallet apps - take screenshots first",
                "Enable Airplane Mode immediately",
                "Disable Wi-Fi, Bluetooth, and mobile data",
                "Use Faraday bags to prevent remote access",
                "Document all visible crypto balances and transactions"
              ]}
            />

            <ProcedureCard
              icon={HardDrive}
              title="USB Drives & Hardware Wallets"
              steps={[
                "Do not plug USB drives into computers - may trigger auto-delete scripts",
                "Label and photograph all hardware wallets",
                "Document serial numbers and physical condition",
                "Store in anti-static bags to prevent damage",
                "Check for hidden partitions or encrypted files"
              ]}
            />

            <ProcedureCard
              icon={FileText}
              title="Paper Wallets & Seed Phrases"
              steps={[
                "Do not fold or alter paper wallets - preserve physical integrity",
                "Photograph all seed phrases and QR codes",
                "Store in evidence bags to prevent tampering",
                "Document exact location and condition found",
                "Handle with gloves to preserve potential fingerprints"
              ]}
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            4.8 Chain of Custody for Digital Evidence
          </h2>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Fingerprint className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Best Practices for Chain of Custody
              </h3>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Documentation</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <Camera className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Photograph all evidence in original location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileWarning className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Record serial numbers and identifying marks</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Storage</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Use tamper-evident bags and seals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Secure storage with limited access</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-medium text-amber-900 mb-2">Prosecutor's Note:</h4>
                <p className="text-sm text-amber-800">
                  Without proper documentation, defense attorneys can argue that digital evidence
                  was mishandled or tampered with, potentially making seized cryptocurrency
                  inadmissible in court.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Conclusion: Securing Digital Evidence
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm font-medium">5</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Digital Asset Recovery & Blockchain Forensics</h4>
                  <p className="text-gray-600">
                    Learn how to trace illicit transactions, recover stolen crypto, and leverage
                    forensic tools for investigations.
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