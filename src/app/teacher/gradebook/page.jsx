"use client";
import { useState } from 'react';
import { Download } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

export default function GradebookPage() {
  const { courses, grades } = useAppContext();
  const myCourses = courses.filter(c => c.teacherName === 'Ms. Sara');
  const [selectedCourse, setSelectedCourse] = useState(myCourses[0]?.title || '');

  const handleExport = () => {
    toast.success('Gradebook exported as CSV');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Gradebook</h1>
        <div className="flex items-center gap-4">
          <select 
            value={selectedCourse} 
            onChange={e => setSelectedCourse(e.target.value)} 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4e33] bg-white min-w-[200px]"
          >
            {myCourses.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
          </select>
          <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
            <Download size={18} /> Export
          </Button>
        </div>
      </div>

      <Card className="flex flex-col min-h-[500px]">
        <div className="flex-1 overflow-auto">
          <Table headers={['Student Name', 'Assignment 1', 'Assignment 2', 'Quiz 1', 'Quiz 2', 'Final Grade', 'Letter']}>
            {grades.map((grade) => (
              <tr key={grade.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-900">{grade.studentName}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{grade.a1}/50</td>
                <td className="py-4 px-4 text-sm text-gray-600">{grade.a2}/100</td>
                <td className="py-4 px-4 text-sm text-gray-600">{grade.q1}/30</td>
                <td className="py-4 px-4 text-sm text-gray-600">{grade.q2}/15</td>
                <td className="py-4 px-4 font-bold text-[#3b4e33]">{grade.final}%</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ${
                    grade.letter === 'A' ? 'bg-green-100 text-green-700' :
                    grade.letter === 'B' ? 'bg-blue-100 text-blue-700' :
                    grade.letter === 'C' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {grade.letter}
                  </span>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </Card>
    </div>
  );
}
