import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizCardProps {
  questions: QuizQuestion[];
  moduleId?: string;
}

export function QuizCard({ questions, moduleId }: QuizCardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showExplanations, setShowExplanations] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [score, setScore] = useState<number | null>(null);
  const { updateQuizScore } = useProgress();

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (showExplanations[questionIndex]) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);

    const newExplanations = [...showExplanations];
    newExplanations[questionIndex] = true;
    setShowExplanations(newExplanations);

    // Calculate score when all questions are answered
    const answeredQuestions = newAnswers.filter(answer => answer !== -1).length;
    if (answeredQuestions === questions.length) {
      const correctAnswers = newAnswers.filter((answer, index) => 
        answer === questions[index].correctAnswer
      ).length;
      const finalScore = Math.round((correctAnswers / questions.length) * 100);
      setScore(finalScore);
      
      // Ensure moduleId is valid before updating score
      if (moduleId && moduleId !== 'undefined') {
        updateQuizScore(moduleId, finalScore);
      } else {
        console.error('Invalid moduleId provided to QuizCard:', moduleId);
      }
    }
  };

  return (
    <div className="space-y-8">
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{question.question}</h3>
          </div>

          <div className="space-y-3 mb-4">
            {question.options.map((option, optionIndex) => {
              const isSelected = selectedAnswers[questionIndex] === optionIndex;
              const isCorrect = optionIndex === question.correctAnswer;
              const showResult = showExplanations[questionIndex];

              let buttonClass = "w-full text-left px-4 py-3 rounded-lg border ";
              if (isSelected && showResult) {
                buttonClass += isCorrect 
                  ? "bg-green-50 border-green-200 text-green-900" 
                  : "bg-red-50 border-red-200 text-red-900";
              } else {
                buttonClass += isSelected
                  ? "bg-blue-50 border-blue-200 text-blue-900"
                  : "bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100";
              }

              return (
                <button
                  key={optionIndex}
                  className={buttonClass}
                  onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                  disabled={showExplanations[questionIndex]}
                >
                  <div className="flex items-center gap-3">
                    {showResult && isSelected && (
                      isCorrect 
                        ? <CheckCircle className="w-5 h-5 text-green-600" />
                        : <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {showExplanations[questionIndex] && (
            <div className={`p-4 rounded-lg ${
              selectedAnswers[questionIndex] === question.correctAnswer
                ? "bg-green-50 border border-green-200 text-green-900"
                : "bg-red-50 border border-red-200 text-red-900"
            }`}>
              <p>{question.explanation}</p>
            </div>
          )}
        </div>
      ))}

      {score !== null && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">
              Final Score: {score.toFixed(0)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}