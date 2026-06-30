"use client";
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [schoolName, setSchoolName] = useState('EduNest Academy');
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [gradingScale, setGradingScale] = useState('Percentage');
  const [primaryColor, setPrimaryColor] = useState('#3b4e33');

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
      
      <form onSubmit={handleSave}>
        <Card className="p-6 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-lg font-semibold text-gray-900">General Information</h2>
            <p className="text-sm text-gray-500">Configure the basic information for your school LMS.</p>
          </div>

          <div className="space-y-4">
            <Input 
              label="School Name" 
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Academic Year</label>
                <select 
                  value={academicYear}
                  onChange={e => setAcademicYear(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4e33]"
                >
                  <option>2025-2026</option>
                  <option>2026-2027</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Grading Scale</label>
                <select 
                  value={gradingScale}
                  onChange={e => setGradingScale(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4e33]"
                >
                  <option>Letter Grades (A-F)</option>
                  <option>Percentage</option>
                  <option>GPA (4.0 Scale)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Primary Brand Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={primaryColor}
                  onChange={e => setPrimaryColor(e.target.value)}
                  className="h-10 w-10 border-0 p-0 rounded-lg cursor-pointer"
                />
                <span className="text-sm text-gray-500 font-mono">{primaryColor}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <Button type="submit" className="flex items-center gap-2">
              <Save size={18} /> Save Changes
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
