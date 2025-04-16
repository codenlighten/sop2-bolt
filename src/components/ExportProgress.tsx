import React, { useRef } from 'react';
import { Download, FileText, Award, CheckCircle } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useAnalytics } from '../context/AnalyticsContext';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export function ExportProgress() {
  const { progress, earnedBadges, earnedCertificates } = useProgress();
  const { getAnalytics } = useAnalytics();
  const analytics = getAnalytics();
  const reportRef = useRef<HTMLDivElement>(null);

  const exportToPDF = async () => {
    if (!reportRef.current) return;

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      pdf.addImage(
        imgData, 
        'PNG', 
        0, 
        0, 
        imgWidth * ratio, 
        imgHeight * ratio
      );
      
      pdf.save('progress-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const exportToJSON = () => {
    const data = {
      progress,
      earnedBadges,
      earnedCertificates,
      analytics: analytics || {}
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'progress-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Progress</h3>
      
      {/* Hidden report template for PDF generation */}
      <div className="hidden">
        <div ref={reportRef} className="bg-white p-8" style={{ width: '800px' }}>
          <h1 className="text-2xl font-bold text-blue-900 mb-6">
            Training Progress Report
          </h1>
          
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Overall Progress
          </h2>
          <div className="mb-6">
            <p className="mb-2">Chapters Completed: {progress.completedChapters.length}/10</p>
            <p className="mb-2">Badges Earned: {earnedBadges.length}/10</p>
            <p className="mb-2">Certificates Earned: {earnedCertificates.length}/2</p>
          </div>

          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Performance Metrics
          </h2>
          <div className="mb-6">
            <p className="mb-2">Average Quiz Score: {
              Object.values(progress.quizScores).length > 0
                ? Math.round(
                    Object.values(progress.quizScores).reduce((a, b) => a + b, 0) /
                    Object.values(progress.quizScores).length
                  )
                : 0
            }%</p>
            <p className="mb-2">Average Simulation Score: {
              Object.values(progress.simulationScores).length > 0
                ? Math.round(
                    Object.values(progress.simulationScores).reduce((a, b) => a + b, 0) /
                    Object.values(progress.simulationScores).length
                  )
                : 0
            }%</p>
          </div>

          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Earned Badges
          </h2>
          <div className="mb-6">
            {earnedBadges.map(badge => (
              <div key={badge.id} className="mb-3">
                <h3 className="font-semibold">{badge.name}</h3>
                <p className="text-gray-600">{badge.description}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Earned Certificates
          </h2>
          <div className="mb-6">
            {earnedCertificates.map(cert => (
              <div key={cert.id} className="mb-3">
                <h3 className="font-semibold">{cert.title}</h3>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>

          {analytics && (
            <>
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Learning Analytics
              </h2>
              <div className="mb-6">
                <p className="mb-2">Completion Rate: {analytics.progress.completion}%</p>
                <p className="mb-2">Total Time Spent: {Math.round(analytics.progress.totalTime / 60)} hours</p>
                <p className="mb-2">Engagement Score: {analytics.progress.engagement}%</p>
              </div>
            </>
          )}

          <div className="text-sm text-gray-500 mt-8">
            Generated on {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={exportToPDF}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FileText className="w-5 h-5" />
          <span>Export as PDF</span>
        </button>

        <button
          onClick={exportToJSON}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <Download className="w-5 h-5" />
          <span>Export Raw Data</span>
        </button>
      </div>

      <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Export Options:</h4>
            <ul className="mt-2 space-y-2 text-blue-800">
              <li className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                PDF Report - Complete progress summary with visualizations
              </li>
              <li className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Raw Data - Full progress data in JSON format
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}