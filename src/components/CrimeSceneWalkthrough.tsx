import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { 
  Laptop, 
  Smartphone, 
  HardDrive, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Camera, 
  Search, 
  Shield, 
  Lock, 
  Wallet, 
  Key,
  ArrowRight
} from 'lucide-react';

interface Evidence {
  id: string;
  type: 'hardware_wallet' | 'paper_wallet' | 'phone' | 'usb' | 'laptop' | 'seed_phrase' | 'mining_equipment';
  name: string;
  description: string;
  imageUrl: string;
  icon: typeof Laptop;
  position: { x: number; y: number };
  found: boolean;
  handlingInstructions: string[];
  technicalDetails: string[];
  legalConsiderations: string[];
  commonMistakes: string[];
  forensicValue: string[];
  chainOfCustody: {
    steps: string[];
    documentation: string[];
    storage: string;
  };
}

const evidenceItems: Evidence[] = [
  {
    id: 'hw1',
    type: 'hardware_wallet',
    name: 'Ledger Nano X',
    description: 'Hardware cryptocurrency wallet found on desk',
    imageUrl: 'https://sentinelnode.online/wp-content/uploads/2025/03/DALL·E-2025-03-06-15.41.40-A-professional-studio-photograph-of-a-Ledger-Nano-X-cryptocurrency-hardware-wallet-on-a-white-background.-The-device-is-sleek-modern-and-slightly-op.webp',
    icon: HardDrive,
    position: { x: 30, y: 40 },
    found: false,
    handlingInstructions: [
      'Photograph in original location',
      'Document serial number and condition',
      'Do not attempt to access or power on',
      'Place in anti-static bag',
      'Label as potential crypto evidence',
      'Document any visible display information'
    ],
    technicalDetails: [
      'May contain multiple cryptocurrency wallets',
      'PIN protection likely enabled',
      'Could have hidden wallets/passphrases',
      'Firmware version may be relevant'
    ],
    legalConsiderations: [
      'Requires separate warrant for access',
      'Fifth amendment implications',
      'International jurisdiction issues',
      'Data privacy regulations'
    ],
    commonMistakes: [
      'Attempting to guess PIN (may trigger wipe)',
      'Connecting to computer without write blocker',
      'Failing to document screen contents',
      'Not preserving battery state'
    ],
    forensicValue: [
      'Access to cryptocurrency funds',
      'Transaction history',
      'Wallet addresses',
      'Connected accounts'
    ],
    chainOfCustody: {
      steps: [
        'Photograph in situ',
        'Document condition',
        'Package in anti-static bag',
        'Seal and label',
        'Transport to secure storage'
      ],
      documentation: [
        'Serial number',
        'Physical condition',
        'Location found',
        'Visible display info',
        'Handling personnel'
      ],
      storage: 'Temperature-controlled secure evidence locker'
    }
  },
  {
    id: 'ph1',
    type: 'phone',
    name: 'Mobile Phone with Crypto Apps',
    description: 'Unlocked smartphone showing crypto wallet applications',
    imageUrl: 'https://sentinelnode.online/wp-content/uploads/2025/03/DALL·E-2025-03-06-15.41.29-A-professional-studio-photograph-of-a-modern-mobile-phone-on-a-white-background.-The-phone-has-a-sleek-minimalistic-design-with-a-large-edge-to-edge-.webp',
    icon: Smartphone,
    position: { x: 60, y: 30 },
    found: false,
    handlingInstructions: [
      'Take screenshots of visible apps',
      'Enable airplane mode immediately',
      'Document visible account balances',
      'Place in Faraday bag',
      'Record unlock method if known',
      'Preserve battery charge'
    ],
    technicalDetails: [
      'Multiple wallet apps may be present',
      'Exchange apps with balances',
      'Authentication tokens',
      '2FA backup codes possible'
    ],
    legalConsiderations: [
      'Mobile device privacy laws',
      'Biometric access issues',
      'Cloud data jurisdiction',
      'App-specific warrants needed'
    ],
    commonMistakes: [
      'Not capturing visible screens',
      'Allowing device to lock',
      'Missing 2FA backup codes',
      'Network connection exposure'
    ],
    forensicValue: [
      'Wallet access and balances',
      'Exchange account access',
      'Communication records',
      'Transaction history'
    ],
    chainOfCustody: {
      steps: [
        'Screenshot visible apps',
        'Enable airplane mode',
        'Place in Faraday bag',
        'Seal and label',
        'Document battery status'
      ],
      documentation: [
        'Device model/IMEI',
        'Unlock status',
        'Visible apps',
        'Battery level',
        'Network status'
      ],
      storage: 'Faraday-shielded evidence locker'
    }
  },
  {
    id: 'pw1',
    type: 'paper_wallet',
    name: 'Paper Wallet',
    description: 'Paper containing QR codes and public/private keys',
    imageUrl: 'https://sentinelnode.online/wp-content/uploads/2025/03/DALL·E-2025-03-06-15.41.37-A-professional-studio-photograph-of-a-cryptocurrency-paper-wallet-on-a-white-background.-The-wallet-is-a-printed-document-featuring-a-QR-code-and-alph.webp',
    icon: FileText,
    position: { x: 45, y: 70 },
    found: false,
    handlingInstructions: [
      'Photograph in place before handling',
      'Handle with gloves to preserve prints',
      'Store in evidence bag',
      'Document exact location found',
      'Protect from moisture/damage',
      'Maintain document integrity'
    ],
    technicalDetails: [
      'Contains public/private keys',
      'QR codes for quick access',
      'May have multiple addresses',
      'Could include recovery phrases'
    ],
    legalConsiderations: [
      'Document seizure laws',
      'Private key protection',
      'Asset forfeiture rules',
      'Evidence authentication'
    ],
    commonMistakes: [
      'Damaging paper/creasing',
      'Exposing private keys',
      'Poor quality photos',
      'Contaminating evidence'
    ],
    forensicValue: [
      'Direct wallet access',
      'Asset recovery potential',
      'Forensic trace evidence',
      'Handwriting analysis'
    ],
    chainOfCustody: {
      steps: [
        'Photograph in place',
        'Handle with gloves',
        'Place in evidence bag',
        'Seal and label',
        'Store flat'
      ],
      documentation: [
        'Location found',
        'Physical condition',
        'Visible markings',
        'QR code presence',
        'Paper type/quality'
      ],
      storage: 'Flat document storage in evidence locker'
    }
  },
  {
    id: 'seed1',
    type: 'seed_phrase',
    name: 'Recovery Seed Phrase',
    description: 'Handwritten list of 12-24 words for wallet recovery',
    imageUrl: 'https://sentinelnode.online/wp-content/uploads/2025/03/DALL·E-2025-03-06-15.41.33-A-professional-studio-photograph-of-a-cryptocurrency-recovery-seed-phrase-backup-card-on-a-white-background.-The-card-is-metallic-or-sturdy-paper-fea.webp',
    icon: Key,
    position: { x: 75, y: 60 },
    found: false,
    handlingInstructions: [
      'Document exact location and condition',
      'Photograph before handling',
      'Store in evidence bag',
      'Maintain chain of custody',
      'Protect word sequence',
      'Handle as high-value evidence'
    ],
    technicalDetails: [
      'BIP39 word list standard',
      'Multiple wallet compatibility',
      'Hierarchical derivation',
      'Passphrase possibilities'
    ],
    legalConsiderations: [
      'High-value asset access',
      'Privacy protections',
      'Asset seizure laws',
      'International jurisdiction'
    ],
    commonMistakes: [
      'Missing word sequence',
      'Poor documentation',
      'Exposing to unauthorized personnel',
      'Improper storage'
    ],
    forensicValue: [
      'Complete wallet access',
      'Multiple wallet recovery',
      'Asset seizure capability',
      'Investigation leverage'
    ],
    chainOfCustody: {
      steps: [
        'Photograph in place',
        'Document word sequence',
        'Secure in evidence bag',
        'Seal and label',
        'Restricted access storage'
      ],
      documentation: [
        'Word sequence',
        'Format/medium',
        'Location found',
        'Physical condition',
        'Associated items'
      ],
      storage: 'High-security evidence safe'
    }
  },
  {
    id: 'lt1',
    type: 'laptop',
    name: 'Laptop',
    description: 'An unlocked laptop with crypto exchange tabs open',
    icon: Laptop,
    position: { x: 20, y: 55 },
    found: false,
    handlingInstructions: [
      'Document visible screen contents',
      'Photograph open applications',
      'Do not close or modify windows',
      'Prepare for forensic imaging',
      'Maintain power if running',
      'Use write blocker for access'
    ],
    technicalDetails: [
      'Exchange login sessions',
      'Wallet software installed',
      'Browser history/cookies',
      'Encrypted volumes possible'
    ],
    legalConsiderations: [
      'Electronic device privacy',
      'Encryption legislation',
      'Cloud data access',
      'International servers'
    ],
    commonMistakes: [
      'Allowing screen lock',
      'Not capturing RAM',
      'Missing browser data',
      'Power loss issues'
    ],
    forensicValue: [
      'Exchange access',
      'Trading history',
      'Communication records',
      'Wallet software'
    ],
    chainOfCustody: {
      steps: [
        'Document screen state',
        'Photograph applications',
        'Secure power state',
        'Prepare for imaging',
        'Transport safely'
      ],
      documentation: [
        'Running applications',
        'Open windows/tabs',
        'Power state',
        'Drive encryption',
        'Network connections'
      ],
      storage: 'Digital forensics lab'
    }
  }
];

export function CrimeSceneWalkthrough({ moduleId = 'crime_scene' }) {
  const [foundEvidence, setFoundEvidence] = useState<Set<string>>(new Set());
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [showTechnical, setShowTechnical] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);
  const { updateSimulationScore } = useProgress();

  const handleEvidenceClick = (evidence: Evidence) => {
    const newFound = new Set(foundEvidence);
    newFound.add(evidence.id);
    setFoundEvidence(newFound);
    setSelectedEvidence(evidence);

    if (newFound.size === evidenceItems.length) {
      setGameComplete(true);
      const score = Math.round((newFound.size / evidenceItems.length) * 100);
      updateSimulationScore(moduleId, score);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Virtual Crime Scene Investigation
        </h3>
        <p className="text-gray-600">
          Search the crime scene for digital evidence. Click on suspicious items to identify and learn
          proper handling procedures. Pay attention to cryptocurrency-related evidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
        {/* Crime Scene Area */}
        <div className="relative bg-gray-100 rounded-lg aspect-square">
          <div className="absolute inset-0 p-4">
            {evidenceItems.map(evidence => {
              const Icon = evidence.icon;
              const isFound = foundEvidence.has(evidence.id);

              return (
                <button
                  key={evidence.id}
                  className={`absolute p-2 rounded-full transition-all ${
                    isFound 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-200 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                  }`}
                  style={{
                    left: `${evidence.position.x}%`,
                    top: `${evidence.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => handleEvidenceClick(evidence)}
                >
                  <Icon className="w-6 h-6" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Evidence Details */}
        <div className="bg-gray-50 rounded-lg p-4">
          {selectedEvidence ? (
            <div className="space-y-4">
              {selectedEvidence.imageUrl && (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-white">
                  <img
                    src={selectedEvidence.imageUrl}
                    alt={selectedEvidence.name}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <selectedEvidence.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{selectedEvidence.name}</h4>
                  <p className="text-gray-600">{selectedEvidence.description}</p>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Handling Instructions:</h5>
                <ul className="space-y-2">
                  {selectedEvidence.handlingInstructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  onClick={() => setShowTechnical(!showTechnical)}
                >
                  {showTechnical ? 'Hide' : 'Show'} Technical Details
                </button>

                {showTechnical && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-2">Technical Considerations:</h5>
                    <ul className="space-y-2">
                      {selectedEvidence.technicalDetails.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                          <span className="text-blue-800">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  onClick={() => setShowLegal(!showLegal)}
                >
                  {showLegal ? 'Hide' : 'Show'} Legal Considerations
                </button>

                {showLegal && (
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h5 className="font-medium text-purple-900 mb-2">Legal Requirements:</h5>
                    <ul className="space-y-2">
                      {selectedEvidence.legalConsiderations.map((consideration, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Lock className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                          <span className="text-purple-800">{consideration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  onClick={() => setShowMistakes(!showMistakes)}
                >
                  {showMistakes ? 'Hide' : 'Show'} Common Mistakes
                </button>

                {showMistakes && (
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h5 className="font-medium text-red-900 mb-2">Avoid These Mistakes:</h5>
                    <ul className="space-y-2">
                      {selectedEvidence.commonMistakes.map((mistake, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                          <span className="text-red-800">{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h5 className="font-medium text-green-900 mb-2">Chain of Custody:</h5>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-green-800 mb-1">Required Steps:</div>
                    <ul className="space-y-1">
                      {selectedEvidence.chainOfCustody.steps.map((step, index) => (
                        <li key={index} className="flex items-center gap-2 text-green-700">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-green-800 text-xs">{index + 1}</span>
                          </div>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-800 mb-1">Documentation:</div>
                    <ul className="space-y-1">
                      {selectedEvidence.chainOfCustody.documentation.map((doc, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-green-700">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-800 mb-1">Storage Requirements:</div>
                    <p className="text-green-700">{selectedEvidence.chainOfCustody.storage}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Search className="w-8 h-8 mx-auto mb-2" />
                <p>Click on evidence items to inspect them</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-blue-600" />
          <span className="text-gray-900">
            Evidence Found: {foundEvidence.size} / {evidenceItems.length}
          </span>
        </div>
        {gameComplete && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span>Scene Processing Complete!</span>
          </div>
        )}
      </div>

      {/* Educational Tips */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">Investigation Tips:</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Document everything before moving or handling evidence
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Maintain strict chain of custody for all digital evidence
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Use proper tools and containers for each type of evidence
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Consider both physical and digital aspects of crypto evidence
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}