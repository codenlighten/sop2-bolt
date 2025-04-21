import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ProgressProvider } from './context/ProgressContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { AuthProvider } from './context/AuthContext';

// Clean up any undefined module IDs in localStorage on startup
const cleanupLocalStorage = () => {
  try {
    const userProgress = localStorage.getItem('userProgress');
    if (userProgress) {
      const progress = JSON.parse(userProgress);
      if (progress.quizScores && 'undefined' in progress.quizScores) {
        delete progress.quizScores['undefined'];
        localStorage.setItem('userProgress', JSON.stringify(progress));
        console.log('Cleaned up undefined module IDs in localStorage');
      }
    }
  } catch (error) {
    console.error('Error cleaning up localStorage:', error);
  }
};

// Run cleanup before mounting the app
cleanupLocalStorage();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProgressProvider>
        <AnalyticsProvider>
          <App />
        </AnalyticsProvider>
      </ProgressProvider>
    </AuthProvider>
  </StrictMode>
);