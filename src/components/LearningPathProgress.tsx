import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { Book, CheckCircle, Clock, Star } from 'lucide-react';
import { LearningPath } from '../types';

interface LearningPathProgressProps {
  path: LearningPath;
}

export function LearningPathProgress({ path }: LearningPathProgressProps) {
  const { progress } = useProgress();

  const calculatePathProgress = () => {
    const completedChapters = path.chapters.filter(id => 
      progress.completedChapters.includes(id)
    ).length;
    return Math.round((completedChapters / path.chapters.length) * 100);
  };

  const calculateTimeSpent = () => {
    return path.chapters.reduce((total, id) => 
      total + (progress.timeSpent[id] || 0), 0
    );
  };

  const calculateAverageScore = () => {
    const scores = path.chapters.map(id => progress.quizScores[id] || 0);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Book className="w-7 h-7 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{path.name}</h3>
          <p className="text-gray-600">{path.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-900">Progress</span>
          </div>
          <div className="text-2xl font-semibold text-green-700">
            {calculatePathProgress()}%
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Time Spent</span>
          </div>
          <div className="text-2xl font-semibold text-blue-700">
            {Math.round(calculateTimeSpent() / 60)}h
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-600" />
            <span className="font-medium text-gray-900">Average Score</span>
          </div>
          <div className="text-2xl font-semibold text-yellow-700">
            {calculateAverageScore()}%
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Skills Development:</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {path.skills.map((skill, index) => (
            <div key={index} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="text-sm font-medium text-blue-900">{skill}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}