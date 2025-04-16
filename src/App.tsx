import React, { useState } from 'react';
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
import { chapters } from './data/chapters';
import { X, Menu } from 'lucide-react';
import { useProgress } from './context/ProgressContext';
import { useAuth } from './context/AuthContext';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showProgress, setShowProgress] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { completeChapter, isCourseCompleted } = useProgress();
  const { user, loading } = useAuth();

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

      {showCompletion && currentChapter && (
        <ChapterCompletion 
          chapter={currentChapter}
          onContinue={handleContinue}
        />
      )}

      {isCourseCompleted && (
        <CourseCompletion />
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
      default:
        return <LandingPage onStart={handleStart} />;
    }
  }
}

export default App;