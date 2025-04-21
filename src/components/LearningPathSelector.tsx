import React from 'react';
import { Book, ArrowRight, Star, Clock, Shield, Award } from 'lucide-react';
import { LearningPath } from '../types';
import { learningPaths } from '../data/learningPaths';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

interface LearningPathSelectorProps {
  onSelect: (pathId: string) => void;
}

export function LearningPathSelector({ onSelect }: LearningPathSelectorProps) {
  const { progress } = useProgress();
  const { user } = useAuth();

  const getPathProgress = (path: LearningPath) => {
    const completedChapters = path.chapters.filter(id => 
      progress.completedChapters.includes(id)
    ).length;
    return Math.round((completedChapters / path.chapters.length) * 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {learningPaths.map(path => {
        const pathProgress = getPathProgress(path);
        
        return (
          <div 
            key={path.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Book className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{path.name}</h3>
                <p className="text-gray-600">{path.description}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{path.targetTime}h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{path.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {path.chapters.length} chapters
                  </span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Skills:</div>
                <div className="flex flex-wrap gap-2">
                  {path.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {path.certificate && (
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-900">
                    Earn a certificate upon completion
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-900">Progress</span>
                  <span className="text-gray-600">{pathProgress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${pathProgress}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => onSelect(path.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {pathProgress > 0 ? 'Continue Path' : 'Start Path'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}