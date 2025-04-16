import React from 'react';
import { Search, ArrowLeft, ArrowRight } from 'lucide-react';
import { chapters } from '../data/chapters';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const currentIndex = chapters.findIndex(chapter => chapter.id === currentPage);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <header className="h-16 bg-white border-b fixed top-0 right-0 left-0 z-30 md:left-64">
      <div className="h-full flex items-center justify-between px-16 md:px-6">
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search handbook..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          {prevChapter && (
            <button
              onClick={() => onNavigate(prevChapter.id)}
              className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden md:inline">Previous: {prevChapter.title}</span>
              <span className="md:hidden">Prev</span>
            </button>
          )}
          {nextChapter && (
            <button
              onClick={() => onNavigate(nextChapter.id)}
              className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <span className="hidden md:inline">Next: {nextChapter.title}</span>
              <span className="md:hidden">Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}