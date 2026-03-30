"use client";
import { useState } from 'react';
import { Save } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

export default function AttendancePage() {
  const { courses, users } = useAppContext();
  const myCourses = courses.filter(c => c.teacherName === 'Ms. Sara');
  const students = users.filter(u => u.role === 'STUDENT');

  const [selectedCourse, setSelectedCourse] = useState(myCourses[0]?.title || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Initialize attendance state with Present
  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => ({ ...acc, [student.id]: 'Present' }), {})
  );

  const handleToggle = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: prev[studentId] === 'Present' ? 'Absent' : 'Present'
    }));
  };

  const handleSave = () => {
    toast.success(`Attendance saved for ${date}`);
  };

  const presentCount = Object.values(attendance).filter(status => status === 'Present').length;
  const absentCount = Object.keys(attendance).length - presentCount;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Attendance Tracker</h1>
        <div className="flex items-center gap-4">
          <select 
            value={selectedCourse} 
            onChange={e => setSelectedCourse(e.target.value)} 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002D62] bg-white min-w-[200px]"
          >
            {myCourses.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
          </select>
          <input 
            type="date" 
            value={date}
            onChange={e => setDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002D62] bg-white"
          />
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-3 px-6 font-semibold text-sm text-gray-600">Student Name</th>
                <th className="py-3 px-6 font-semibold text-sm text-gray-600">Status</th>
                <th className="py-3 px-6 font-semibold text-sm text-gray-600 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map(student => (
                <tr key={student.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-[#002D62]">
                      {student.name.charAt(0)}
                    </div>
                    {student.name}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      attendance[student.id] === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {attendance[student.id]}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleToggle(student.id)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#002D62] focus:ring-offset-2 ${
                        attendance[student.id] === 'Present' ? 'bg-[#002D62]' : 'bg-gray-200'
                      }`}
                    >
                      <span className="sr-only">Toggle attendance</span>
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          attendance[student.id] === 'Present' ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-4">
            <div className="font-medium text-green-700 bg-green-100 px-4 py-1.5 rounded-lg border border-green-200">
              Present: {presentCount}
            </div>
            <div className="font-medium text-red-700 bg-red-100 px-4 py-1.5 rounded-lg border border-red-200">
              Absent: {absentCount}
            </div>
          </div>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save size={18} /> Save Attendance
          </Button>
        </div>
      </Card>
    </div>
  );
}
