"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MOCK_QUIZ_QUESTIONS } from '@/lib/mockData';
import { useAppContext } from '@/context/AppContext';

export default function QuizTakingPage({ params }) {
  const router = useRouter();
  const { quizzes } = useAppContext();
  const quiz = quizzes.find(q => q.id === params.id) || quizzes[0];
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quiz?.timeLimit * 60 || 1800);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = MOCK_QUIZ_QUESTIONS.slice(0, quiz?.questionsCount || 5);

  useEffect(() => {
    if (isSubmitted || !quiz) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, quiz]);

  const toggleAnswer = (qId, optionIdx) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [qId]: optionIdx });
  };

  const handleSubmit = () => {
    let finalScore = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctIndex) finalScore++;
    });
    setScore(finalScore);
    setIsSubmitted(true);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!quiz) return null;

  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto space-y-6 pt-10">
        <Card className="p-8 text-center space-y-6">
          <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center bg-blue-50 border-4 border-[#3b4e33] shadow-sm">
            <span className="text-3xl font-bold text-[#3b4e33]">{percentage}%</span>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
            <p className="text-gray-600">You scored {score} out of {questions.length} questions correctly.</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 text-left border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Detailed Breakdown</h3>
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className="border-b last:border-0 pb-4 last:pb-0 border-gray-200">
                  <p className="text-sm font-medium text-gray-800 mb-2">{i+1}. {q.text}</p>
                  <p className="text-xs">
                    Your answer: <span className={answers[q.id] === q.correctIndex ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                      {answers[q.id] !== undefined ? q.options[answers[q.id]] : 'None'}
                    </span>
                  </p>
                  {answers[q.id] !== q.correctIndex && (
                    <p className="text-xs text-green-600 font-medium mt-1">Correct answer: {q.options[q.correctIndex]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full" onClick={() => router.push('/student/quizzes')}>
            Return to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const activeQ = questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 sticky top-0 z-10">
        <div>
          <h1 className="font-bold text-gray-900 leading-tight">{quiz.title}</h1>
          <p className="text-xs text-gray-500 mt-1">Question {currentIdx + 1} of {questions.length}</p>
        </div>
        <div className={`flex items-center gap-2 font-mono font-bold px-3 py-1.5 rounded-lg
          ${timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'}
        `}>
          <Clock size={16} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <Card className="p-6 md:p-8">
        <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-8 leading-relaxed">
          {currentIdx + 1}. {activeQ.text}
        </h2>

        <div className="space-y-3">
          {activeQ.options.map((opt, idx) => {
            const isSelected = answers[activeQ.id] === idx;
            return (
              <button
                key={idx}
                onClick={() => toggleAnswer(activeQ.id, idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group
                  ${isSelected ? 'border-[#3b4e33] bg-blue-50/50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                `}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0
                  ${isSelected ? 'border-[#3b4e33]' : 'border-gray-300 group-hover:border-gray-400'}
                `}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#3b4e33]"></div>}
                </div>
                <span className={`text-base font-medium ${isSelected ? 'text-[#3b4e33]' : 'text-gray-700'}`}>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
          <Button 
            variant="outline" 
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="px-6"
          >
            Previous
          </Button>

          {currentIdx < questions.length - 1 ? (
            <Button onClick={() => setCurrentIdx(prev => prev + 1)} className="px-8 bg-[#3b4e33]">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="px-8 bg-green-600 hover:bg-green-700 focus:ring-green-500 border-none outline-none text-white">
              Submit Quiz
            </Button>
          )}
        </div>
      </Card>
      
      {Object.keys(answers).length < questions.length && currentIdx === questions.length - 1 && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
          <AlertCircle size={16} /> You have unanswered questions remaining!
        </div>
      )}
    </div>
  );
}
