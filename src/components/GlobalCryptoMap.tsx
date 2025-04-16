import React, { useState } from 'react';
import { Globe, Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface Country {
  id: string;
  name: string;
  regulation: 'strict' | 'moderate' | 'none';
  details: {
    regulatoryBody: string;
    keyRegulations: string[];
    enforcement: string;
    mlat: boolean;
  };
}

const countries: Country[] = [
  {
    id: 'us',
    name: 'United States',
    regulation: 'strict',
    details: {
      regulatoryBody: 'SEC, FinCEN, CFTC',
      keyRegulations: [
        'Bank Secrecy Act (BSA)',
        'Securities Exchange Act',
        'FATF Travel Rule compliance'
      ],
      enforcement: 'Strong enforcement with criminal prosecution',
      mlat: true
    }
  },
  {
    id: 'ch',
    name: 'Switzerland',
    regulation: 'moderate',
    details: {
      regulatoryBody: 'FINMA',
      keyRegulations: [
        'Financial Market Infrastructure Act',
        'Anti-Money Laundering Act',
        'Blockchain Act'
      ],
      enforcement: 'Balanced approach with industry support',
      mlat: true
    }
  },
  {
    id: 'sg',
    name: 'Singapore',
    regulation: 'strict',
    details: {
      regulatoryBody: 'MAS',
      keyRegulations: [
        'Payment Services Act',
        'Securities and Futures Act',
        'Digital Token Offerings regulations'
      ],
      enforcement: 'Proactive regulation with industry growth focus',
      mlat: true
    }
  },
  {
    id: 'mt',
    name: 'Malta',
    regulation: 'moderate',
    details: {
      regulatoryBody: 'MFSA',
      keyRegulations: [
        'Virtual Financial Assets Act',
        'Digital Innovation Authority Act',
        'Technology Arrangements Act'
      ],
      enforcement: 'Crypto-friendly with regulatory oversight',
      mlat: true
    }
  },
  {
    id: 'cn',
    name: 'Cayman Islands',
    regulation: 'none',
    details: {
      regulatoryBody: 'CIMA',
      keyRegulations: [
        'Virtual Asset Service Providers Act',
        'Limited oversight framework',
        'Optional registration'
      ],
      enforcement: 'Minimal enforcement',
      mlat: false
    }
  }
];

export function GlobalCryptoMap() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const getRegulationColor = (regulation: string) => {
    switch (regulation) {
      case 'strict':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'none':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Global Cryptocurrency Regulation Map
        </h3>
        <p className="text-gray-600">
          Explore cryptocurrency regulations and enforcement capabilities across different jurisdictions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Country List */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded-full"></div>
              <span className="text-sm text-gray-600">Strict</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded-full"></div>
              <span className="text-sm text-gray-600">Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-100 border border-red-200 rounded-full"></div>
              <span className="text-sm text-gray-600">None/Limited</span>
            </div>
          </div>

          {countries.map((country) => (
            <button
              key={country.id}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selectedCountry?.id === country.id
                  ? 'ring-2 ring-blue-500 ring-opacity-50'
                  : 'hover:bg-gray-50'
              } ${getRegulationColor(country.regulation)}`}
              onClick={() => setSelectedCountry(country)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{country.name}</h4>
                <div className="text-sm capitalize">{country.regulation} Regulation</div>
              </div>
              <div className="text-sm">
                Regulatory Body: {country.details.regulatoryBody}
              </div>
            </button>
          ))}
        </div>

        {/* Country Details */}
        <div>
          {selectedCountry ? (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{selectedCountry.name}</h4>
                  <p className="text-sm text-gray-600">
                    {selectedCountry.details.enforcement}
                  </p>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-3">Key Regulations:</h5>
                <ul className="space-y-2">
                  {selectedCountry.details.keyRegulations.map((regulation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{regulation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-4 rounded-lg ${
                selectedCountry.details.mlat
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start gap-2">
                  {selectedCountry.details.mlat ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                  <div>
                    <h5 className={`font-medium ${
                      selectedCountry.details.mlat ? 'text-green-900' : 'text-red-900'
                    } mb-1`}>
                      MLAT Status
                    </h5>
                    <p className={
                      selectedCountry.details.mlat ? 'text-green-700' : 'text-red-700'
                    }>
                      {selectedCountry.details.mlat
                        ? 'Has mutual legal assistance treaty agreements'
                        : 'No mutual legal assistance treaty in place'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Info className="w-8 h-8 mx-auto mb-2" />
                <p>Select a country to view regulatory details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}