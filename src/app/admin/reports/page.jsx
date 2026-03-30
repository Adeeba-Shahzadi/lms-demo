"use client";
import { Card } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, CheckCircle2, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';

const chartData = [
  { week: 'Week 1', score: 65 },
  { week: 'Week 2', score: 68 },
  { week: 'Week 3', score: 71 },
  { week: 'Week 4', score: 74 },
  { week: 'Week 5', score: 82 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">SSPHS Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Avg Attendance" value="87%" icon={CheckCircle2} trend={{ value: '2%', isPositive: true }} />
        <StatCard title="Avg Quiz Score" value="74%" icon={Target} trend={{ value: '4%', isPositive: true }} />
        <StatCard title="Assignment Completion" value="91%" icon={TrendingUp} trend={{ value: '1%', isPositive: false }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Weekly Quiz Performance</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} domain={[0, 100]} />
                <Tooltip 
                  cursor={{ stroke: '#E5E7EB', strokeWidth: 2 }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="score" stroke="#002D62" strokeWidth={3} dot={{ r: 4, fill: '#002D62' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100 mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Top Performing Students</h2>
          </div>
          <div className="flex-1 overflow-x-auto">
            <Table headers={['Rank', 'Student Name', 'Avg Score', 'Grade']}>
              {[
                { rank: 1, name: 'Fatima Zohra', score: '94%', grade: 'A' },
                { rank: 2, name: 'Ali Hassan', score: '87%', grade: 'A' },
                { rank: 3, name: 'Ayesha Rahman', score: '79%', grade: 'B' },
                { rank: 4, name: 'Omar Malik', score: '65%', grade: 'C' },
              ].map((student) => (
                <tr key={student.rank} className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 text-center font-bold text-gray-400">#{student.rank}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">{student.name}</td>
                  <td className="py-3 px-4 font-medium text-[#002D62]">{student.score}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      student.grade === 'A' ? 'bg-green-100 text-green-700' :
                      student.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {student.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
