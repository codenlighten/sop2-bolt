import React from 'react';
import { Certificate as CertificateType } from '../types';
import { Shield, Award, CheckCircle } from 'lucide-react';

interface CertificateDisplayProps {
  certificate: CertificateType;
  earned?: boolean;
  progress?: {
    earnedBadges: number;
    totalScore: number;
  };
}

export function CertificateDisplay({ certificate, earned = false, progress }: CertificateDisplayProps) {
  return (
    <div className={`p-6 rounded-lg border ${
      earned 
        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
        : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          earned ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          {earned ? (
            <Award className="w-8 h-8 text-blue-600" />
          ) : (
            <Shield className="w-8 h-8 text-gray-400" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{certificate.title}</h3>
          <p className="text-gray-600 mt-1">{certificate.description}</p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">
                Required Badges: {certificate.requirements.minBadges}
                {progress && ` (${progress.earnedBadges} earned)`}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">
                Minimum Total Score: {certificate.requirements.minTotalScore}%
                {progress && ` (${progress.totalScore}% achieved)`}
              </span>
            </div>
          </div>

          {earned && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span>Certificate Earned!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}