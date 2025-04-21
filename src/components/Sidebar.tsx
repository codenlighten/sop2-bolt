import React from 'react';
import { chapters } from '../data/chapters';
import { useProgress } from '../context/ProgressContext';
import * as Icons from 'lucide-react';
import { Award, ChevronRight, CheckCircle, AlignCenterVertical as Certificate } from 'lucide-react';

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onShowProgress: () => void;
}

export function Sidebar({ onNavigate, currentPage, onShowProgress }: SidebarProps) {
  const { progress } = useProgress();

  return (
    <nav className="w-64 bg-slate-800 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Icons.Shield className="w-6 h-6" />
          SOP Handbook
        </h1>
      </div>
      
      <div className="mt-6">
        {chapters.map((chapter) => {
          const Icon = Icons[chapter.icon as keyof typeof Icons];
          const earnedBadges = chapter.badges.filter(badge => 
            progress.earnedBadges.includes(badge.id)
          );
          const isCompleted = progress.completedChapters.includes(chapter.id);
          const hasProgress = progress.quizScores[chapter.id] || progress.simulationScores[chapter.id];

          return (
            <button
              key={chapter.id}
              onClick={() => onNavigate(chapter.id)}
              className={`w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors ${
                currentPage === chapter.id ? 'bg-slate-700' : ''
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {isCompleted && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800" />
                )}
                {!isCompleted && hasProgress && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-slate-800" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium">{chapter.title}</div>
                <div className="text-sm text-slate-400">{chapter.description}</div>
                {earnedBadges.length > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    {earnedBadges.map(badge => (
                      <Award 
                        key={badge.id} 
                        className={`w-4 h-4 ${
                          badge.tier === 'gold'
                            ? 'text-yellow-500'
                            : badge.tier === 'silver'
                              ? 'text-gray-400'
                              : 'text-orange-500'
                        }`} 
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                {isCompleted && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </div>
            </button>
          );
        })}

        <button
          onClick={() => onNavigate('certificates')}
          className={`w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors ${
            currentPage === 'certificates' ? 'bg-slate-700' : ''
          }`}
        >
          <Certificate className="w-5 h-5" />
          <div className="flex-1">
            <div className="font-medium">Certificates</div>
            <div className="text-sm text-slate-400">View your earned certificates</div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        <button
          onClick={onShowProgress}
          className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors mt-4 border-t border-slate-700"
        >
          <Award className="w-5 h-5" />
          <div>
            <div className="font-medium">View Progress</div>
            <div className="text-sm text-slate-400">
              {progress.earnedBadges.length} badges earned
            </div>
          </div>
        </button>
      </div>
    </nav>
  );
}