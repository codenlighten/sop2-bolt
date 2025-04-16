import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { BadgeDisplay } from './BadgeDisplay';
import { CertificateDisplay } from './CertificateDisplay';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { ExportProgress } from './ExportProgress';
import { Shield, Award, ArrowRight, CheckCircle, Book, Clock, Brain } from 'lucide-react';

export function ProgressOverview() {
  const { 
    progress,
    earnedBadges,
    earnedCertificates,
    checkBadgeEligibility,
    checkCertificateEligibility
  } = useProgress();

  const calculateBadgeProgress = (badgeId: string) => {
    const badge = earnedBadges.find(b => b.id === badgeId);
    if (!badge) return 0;

    const metRequirements = badge.requirements.filter(req => {
      const score = req.type === 'quiz'
        ? progress.quizScores[req.moduleId]
        : progress.simulationScores[req.moduleId];
      return score >= req.threshold;
    }).length;

    return Math.round((metRequirements / badge.requirements.length) * 100);
  };

  const calculateOverallProgress = () => {
    const totalChapters = 10;
    const completedChapters = progress.completedChapters.length;
    return Math.round((completedChapters / totalChapters) * 100);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Progress</h2>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Book className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-blue-900">Chapters</h3>
            </div>
            <p className="text-2xl font-semibold text-blue-700">
              {progress.completedChapters.length} / 10
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-purple-600" />
              <h3 className="font-medium text-purple-900">Badges</h3>
            </div>
            <p className="text-2xl font-semibold text-purple-700">
              {earnedBadges.length} / 10
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-green-600" />
              <h3 className="font-medium text-green-900">Average Score</h3>
            </div>
            <p className="text-2xl font-semibold text-green-700">
              {Object.values(progress.quizScores).length > 0
                ? Math.round(
                    Object.values(progress.quizScores).reduce((a, b) => a + b, 0) /
                    Object.values(progress.quizScores).length
                  )
                : 0}%
            </p>
          </div>
        </div>

        {/* Export Section */}
        <div className="mb-8">
          <ExportProgress />
        </div>

        {/* Analytics Dashboard */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Learning Analytics</h3>
          <AnalyticsDashboard />
        </div>

        {/* Badges Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Badges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.map(badge => (
              <BadgeDisplay
                key={badge.id}
                badge={badge}
                earned={progress.earnedBadges.includes(badge.id)}
                progress={calculateBadgeProgress(badge.id)}
              />
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Certificates</h3>
          <div className="space-y-4">
            {earnedCertificates.map(certificate => (
              <CertificateDisplay
                key={certificate.id}
                certificate={certificate}
                earned={checkCertificateEligibility(certificate.id)}
                progress={{
                  earnedBadges: earnedBadges.length,
                  totalScore: Object.values(progress.quizScores).reduce((a, b) => a + b, 0) / 
                    Object.keys(progress.quizScores).length
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}