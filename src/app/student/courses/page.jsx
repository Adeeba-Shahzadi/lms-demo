"use client";
import Link from 'next/link';
import { PlayCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';

export default function StudentCoursesPage() {
  const { courses } = useAppContext();
  // Mock currently enrolled courses for the student
  const enrolledCourses = courses.slice(0, 3);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Learning</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map(course => (
          <Card key={course.id} className="p-0 flex flex-col hover:shadow-lg transition-shadow overflow-hidden group border-gray-200">
            <div className="h-40 bg-gradient-to-br from-[#002D62] to-blue-400 relative p-6 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-white leading-tight mt-auto">{course.title}</h3>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">{course.teacherName.charAt(0)}</span>
                <span className="font-medium text-gray-900">{course.teacherName}</span>
              </p>
              
              <div className="mt-auto mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">Progress</span>
                  <span className="text-[#002D62] font-bold">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#002D62] h-2 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              
              <Link href={`/student/courses/${course.id}`}>
                <Button className="w-full flex items-center justify-center gap-2 group-hover:bg-blue-700">
                  <PlayCircle size={18} /> Continue Learning
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
