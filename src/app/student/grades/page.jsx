"use client";
import { Download, Award, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { StatCard } from '@/components/ui/StatCard';
import { useAppContext } from '@/context/AppContext';

export default function StudentGradesPage() {
  const { user, grades } = useAppContext();
  const myGrades = grades.filter(g => g.studentName === user?.name);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Academic Records</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Download size={18} /> Download Transcript
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in-up">
        <StatCard title="Overall Percentage" value="84%" icon={Award} trend={{ value: '+2% from last term', isPositive: true }} />
        <StatCard title="Registered Subjects" value="8" icon={TrendingUp} />
        <Card className="p-6 bg-gradient-to-br from-[#3b4e33] to-blue-400 text-white flex flex-col justify-center border-none transition-transform hover:scale-[1.02] duration-300">
          <h3 className="text-blue-100 font-medium text-sm mb-1">Academic Standing</h3>
          <p className="text-2xl font-bold">Good Standing</p>
        </Card>
      </div>

      <Card className="flex flex-col min-h-[400px]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Current Term Grades</h2>
        </div>
        <div className="flex-1 overflow-auto">
          <Table headers={['Course', 'Total Marks', 'Obtained Marks', 'Percentage', 'Grade']}>
            {myGrades.map((grade) => (
              <tr key={grade.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-900">{grade.courseTitle}</td>
                <td className="py-4 px-4 text-sm text-gray-600 font-medium">{grade.totalMarks}</td>
                <td className="py-4 px-4 text-sm text-gray-600 font-medium text-[#3b4e33]">{grade.obtainedMarks}</td>
                <td className="py-4 px-4 font-bold text-gray-900">{grade.percentage}%</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold shadow-sm border ${
                    grade.letter.includes('A') ? 'bg-green-50 text-green-700 border-green-200' :
                    grade.letter === 'B' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    grade.letter === 'C' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                    'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {grade.letter}
                  </span>
                </td>
              </tr>
            ))}
            {myGrades.length === 0 && (
              <tr>
                <td colSpan="5" className="py-12 text-center text-gray-500">
                  No grades posted yet.
                </td>
              </tr>
            )}
          </Table>
        </div>
      </Card>
    </div>
  );
}
