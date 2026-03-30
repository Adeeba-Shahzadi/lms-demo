"use client";
import { Users, BookOpen, Clock, Activity } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Oct', enrollments: 45 },
  { name: 'Nov', enrollments: 52 },
  { name: 'Dec', enrollments: 38 },
  { name: 'Jan', enrollments: 65 },
  { name: 'Feb', enrollments: 85 },
  { name: 'Mar', enrollments: 120 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value="240" icon={Users} trend={{ value: '12%', isPositive: true }} />
        <StatCard title="Total Teachers" value="18" icon={Activity} />
        <StatCard title="Total Courses" value="12" icon={BookOpen} />
        <StatCard title="Active Today" value="87" icon={Clock} trend={{ value: '5%', isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Enrollments</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                <Tooltip 
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="enrollments" fill="#002D62" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="flex-1 overflow-y-auto space-y-4">
            {[
              { id: 1, user: 'Ali Hassan', action: 'submitted Assignment 2', time: '2 mins ago' },
              { id: 2, user: 'Ms. Sara', action: 'created a new course', time: '1 hour ago' },
              { id: 3, user: 'Omar Malik', action: 'enrolled in Physics', time: '3 hours ago' },
              { id: 4, user: 'System', action: 'Weekly backup completed', time: '5 hours ago' },
              { id: 5, user: 'Mr. Ahmed', action: 'updated school settings', time: '1 day ago' },
            ].map(item => (
              <div key={item.id} className="flex gap-3 text-sm">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-[#F5C400] shrink-0"></div>
                <div>
                  <p className="text-gray-900"><span className="font-medium text-[#002D62]">{item.user}</span> {item.action}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
