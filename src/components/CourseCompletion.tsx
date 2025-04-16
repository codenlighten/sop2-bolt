import React, { useEffect, useRef } from 'react';
import { Award, CheckCircle, Download, Share2, ArrowRight, Trophy, Star } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { SocialShare } from './SocialShare';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export function CourseCompletion() {
  const { earnedCertificates, progress } = useProgress();
  const confettiRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (confettiRef.current) {
      const canvas = confettiRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Simple confetti animation using canvas
      const particles: Array<{
        x: number;
        y: number;
        color: string;
        radius: number;
        speed: number;
      }> = [];

      const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          color: colors[Math.floor(Math.random() * colors.length)],
          radius: Math.random() * 4 + 2,
          speed: Math.random() * 3 + 1
        });
      }

      let animationFrame: number;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();

          particle.y += particle.speed;

          if (particle.y > canvas.height) {
            particle.y = -10;
          }
        });

        animationFrame = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, []);

  const downloadCertificate = async (certificateId: string) => {
    const certificate = earnedCertificates.find(c => c.id === certificateId);
    if (!certificate) return;

    // Create certificate element
    const certificateElement = document.createElement('div');
    certificateElement.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: Arial;">
        <h1 style="color: #1e40af; font-size: 24px; margin-bottom: 20px;">
          ${certificate.title}
        </h1>
        <p style="font-size: 18px; margin-bottom: 30px;">
          This certifies that
        </p>
        <p style="font-size: 24px; font-weight: bold; margin-bottom: 30px;">
          [Your Name]
        </p>
        <p style="font-size: 16px; margin-bottom: 40px;">
          has successfully completed the comprehensive training program in
          Cryptocurrency Crime Investigation with distinction.
        </p>
        <div style="margin-bottom: 40px;">
          <p style="font-size: 14px;">Date: ${new Date().toLocaleDateString()}</p>
          <p style="font-size: 14px;">Certificate ID: ${certificateId}</p>
        </div>
      </div>
    `;

    try {
      const canvas = await html2canvas(certificateElement);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${certificate.title.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Failed to generate certificate. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <canvas 
        ref={confettiRef}
        className="fixed inset-0 pointer-events-none z-50"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Congratulations! Course Completed
            </h2>
            <p className="text-gray-600">
              You've successfully completed all chapters and earned all badges in the
              Cryptocurrency Crime Investigation training program.
            </p>
          </div>

          <div className="space-y-6">
            {/* Progress Summary */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Your Achievements:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">
                    {progress.completedChapters.length}/10 Chapters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-700">
                    {progress.earnedBadges.length}/10 Badges
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">
                    {Math.round(Object.values(progress.quizScores).reduce((a, b) => a + b, 0) / 
                    Object.keys(progress.quizScores).length)}% Avg. Score
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    {earnedCertificates.length} Certificates
                  </span>
                </div>
              </div>
            </div>

            {/* Certificates */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Your Certificates:</h3>
              <div className="space-y-4">
                {earnedCertificates.map(cert => (
                  <div 
                    key={cert.id}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{cert.title}</h4>
                        <p className="text-gray-600 mt-1">{cert.description}</p>
                      </div>
                      <Award className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <button
                        onClick={() => downloadCertificate(cert.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Certificate</span>
                      </button>
                      <button
                        onClick={() => {/* Share functionality */}}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-medium text-green-900 mb-3">Next Steps:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-green-800">
                    Download and save your certificates for your records
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-green-800">
                    Share your achievement with your professional network
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-green-800">
                    Apply your knowledge in real-world investigations
                  </span>
                </li>
              </ul>
            </div>

            {/* Share Achievement */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Share Your Achievement:</h3>
              <SocialShare />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}