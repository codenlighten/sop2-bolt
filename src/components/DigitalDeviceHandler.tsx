import React, { useState } from 'react';
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
  Database,
  ArrowRight,
  Scale,
  FileWarning
} from 'lucide-react';

interface DeviceType {
  id: string;
  name: string;
  icon: typeof Laptop;
  description: string;
  criticalWarnings: string[];
  handlingSteps: {
    initial: string[];
    documentation: string[];
    collection: string[];
    storage: string[];
  };
  technicalConsiderations: string[];
  legalRequirements: string[];
  commonMistakes: string[];
  forensicValue: string[];
  chainOfCustody: {
    documentation: string[];
    packaging: string[];
    storage: string;
    access: string[];
  };
}

const deviceTypes: DeviceType[] = [
  {
    id: 'hardware_wallet',
    name: 'Hardware Cryptocurrency Wallets',
    icon: HardDrive,
    description: 'Physical devices specifically designed for secure cryptocurrency storage',
    criticalWarnings: [
      'DO NOT attempt to access or unlock the device',
      'Multiple failed PIN attempts may trigger self-destruct',
      'Power state must be preserved if device is on',
      'May contain hidden wallets with different PINs'
    ],
    handlingSteps: {
      initial: [
        'Photograph device in original location',
        'Document visible display information',
        'Note any connected cables/devices',
        'Record power state (on/off)'
      ],
      documentation: [
        'Record make and model',
        'Document serial number',
        'Note physical condition',
        'Photograph all sides of device'
      ],
      collection: [
        'Use anti-static bags for storage',
        'Maintain device power state',
        'Label all components',
        'Secure any associated PINs/passwords found'
      ],
      storage: [
        'Store in temperature-controlled environment',
        'Keep away from magnetic fields',
        'Maintain power if device was on',
        'Secure in evidence locker'
      ]
    },
    technicalConsiderations: [
      'Different models require different handling',
      'May contain multiple cryptocurrency wallets',
      'Firmware version may be relevant',
      'Could have passphrase protection'
    ],
    legalRequirements: [
      'Warrant must specify cryptocurrency devices',
      'Fifth amendment implications for passwords',
      'International jurisdiction issues',
      'Asset seizure documentation'
    ],
    commonMistakes: [
      'Attempting to guess PIN codes',
      'Connecting to computers without write blockers',
      'Failing to document display contents',
      'Improper storage conditions'
    ],
    forensicValue: [
      'Direct access to cryptocurrency funds',
      'Transaction history',
      'Wallet addresses',
      'Potential recovery phrases'
    ],
    chainOfCustody: {
      documentation: [
        'Initial location and condition',
        'Handling personnel details',
        'Time and date of collection',
        'Transfer history'
      ],
      packaging: [
        'Anti-static bags',
        'Evidence tape',
        'Tamper-evident seals',
        'Proper labeling'
      ],
      storage: 'Temperature-controlled secure evidence locker',
      access: [
        'Limited to authorized personnel',
        'Access log maintenance',
        'Dual-custody procedures',
        'Documentation of all access'
      ]
    }
  },
  {
    id: 'mobile_device',
    name: 'Mobile Devices with Crypto Apps',
    icon: Smartphone,
    description: 'Smartphones and tablets containing cryptocurrency wallets and exchange apps',
    criticalWarnings: [
      'DO NOT allow device to lock if found unlocked',
      'Enable airplane mode immediately',
      'Risk of remote wipe commands',
      'Cryptocurrency apps may auto-logout'
    ],
    handlingSteps: {
      initial: [
        'Enable airplane mode immediately',
        'Document visible apps/screens',
        'Photograph device state',
        'Record battery level'
      ],
      documentation: [
        'Record make/model/IMEI',
        'Note visible apps',
        'Document lock status',
        'Capture screen contents'
      ],
      collection: [
        'Use Faraday bags/containers',
        'Maintain power if needed',
        'Secure charging cables',
        'Document passwords if available'
      ],
      storage: [
        'Keep in Faraday environment',
        'Maintain power supply',
        'Temperature control',
        'Secure storage'
      ]
    },
    technicalConsiderations: [
      'Multiple wallet apps possible',
      'Exchange apps with active sessions',
      'Two-factor authentication',
      'Cloud backup implications'
    ],
    legalRequirements: [
      'Mobile device search warrant specifics',
      'Biometric access considerations',
      'Data privacy regulations',
      'International data access'
    ],
    commonMistakes: [
      'Not photographing unlocked screens',
      'Allowing device to lock',
      'Network connection exposure',
      'Battery depletion'
    ],
    forensicValue: [
      'Active wallet sessions',
      'Exchange account access',
      'Transaction history',
      'Communication records'
    ],
    chainOfCustody: {
      documentation: [
        'Device state at seizure',
        'Network status',
        'Battery level',
        'Visible applications'
      ],
      packaging: [
        'Faraday bags',
        'Evidence seals',
        'Proper labeling',
        'Power maintenance'
      ],
      storage: 'Faraday-shielded evidence locker',
      access: [
        'Forensic lab access only',
        'Access documentation',
        'Power maintenance log',
        'Examination records'
      ]
    }
  },
  {
    id: 'computer',
    name: 'Computers with Wallet Software',
    icon: Laptop,
    description: 'Desktop or laptop computers containing cryptocurrency software and data',
    criticalWarnings: [
      'DO NOT shut down if running',
      'RAM contents are volatile',
      'Active wallets may be unlocked',
      'Remote access possible'
    ],
    handlingSteps: {
      initial: [
        'Document running programs',
        'Photograph open windows',
        'Record network connections',
        'Note power status'
      ],
      documentation: [
        'Hardware specifications',
        'Running processes',
        'Open applications',
        'Network status'
      ],
      collection: [
        'Use write blockers',
        'Capture RAM if running',
        'Secure power supply',
        'Label all components'
      ],
      storage: [
        'Maintain evidence integrity',
        'Proper ventilation',
        'Power considerations',
        'Secure storage'
      ]
    },
    technicalConsiderations: [
      'Encrypted volumes possible',
      'Virtual machines',
      'Multiple wallets',
      'Mining software'
    ],
    legalRequirements: [
      'Computer search warrant',
      'Data privacy laws',
      'Encryption regulations',
      'Business records'
    ],
    commonMistakes: [
      'Improper shutdown',
      'No RAM capture',
      'Missing volatile data',
      'Poor documentation'
    ],
    forensicValue: [
      'Wallet software',
      'Transaction records',
      'Exchange access',
      'Communication data'
    ],
    chainOfCustody: {
      documentation: [
        'System state',
        'Running applications',
        'Network connections',
        'Storage media'
      ],
      packaging: [
        'Static protection',
        'Evidence seals',
        'Component labeling',
        'Cable management'
      ],
      storage: 'Climate-controlled secure storage',
      access: [
        'Forensic lab access',
        'Write blocker use',
        'Access logging',
        'Analysis documentation'
      ]
    }
  }
];

export function DigitalDeviceHandler() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType | null>(null);
  const [showTechnical, setShowTechnical] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);
  const [showChainOfCustody, setShowChainOfCustody] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Digital Device Handling Procedures
        </h3>
        <p className="text-gray-600">
          Learn proper handling procedures for different types of devices containing cryptocurrency
          evidence. Follow these guidelines to maintain evidence integrity and chain of custody.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device Selection */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Select Device Type:</h4>
          <div className="space-y-4">
            {deviceTypes.map(device => {
              const Icon = device.icon;
              return (
                <button
                  key={device.id}
                  className={`w-full p-4 text-left rounded-lg border transition-colors ${
                    selectedDevice?.id === device.id
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedDevice(device)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h5 className="font-medium text-gray-900">{device.name}</h5>
                  </div>
                  <p className="text-sm text-gray-600">{device.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Device Handling Instructions */}
        <div>
          {selectedDevice ? (
            <div className="space-y-6">
              {/* Critical Warnings */}
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h4 className="font-medium text-red-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Critical Warnings
                </h4>
                <ul className="space-y-2">
                  {selectedDevice.criticalWarnings.map((warning, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                      <span className="text-red-800">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Handling Steps */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Handling Procedure:</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">1. Initial Response:</h5>
                    <ul className="space-y-2">
                      {selectedDevice.handlingSteps.initial.map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">2. Documentation:</h5>
                    <ul className="space-y-2">
                      {selectedDevice.handlingSteps.documentation.map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Camera className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">3. Collection:</h5>
                    <ul className="space-y-2">
                      {selectedDevice.handlingSteps.collection.map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">4. Storage:</h5>
                    <ul className="space-y-2">
                      {selectedDevice.handlingSteps.storage.map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Lock className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowTechnical(!showTechnical)}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  {showTechnical ? 'Hide' : 'Show'} Technical Considerations
                </button>

                {showTechnical && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-2">Technical Details:</h5>
                    <ul className="space-y-2">
                      {selectedDevice.technicalConsiderations.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Database className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                          <span className="text-blue-800">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => setShowLegal(!showLegal)}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  {showLegal ? 'Hide' : 'Show'} Legal Requirements
                </button>

                {showLegal && (
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h5 className="font-medium text-purple-900 mb-2">Legal Considerations:</h5>
                    <ul className="space-y-2">
                      {selectedDevice.legalRequirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Scale className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                          <span className="text-purple-800">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => setShowMistakes(!showMistakes)}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  {showMistakes ? 'Hide' : 'Show'} Common Mistakes
                </button>

                {showMistakes && (
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h5 className="font-medium text-red-900 mb-2">Avoid These Mistakes:</h5>
                    <ul className="space-y-2">
                      {selectedDevice.commonMistakes.map((mistake, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                          <span className="text-red-800">{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => setShowChainOfCustody(!showChainOfCustody)}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  {showChainOfCustody ? 'Hide' : 'Show'} Chain of Custody
                </button>

                {showChainOfCustody && (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h5 className="font-medium text-green-900 mb-3">Chain of Custody Requirements:</h5>
                    <div className="space-y-4">
                      <div>
                        <h6 className="text-sm font-medium text-green-800 mb-2">Documentation:</h6>
                        <ul className="space-y-2">
                          {selectedDevice.chainOfCustody.documentation.map((doc, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <FileText className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                              <span className="text-green-700">{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-sm font-medium text-green-800 mb-2">Packaging:</h6>
                        <ul className="space-y-2">
                          {selectedDevice.chainOfCustody.packaging.map((pkg, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Shield className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                              <span className="text-green-700">{pkg}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-sm font-medium text-green-800 mb-2">Storage:</h6>
                        <p className="text-green-700">{selectedDevice.chainOfCustody.storage}</p>
                      </div>
                      <div>
                        <h6 className="text-sm font-medium text-green-800 mb-2">Access Control:</h6>
                        <ul className="space-y-2">
                          {selectedDevice.chainOfCustody.access.map((access, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Lock className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                              <span className="text-green-700">{access}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2" />
                <p>Select a device type to view handling procedures</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Educational Tips */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">Best Practices:</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Always document the original state and location of devices before handling
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Use appropriate tools and containers for each type of device
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Maintain detailed chain of custody records from seizure to analysis
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Consider both technical and legal implications of device handling
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}