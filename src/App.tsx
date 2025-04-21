import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { Introduction } from './pages/Introduction';
import { BlockchainFundamentals } from './pages/BlockchainFundamentals';
import { CriminalActivity } from './pages/CriminalActivity';
import { CrimeScene } from './pages/CrimeScene';
import { DigitalAssetRecovery } from './pages/DigitalAssetRecovery';
import { InternationalCooperation } from './pages/InternationalCooperation';
import { FinancialCollaboration } from './pages/FinancialCollaboration';
import { SpecializedUnits } from './pages/SpecializedUnits';
import { LegalFramework } from './pages/LegalFramework';
import { FutureTrends } from './pages/FutureTrends';
import { ProgressOverview } from './components/ProgressOverview';
import { ChapterCompletion } from './components/ChapterCompletion';
import { CourseCompletion } from './components/CourseCompletion';
import { AuthForm } from './components/AuthForm';
import { AccessCodeForm } from './components/AccessCodeForm';
import { BadgeNotification } from './components/BadgeNotification';
import { Certificates } from './pages/Certificates';
import { chapters } from './data/chapters';
import { X, Menu, LogOut } from 'lucide-react';
import { useProgress } from './context/ProgressContext';
import { useAuth } from './context/AuthContext';
import { requestCertificate } from './utils/progressApi';
import { badges } from './data/badges';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showProgress, setShowProgress] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [hasCourseAccess, setHasCourseAccess] = useState(false);
  const { completeChapter, isCourseCompleted, progress, earnedBadges } = useProgress();
  const { user, loading, signOut } = useAuth();
  const [newBadge, setNewBadge] = useState<string | null>(null);
  const [previousBadges, setPreviousBadges] = useState<string[]>([]);

  // Check for access code in URL parameters and course access on mount
  useEffect(() => {
    const checkAccessCode = async () => {
      // Check URL for access_code parameter
      const urlParams = new URLSearchParams(window.location.search);
      const accessCodeParam = urlParams.get('access_code');
      
      if (accessCodeParam) {
        try {
          // Verify the access code with the API
          const email=localStorage.email||"";
          const response = await fetch(`https://smart-certs-npkd4.ondigitalocean.app/api/purchases/access/${accessCodeParam}?email=${email}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          if (response.ok) {
            // Store access in localStorage
            localStorage.setItem('courseAccess', 'true');
            localStorage.setItem('accessCode', accessCodeParam);
            setHasCourseAccess(true);
            
            // Remove the access_code parameter from URL without refreshing
            const newUrl = window.location.pathname + window.location.hash;
            window.history.replaceState({}, document.title, newUrl);
            
            // If on landing page, redirect to introduction
            if (currentPage === 'landing') {
              setCurrentPage('introduction');
            }
          }
        } catch (error) {
          console.error('Error verifying access code:', error);
        }
      }
      
      // Check localStorage for existing access
      const storedAccess = localStorage.getItem('courseAccess');
      if (storedAccess === 'true') {
        setHasCourseAccess(true);
      }
    };
    
    checkAccessCode();
  }, [currentPage]);

  // Check if course is completed and request certificate
  useEffect(() => {
    const checkCourseCompletion = async () => {
      // Check if all chapters are completed
      const allChaptersCompleted = chapters.every(chapter => 
        progress.completedChapters.includes(chapter.id)
      );
      
      // If all chapters are completed and user is logged in, request certificate
      if (allChaptersCompleted && user?.email) {
        try {
          await requestCertificate(user.email);
          console.log('Certificate requested for completed course');
        } catch (error) {
          console.error('Error requesting certificate:', error);
        }
      }
    };
    
    checkCourseCompletion();
  }, [progress.completedChapters, user]);

  // Check for newly earned badges
  useEffect(() => {
    if (previousBadges.length === 0 && earnedBadges.length > 0) {
      // First load, just store the current badges
      setPreviousBadges(earnedBadges.map(b => b.id));
    } else if (earnedBadges.length > previousBadges.length) {
      // Find the new badge(s)
      const newBadgeIds = earnedBadges
        .map(b => b.id)
        .filter(id => !previousBadges.includes(id));
      
      if (newBadgeIds.length > 0) {
        // Show notification for the first new badge
        setNewBadge(newBadgeIds[0]);
        // Update previous badges
        setPreviousBadges(earnedBadges.map(b => b.id));
      }
    }
  }, [earnedBadges, previousBadges]);

  const handleStart = () => {
    setCurrentPage('introduction');
  };

  const handleChapterComplete = () => {
    const currentChapter = chapters.find(c => c.id === currentPage);
    if (currentChapter) {
      completeChapter(currentPage);
      setShowCompletion(true);
    }
  };

  const handleContinue = () => {
    setShowCompletion(false);
    const currentIndex = chapters.findIndex(c => c.id === currentPage);
    if (currentIndex < chapters.length - 1) {
      setCurrentPage(chapters[currentIndex + 1].id);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setCurrentPage('landing');
  };

  const handleAccessGranted = () => {
    setHasCourseAccess(true);
    setCurrentPage('introduction');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user && currentPage !== 'landing') {
    return <AuthForm />;
  }

  // If user is logged in but doesn't have course access and not on landing page
  if (user && !hasCourseAccess && currentPage !== 'landing') {
    return <AccessCodeForm onSuccess={handleAccessGranted} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'landing' && (
        <>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 md:hidden"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {showMobileMenu && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setShowMobileMenu(false)}
            />
          )}

          <div className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-slate-800 transform transition-transform duration-300 ease-in-out
            ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
          `}>
            <Sidebar 
              onNavigate={(page) => {
                setCurrentPage(page);
                setShowMobileMenu(false);
              }}
              currentPage={currentPage}
              onShowProgress={() => {
                setShowProgress(true);
                setShowMobileMenu(false);
              }}
            />
          </div>

          <Header 
            currentPage={currentPage} 
            onNavigate={setCurrentPage}
          />

          {user && (
            <div className="fixed top-16 right-4 z-30 md:right-6">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 max-w-[200px] truncate">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-100 flex items-center gap-1"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 text-gray-700" />
                  <span className="text-xs font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
      
      <main className={`
        transition-all duration-300 ease-in-out
        ${currentPage === 'landing' ? 'p-4 md:p-8' : 'p-4 pt-20 md:ml-64 md:p-8 md:pt-20'}
      `}>
        {currentPage === 'landing' ? (
          <LandingPage onStart={handleStart} />
        ) : showProgress ? (
          <div className="relative">
            <button
              onClick={() => setShowProgress(false)}
              className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <ProgressOverview />
          </div>
        ) : (
          renderPage()
        )}
      </main>

      {showCompletion && (
        <ChapterCompletion 
          chapter={chapters.find(c => c.id === currentPage)!}
          onContinue={handleContinue}
        />
      )}

      {isCourseCompleted && (
        <CourseCompletion />
      )}

      {/* Badge notification */}
      {newBadge && (
        <BadgeNotification 
          badge={badges.find(b => b.id === newBadge)!} 
          onClose={() => setNewBadge(null)}
        />
      )}
    </div>
  );

  function renderPage() {
    switch (currentPage) {
      case 'introduction':
        return <Introduction onComplete={handleChapterComplete} />;
      case 'crypto-basics':
        return <BlockchainFundamentals onComplete={handleChapterComplete} />;
      case 'criminal-activity':
        return <CriminalActivity onComplete={handleChapterComplete} />;
      case 'crime-scene':
        return <CrimeScene onComplete={handleChapterComplete} />;
      case 'asset-recovery':
        return <DigitalAssetRecovery onComplete={handleChapterComplete} />;
      case 'international':
        return <InternationalCooperation onComplete={handleChapterComplete} />;
      case 'financial-collaboration':
        return <FinancialCollaboration onComplete={handleChapterComplete} />;
      case 'specialized-units':
        return <SpecializedUnits onComplete={handleChapterComplete} />;
      case 'legal':
        return <LegalFramework onComplete={handleChapterComplete} />;
      case 'future-trends':
        return <FutureTrends onComplete={handleChapterComplete} />;
      case 'certificates':
        return <Certificates />;
      default:
        return <LandingPage onStart={handleStart} />;
    }
  }
}

export default App;