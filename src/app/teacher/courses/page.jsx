"use client";
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';

export default function TeacherCoursesPage() {
  const { courses } = useAppContext();
  // Filter for Ms. Sara (demo teacher)
  const myCourses = courses.filter(c => c.teacherName === 'Ms. Sara');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map(course => (
          <Card key={course.id} className="p-6 flex flex-col hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
            
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-900">{course.studentsCount}</span> Students Enrolled
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 font-medium">Class Progress</span>
                <span className="text-[#3b4e33] font-bold">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#3b4e33] h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
            
            <div className="mt-auto">
              <Link href={`/teacher/courses/${course.id}`}>
                <Button className="w-full">View Course Details</Button>
              </Link>
            </div>
          </Card>
        ))}
        {myCourses.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            You do not have any assigned courses yet.
          </div>
        )}
      </div>
    </div>
  );
}
