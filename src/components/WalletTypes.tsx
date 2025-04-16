import React from 'react';
import { Laptop, Smartphone, HardDrive, FileText, Building2, User } from 'lucide-react';

interface WalletTypeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
  securityLevel: 'High' | 'Medium' | 'Low';
}

function WalletType({ icon, title, description, examples, securityLevel }: WalletTypeProps) {
  const securityColor = {
    High: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-red-100 text-red-800'
  }[securityLevel];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">{title}</h4>
            <span className={`text-xs px-2 py-1 rounded-full ${securityColor}`}>
              {securityLevel} Security
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">Examples:</div>
            <div className="flex flex-wrap gap-2">
              {examples.map((example, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WalletTypes() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WalletType
          icon={<Laptop className="w-5 h-5 text-blue-600" />}
          title="Desktop Wallets"
          description="Software installed on a computer, offering a balance of security and convenience."
          examples={['Electrum', 'Exodus', 'Bitcoin Core']}
          securityLevel="Medium"
        />
        <WalletType
          icon={<Smartphone className="w-5 h-5 text-blue-600" />}
          title="Mobile Wallets"
          description="Apps on smartphones for quick access and everyday transactions."
          examples={['Mycelium', 'Trust Wallet', 'MetaMask Mobile']}
          securityLevel="Medium"
        />
        <WalletType
          icon={<HardDrive className="w-5 h-5 text-blue-600" />}
          title="Hardware Wallets"
          description="Physical devices that store private keys offline for maximum security."
          examples={['Ledger Nano', 'Trezor', 'KeepKey']}
          securityLevel="High"
        />
        <WalletType
          icon={<FileText className="w-5 h-5 text-blue-600" />}
          title="Paper Wallets"
          description="Physical documents containing printed private keys and QR codes."
          examples={['BitAddress', 'WalletGenerator', 'Paper Key']}
          securityLevel="High"
        />
        <WalletType
          icon={<Building2 className="w-5 h-5 text-blue-600" />}
          title="Custodial Wallets"
          description="Third-party services that manage private keys on behalf of users."
          examples={['Coinbase', 'Binance', 'Kraken']}
          securityLevel="Low"
        />
        <WalletType
          icon={<User className="w-5 h-5 text-blue-600" />}
          title="Non-Custodial Wallets"
          description="User-controlled wallets where private keys are managed personally."
          examples={['MetaMask', 'Atomic', 'Edge']}
          securityLevel="High"
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-yellow-900 mb-2">Law Enforcement Note:</h4>
        <p className="text-sm text-yellow-800">
          When investigating crypto-related crimes, different wallet types require different approaches:
        </p>
        <ul className="mt-2 space-y-2 text-sm text-yellow-800">
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1.5" />
            Hardware wallets require physical access and may be protected by PINs
          </li>
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1.5" />
            Custodial wallets can be accessed through court orders to exchanges
          </li>
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1.5" />
            Paper wallets might be hidden as ordinary documents
          </li>
        </ul>
      </div>
    </div>
  );
}