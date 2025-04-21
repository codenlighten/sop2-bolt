import React from 'react';
import { CertificatesPage } from '../components/CertificatesPage';

export function Certificates() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your Blockchain Certificates
        </h1>
        
        <div className="prose prose-blue max-w-none mb-8">
          <p>
            View and verify your earned certificates. All certificates are permanently recorded on the blockchain,
            making them tamper-proof and independently verifiable by employers and institutions.
          </p>
        </div>
        
        <CertificatesPage />
      </div>
    </div>
  );
}