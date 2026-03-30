"use client";
import Link from 'next/link';
import { PlayCircle, Clock, Target, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';

export default function StudentQuizzesPage() {
  const { quizzes } = useAppContext();
  const publishedQuizzes = quizzes.filter(q => q.status === 'Published');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Available Quizzes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedQuizzes.map(quiz => (
          <Card key={quiz.id} className="p-0 overflow-hidden flex flex-col hover:shadow-md transition-all border-gray-200">
            <div className="p-6 pb-4 border-b border-gray-100 flex-1">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                <Target size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{quiz.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{quiz.course}</p>
              
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-2 text-gray-400" />
                  {quiz.timeLimit} mins
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle2 size={16} className="mr-2 text-gray-400" />
                  {quiz.questionsCount} Qs
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Attempts: {quiz.attemptsLeft} left</span>
              <Link href={`/student/quizzes/${quiz.id}`}>
                <Button className="flex items-center gap-2 px-4 shadow-sm bg-[#002D62]" disabled={quiz.attemptsLeft === 0}>
                  {quiz.attemptsLeft === 0 ? 'Completed' : 'Start Quiz'} {quiz.attemptsLeft > 0 && <PlayCircle size={16} />}
                </Button>
              </Link>
            </div>
          </Card>
        ))}
        {publishedQuizzes.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
            <Target size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No quizzes available</h3>
            <p>You have no pending assessments.</p>
          </div>
        )}
      </div>
    </div>
  );
}
