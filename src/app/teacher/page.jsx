"use client";
import Link from 'next/link';
import { BookOpen, Users, Clock, Target, Plus, FileText } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function TeacherDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="My Courses" value="3" icon={BookOpen} />
        <StatCard title="Total Students" value="67" icon={Users} />
        <StatCard title="Pending Grading" value="8" icon={Clock} trend={{ value: '2 less', isPositive: true }} />
        <StatCard title="Avg Class Score" value="76%" icon={Target} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
          <div className="space-y-4">
            {[
              { id: 1, title: 'Algebra Worksheet', course: 'Mathematics Grade 10', date: 'Tomorrow, 11:59 PM', type: 'Assignment' },
              { id: 2, title: 'Kinematics Basics', course: 'Physics Grade 11', date: '2 days from now', type: 'Quiz Draft' },
              { id: 3, title: 'Motion Lab Report', course: 'Physics Grade 11', date: 'In 4 days', type: 'Assignment' },
            ].map(item => (
              <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#002D62] flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">{item.course}</p>
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{item.date}</span>
                    <span className="text-xs text-gray-400 hidden sm:inline">•</span>
                    <span className="text-xs text-gray-500">{item.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/teacher/assignments" className="block p-4 border border-gray-100 rounded-lg hover:border-[#002D62] hover:bg-blue-50/50 transition-colors group">
              <div className="w-12 h-12 bg-blue-100 text-[#002D62] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">Create Assignment</h3>
              <p className="text-sm text-gray-500 mt-1">Post a new task for your students to complete.</p>
            </Link>
            
            <Link href="/teacher/quizzes" className="block p-4 border border-gray-100 rounded-lg hover:border-[#F5C400] hover:bg-amber-50/50 transition-colors group">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">New Quiz</h3>
              <p className="text-sm text-gray-500 mt-1">Build a multiple-choice quiz assessment.</p>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
