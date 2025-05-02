/** @jsxImportSource react */
import {
  ArrowRight,
  Book,
  Users,
  Globe,
  Database,
  Brain,
  Lock,
  Award,
  CheckCircle,
  Briefcase,
  Star,
  FileText,
  Mail,
  Linkedin,
  ExternalLink,
  Twitter,
  Clock,
  BadgeCheck,
} from "lucide-react";
import { PricingPlans } from "../components/PricingPlans";
import { LearningPathSelector } from "../components/LearningPathSelector";

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-32">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="relative w-32 h-32 flex items-center justify-center transform hover:rotate-6 transition-transform duration-300">
                <img
                  src="/shield.png"
                  className="w-32 h-32"
                  alt="Security Shield"
                />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-6 animate-fade-in-up">
            Cryptocurrency Crime Investigation
          </h1>
          <p className="text-2xl font-medium text-slate-700 mb-2 animate-fade-in-up delay-100">
            Standard Operating Procedures
          </p>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 animate-fade-in-up delay-200">
            Master blockchain forensics, evidence collection, and digital asset
            recovery with our comprehensive training program designed for law
            enforcement professionals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Register/Login
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#features"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 text-lg font-semibold border-2 border-blue-100 transition-all flex items-center gap-2"
            >
              Learn More
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto mt-20">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center transform hover:scale-105 transition-all shadow-sm hover:shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Book className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
            <div className="text-gray-600">Interactive Modules</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center transform hover:scale-105 transition-all shadow-sm hover:shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">Hands-on Exercises</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center transform hover:scale-105 transition-all shadow-sm hover:shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-2">40h</div>
            <div className="text-gray-600">Training Content</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center transform hover:scale-105 transition-all shadow-sm hover:shadow-md">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-4xl font-bold text-yellow-600 mb-2">2</div>
            <div className="text-gray-600">Certifications</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Comprehensive Training Program
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Learn everything you need to know about cryptocurrency crime
              investigation through our structured, hands-on curriculum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Blockchain Analysis",
                description:
                  "Master cryptocurrency tracing techniques and forensic investigation methods",
                features: [
                  "Transaction pattern analysis",
                  "Wallet clustering techniques",
                  "Cross-chain tracking",
                  "Mixer detection",
                ],
              },
              {
                icon: () => (
                  <img
                    src="/shield.png"
                    className="w-8 h-8"
                    alt="Security Shield"
                  />
                ),
                title: "Evidence Collection",
                description:
                  "Learn proper procedures for securing and analyzing digital evidence",
                features: [
                  "Hardware wallet seizure",
                  "Chain of custody",
                  "Mobile device forensics",
                  "Documentation standards",
                ],
              },
              {
                icon: Globe,
                title: "International Operations",
                description:
                  "Navigate cross-border investigations and legal frameworks",
                features: [
                  "MLAT procedures",
                  "Agency cooperation",
                  "Asset recovery",
                  "Jurisdictional challenges",
                ],
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-8 hover:bg-slate-700 transition-colors duration-300"
              >
                <div className="w-14 h-14 bg-blue-900 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-300 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.features.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-slate-300"
                    >
                      <BadgeCheck className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-24 bg-gray-50">
        <PricingPlans />
      </div>

      {/* Authors Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Bryan Daugherty */}
          <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
            {/* <div className="md:w-1/3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-full transform -rotate-6"></div>
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-200 flex items-center justify-center">
                  <Shield className="w-16 h-16 text-gray-400" />
                </div>
              </div>
            </div> */}

            <div className="md:w-3/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                About the Author
              </h2>
              <p className="text-gray-600 mb-6">
                Bryan Daugherty is a trailblazer in blockchain innovation and
                cybersecurity, with over 20 years in enterprise technology. As a
                Subject Matter Expert for the U.S. Department of Defense's CSIAC
                and Global Public Policy Director, he shapes blockchain policy
                across 30+ countries and advises on cybersecurity.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Briefcase className="w-5 h-5 text-gray-800 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">
                      DoD Expert
                    </h3>
                    <p className="text-sm text-gray-600">
                      INTERPOL Challenge Coin recipient
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Globe className="w-5 h-5 text-gray-800 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">
                      Policy Leader
                    </h3>
                    <p className="text-sm text-gray-600">
                      U.S. Congress testimony
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-gray-800 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">
                      Industry Pioneer
                    </h3>
                    <p className="text-sm text-gray-600">
                      SmartLedger & CERTIHASH founder
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <FileText className="w-5 h-5 text-gray-800 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">
                      Thought Leader
                    </h3>
                    <p className="text-sm text-gray-600">
                      Featured in Forbes & WSJ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tyler Fayard */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* <div className="md:w-1/3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-full transform rotate-6"></div>
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-200 flex items-center justify-center">
                  <Search className="w-16 h-16 text-gray-400" />
                </div>
              </div>
            </div> */}

            <div className="md:w-3/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Chief Cryptocurrency Forensics Investigator & Trainer
              </h2>
              <p className="text-gray-600 mb-6">
                Tyler Fayard is a relentless blockchain forensics analyst,
                renowned for tracking and recovering illicit assets in some of
                the most high-profile cryptocurrency thefts. With a strong
                engineering foundation and years of hands-on experience, he has
                pioneered advanced tracing techniques that have led to the
                recovery of billions in stolen digital assets across
                decentralized networks.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-2">
                    <Database className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Forensics Specialist
                      </h3>
                      <p className="text-sm text-gray-600">
                        Innovating new methodologies to trace and analyze
                        complex blockchain transactions
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-2">
                    <img
                      src="/shield.png"
                      className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1"
                      alt="Security Shield"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Asset Recovery Expert
                      </h3>
                      <p className="text-sm text-gray-600">
                        Successfully recovered billions in misappropriated
                        cryptocurrency assets
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Industry Authority
                      </h3>
                      <p className="text-sm text-gray-600">
                        Recognized thought leader featured in major blockchain
                        publications
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <a
                  href="https://www.linkedin.com/in/tylerfayard/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-800 hover:text-gray-900"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="font-medium">LinkedIn</span>
                </a>
                <a
                  href="https://x.com/BoringSleuth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-800 hover:text-gray-900"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="font-medium">@BoringSleuth</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Innovation Section */}
      <div className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Innovating Justice in the Digital Age
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Justice demands trust, transparency, and security. Blockchain
                technology is revolutionizing law enforcement—preserving legal
                evidence, enhancing collaboration, and ensuring accountability
                like never before.
              </p>
              <div className="bg-slate-800 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Book className="w-6 h-6 text-blue-400" />
                  Free eBook: Innovating Justice
                </h3>
                <p className="text-slate-300 mb-4">
                  Get your on-chain copy of the complete guide to
                  blockchain-powered law enforcement.
                </p>
                <a
                  href="https://web3media.org/media/85c715101f565e4580ad5a26d7f98f2c70993967eed88552d1a810e2da4fba75/0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                >
                  Download eBook
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Lock className="w-4 h-4" />
                <span>Verified on-chain:</span>
                <a
                  href="https://whatsonchain.com/tx/85c715101f565e4580ad5a26d7f98f2c70993967eed88552d1a810e2da4fba75"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-mono truncate"
                >
                  85c715...fba75
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800 p-6 rounded-lg">
                <img
                  src="/shield.png"
                  className="w-8 h-8 text-blue-400 mb-4"
                  alt="Security Shield"
                />
                <h3 className="font-semibold mb-2">Immutable Evidence</h3>
                <p className="text-slate-300 text-sm">
                  Preserve legal evidence with tamper-proof blockchain records
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <Users className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-semibold mb-2">Enhanced Collaboration</h3>
                <p className="text-slate-300 text-sm">
                  Seamless data sharing between agencies and jurisdictions
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <Database className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-semibold mb-2">Secure Storage</h3>
                <p className="text-slate-300 text-sm">
                  Permanent, verifiable storage of case files and evidence
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <Brain className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-semibold mb-2">AI Integration</h3>
                <p className="text-slate-300 text-sm">
                  Smart analytics for enhanced crime prevention
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/shield.png" className="w-6 h-6" alt="Security Shield" />
            <span className="text-xl font-semibold text-slate-900">
              SmartLedger
            </span>
          </div>
          <div className="flex items-center justify-center gap-6 mb-4">
            <a
              href="https://x.com/Smart_Ledger"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-800 hover:text-slate-900"
            >
              <Twitter className="w-5 h-5" />
              <span className="font-medium">@Smart_Ledger</span>
            </a>
            <a
              href="https://www.linkedin.com/company/73814824"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-800 hover:text-slate-900"
            >
              <Linkedin className="w-5 h-5" />
              <span className="font-medium">LinkedIn</span>
            </a>
            <a
              href="mailto:yourfriends@smartledger.solutions"
              className="flex items-center gap-2 text-slate-800 hover:text-slate-900"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">Email</span>
            </a>
          </div>
          <div className="text-slate-600">
            <span>&copy; 2025</span>
            <span className="mx-2">|</span>
            <a
              href="https://smartledger.solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-800 hover:text-slate-900"
            >
              SmartLedger Solutions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
