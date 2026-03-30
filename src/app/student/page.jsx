"use client";
import Link from 'next/link';
import { BookOpen, Clock, Target, Award, Bell, FileText } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { useAppContext } from '@/context/AppContext';

export default function StudentDashboard() {
  const { user, notifications } = useAppContext();
  const unreadNotifs = notifications.filter(n => !n.read).slice(0, 2);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-[#002D62] text-white p-6 rounded-2xl shadow-sm mb-8 relative overflow-hidden">
        <div className="relative z-10 p-2">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Good morning, {user?.name.split(' ')[0]} 👋</h1>
          <p className="text-blue-100 max-w-lg">You have 2 upcoming deadlines this week. Keep up the great work!</p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Enrolled Courses" value="3" icon={BookOpen} />
        <StatCard title="Pending Assignments" value="2" icon={Clock} />
        <StatCard title="Upcoming Quizzes" value="1" icon={Target} />
        <StatCard title="Overall Percentage" value="84%" icon={Award} trend={{ value: '+2.5%', isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
            <Link href="/student/assignments" className="text-sm font-medium text-[#002D62] hover:text-blue-800">View All</Link>
          </div>
          <div className="space-y-4">
            {[
              { id: 1, title: 'Algebra Worksheet', course: 'Mathematics Grade 10', date: 'Tomorrow, 11:59 PM', type: 'Assignment' },
              { id: 2, title: 'Chapter 5 Questions', course: 'Physics Grade 11', date: 'In 3 days', type: 'Assignment' },
              { id: 3, title: 'Kinematics Basics', course: 'Physics Grade 11', date: 'In 4 days', type: 'Quiz' },
            ].map(item => (
              <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow bg-white">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  item.type === 'Quiz' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-[#002D62]'
                }`}>
                  {item.type === 'Quiz' ? <Target size={20} /> : <FileText size={20} />}
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
            <Link href="/student/notifications" className="text-sm font-medium text-[#002D62] hover:text-blue-800">View All</Link>
          </div>
          <div className="space-y-4">
            {unreadNotifs.length > 0 ? unreadNotifs.map(notif => (
              <div key={notif.id} className="flex gap-4 p-4 rounded-lg bg-blue-50/50 border-l-4 border-l-[#002D62]">
                <div className="w-8 h-8 rounded-full bg-white text-[#002D62] flex items-center justify-center shrink-0 shadow-sm">
                  <Bell size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{notif.title}</h3>
                  <p className="text-sm text-gray-600 mt-0.5">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notif.timeAgo}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-gray-500">
                <Bell size={32} className="mx-auto text-gray-300 mb-3" />
                <p>You're all caught up!</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
