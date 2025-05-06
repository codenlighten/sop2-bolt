// Removed unused React import
import { Award, Download, ExternalLink, Shield, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { downloadCertificatePdf } from '../utils/progressApi';
import { useState } from 'react';

interface CertificateCardProps {
  certificateId: string;
  title: string;
  issueDate?: string;
  transactionId?: string;
  score?: number;
  userEmail?: string;
}

export function CertificateCard({ 
  certificateId, 
  title, 
  issueDate, 
  transactionId,
  score,
  userEmail
}: CertificateCardProps) {
  const { user } = useAuth();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const viewOnChain = () => {
    if (transactionId) {
      window.open(`https://whatsonchain.com/tx/${transactionId}`, '_blank');
    }
  };

  const handleDownloadClick = async () => {
    setIsDownloading(true);
    setDownloadError(null);
    try {
      await downloadCertificatePdf(certificateId, title);
    } catch (error) {
      console.error('Download failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setDownloadError(`Failed to download: ${errorMessage}`);
      // For a quick UI feedback, an alert can be used. A toast notification system would be better for production.
      alert(`Failed to download certificate: ${errorMessage}`); 
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Certificate Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <h3 className="text-xl font-bold">Blockchain Certificate</h3>
          </div>
          <Award className="w-10 h-10" />
        </div>
      </div>
      
      {/* Certificate Content */}
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
            <p className="text-gray-600 mt-1">
              This certifies that <span className="font-medium">{user?.email || userEmail || 'Recipient'}</span> has successfully completed the course with distinction.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-gray-500">Issue Date</div>
              <div className="font-medium text-gray-900">{formatDate(issueDate)}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Score</div>
              <div className="font-medium text-gray-900">{score ?? 'N/A'}%</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Certificate ID</div>
              <div className="font-mono text-sm text-gray-900 truncate">{certificateId}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Blockchain Verification</div>
              <div className="font-medium text-gray-900">
                {transactionId ? 'Verified' : 'Pending'}
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-medium text-blue-900">Blockchain Verification</h5>
                <p className="text-blue-700 text-sm">
                  This certificate has been permanently recorded on the blockchain, making it tamper-proof and independently verifiable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Certificate Actions */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex justify-end gap-3">
          {transactionId && (
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
              onClick={viewOnChain}
              disabled={isDownloading} // Also disable if a download is in progress to avoid UI confusion
            >
              <ExternalLink className="w-4 h-4" />
              <span>View on Chain</span>
            </button>
          )}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
            onClick={handleDownloadClick} 
            disabled={isDownloading} 
          >
            {isDownloading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /><span>Downloading...</span></>
            ) : (
              <><Download className="w-4 h-4" /><span>Download PDF</span></>
            )}
          </button>
        </div>
        {downloadError && (
          <p className="text-red-500 text-sm text-right mt-2">{downloadError}</p>
        )}
      </div>
    </div>
  );
}