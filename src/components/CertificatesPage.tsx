import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Award, Loader, Search, Shield } from 'lucide-react';
import { CertificateCard } from './CertificateCard';

interface Certificate {
  _id: string;
  certificateId: string;
  userEmail: string;
  courseName: string;
  score: number;
  issueDate: string;
  transactionId?: string;
  completed: boolean;
}

export function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://smart-certs-npkd4.ondigitalocean.app/api/certificates/email/${encodeURIComponent(user.email)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch certificates');
        }
        
        const data = await response.json();
        setCertificates(data.certificates || []);
      } catch (err) {
        console.error('Error fetching certificates:', err);
        setError('Failed to load your certificates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-6 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (!user?.email) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <Shield className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-yellow-900 mb-2">Sign In Required</h2>
        <p className="text-yellow-700">
          Please sign in to view your certificates.
        </p>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
        <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-blue-900 mb-2">No Certificates Yet</h2>
        <p className="text-blue-700 mb-4">
          Complete the course to earn your blockchain-verified certificate.
        </p>
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h3 className="font-medium text-gray-900 mb-2">How to earn a certificate:</h3>
            <ol className="text-left text-gray-700 space-y-2 list-decimal list-inside">
              <li>Complete all chapters in the course</li>
              <li>Pass all quizzes with a minimum score of 80%</li>
              <li>Complete all interactive exercises</li>
              <li>Earn the required badges</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Your Certificates</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search certificates..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {certificates.map((cert) => (
          <CertificateCard
            key={cert._id}
            certificateId={cert.certificateId}
            title={cert.courseName}
            issueDate={cert.issueDate}
            transactionId={cert.transactionId}
            score={cert.score}
            userEmail={cert.userEmail}
          />
        ))}
      </div>
    </div>
  );
}