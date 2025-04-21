import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Clock, Award } from 'lucide-react';

interface ModuleProgressProps {
  moduleId: string;
  moduleName: string;
}

export function ModuleProgress({ moduleId, moduleName }: ModuleProgressProps) {
  const { progress } = useProgress();
  const { user } = useAuth();
  
  // Check if this module is completed
  const isCompleted = progress.completedChapters.includes(moduleId);
  
  // Get quiz score for this module if available
  const quizScore = progress.quizScores[moduleId];
  
  // Get simulation score for this module if available
  const simulationScore = progress.simulationScores[moduleId];
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-900">{moduleName} Progress</h3>
        {isCompleted ? (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Completed</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-blue-600">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">In Progress</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        {quizScore !== undefined && (
          <div className="bg-gray-50 rounded p-3">
            <div className="text-sm text-gray-500 mb-1">Quiz Score</div>
            <div className="font-medium text-gray-900">{quizScore}%</div>
          </div>
        )}
        
        {simulationScore !== undefined && (
          <div className="bg-gray-50 rounded p-3">
            <div className="text-sm text-gray-500 mb-1">Simulation Score</div>
            <div className="font-medium text-gray-900">{simulationScore}%</div>
          </div>
        )}
      </div>
      
      {user && (
        <div className="mt-4 text-xs text-gray-500">
          Progress is automatically saved and synced to your account.
        </div>
      )}
    </div>
  );
}