import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { Key, AlertTriangle, Loader, CheckCircle } from 'lucide-react';

interface AccessCodeFormProps {
  onSuccess: () => void;
}

export function AccessCodeForm({ onSuccess }: AccessCodeFormProps) {
  const { user } = useAuth();
  const { progress, resetProgress } = useProgress();
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);

  // Check for stored access code on mount
  useEffect(() => {
    const checkStoredCode = async () => {
      const storedCode = localStorage.getItem('accessCode');
      if (storedCode) {
        setAccessCode(storedCode);
        // Verify the stored code
        try {
          setLoading(true);
          const email = localStorage.getItem('email') || user?.email || "";
          const response = await fetch(`https://smart-certs-npkd4.ondigitalocean.app/api/purchases/access/${storedCode}?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const data = await response.json();
          if (response.ok && data) {
            setSuccess(true);
            localStorage.setItem('courseAccess', 'true');
            
            // Check if the purchase has progress data
            if (data.purchase && data.purchase.progress) {
              try {
                // Parse the progress data
                const purchaseProgress = JSON.parse(data.purchase.progress);
                
                // Only reset progress if there's meaningful data from the server
                if (purchaseProgress && 
                    ((purchaseProgress.completedChapters && purchaseProgress.completedChapters.length > 0) ||
                     (purchaseProgress.earnedBadges && purchaseProgress.earnedBadges.length > 0) ||
                     (Object.keys(purchaseProgress.quizScores || {}).length > 0))) {
                  
                  // Reset local progress and load from server
                  resetProgress();
                  localStorage.setItem('userProgress', JSON.stringify(purchaseProgress));
                  setProgressLoaded(true);
                }
              } catch (err) {
                console.error('Error parsing progress data:', err);
              }
            }
            
            // Wait a moment to show success message
            setTimeout(() => {
              onSuccess();
            }, 1000);
          } else {
            // Invalid stored code
            localStorage.removeItem('accessCode');
            localStorage.removeItem('courseAccess');
          }
        } catch (err) {
          console.error('Error verifying stored access code:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    
    checkStoredCode();
  }, [onSuccess, user, resetProgress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call the API to verify the access code
      const email = localStorage.getItem('email') || user?.email || "";
      const response = await fetch(`https://smart-certs-npkd4.ondigitalocean.app/api/purchases/access/${accessCode}?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        localStorage.setItem('courseAccess', 'true');
        localStorage.setItem('accessCode', accessCode);
        
        if (data && data.purchase && data.purchase.userEmail) {
          localStorage.setItem('userEmail', data.purchase.userEmail);
        }
        
        // Check if the purchase has progress data
        if (data.purchase && data.purchase.progress) {
          try {
            // Parse the progress data
            const purchaseProgress = JSON.parse(data.purchase.progress);
            
            // Only reset progress if there's meaningful data from the server
            if (purchaseProgress && 
                ((purchaseProgress.completedChapters && purchaseProgress.completedChapters.length > 0) ||
                 (purchaseProgress.earnedBadges && purchaseProgress.earnedBadges.length > 0) ||
                 (Object.keys(purchaseProgress.quizScores || {}).length > 0))) {
              
              // Reset local progress and load from server
              resetProgress();
              localStorage.setItem('userProgress', JSON.stringify(purchaseProgress));
              setProgressLoaded(true);
            }
          } catch (err) {
            console.error('Error parsing progress data:', err);
          }
        }
        
        // Wait a moment to show success message
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid access code. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Access Granted!
          </h2>
          <p className="text-gray-600 mb-2">
            Your access code has been verified. You now have full access to the training program.
          </p>
          {progressLoaded && (
            <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-blue-700 text-sm">
                Your previous progress has been loaded successfully.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Key className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Enter Your Access Code
          </h2>
          <p className="text-gray-600">
            Please enter the access code you received after purchase to unlock the full training program.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-1">
              Access Code
            </label>
            <div className="relative">
              <input
                id="accessCode"
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your access code"
                required
              />
              <Key className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Unlock Access</span>
            )}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            <p>
              Don't have an access code?{' '}
              <a href="/" className="text-blue-600 hover:text-blue-700">
                Purchase the course
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}