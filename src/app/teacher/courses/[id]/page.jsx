"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, PlayCircle, Presentation, Plus, Upload } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_COURSE_MODULES } from '@/lib/mockData';
import { useAppContext } from '@/context/AppContext';

export default function CourseDetails({ params }) {
  const { courses } = useAppContext();
  const course = courses.find(c => c.id === params.id) || courses[0];
  const [expandedModule, setExpandedModule] = useState(MOCK_COURSE_MODULES[0]?.id);

  if (!course) return <div>Course not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/teacher/courses" className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
            <Badge variant="success">Active</Badge>
          </div>
          <p className="text-sm text-gray-500 mt-1">{course.studentsCount} Students Enrolled</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Course Content</h2>
            <Button variant="outline" className="text-sm flex items-center gap-2">
              <Plus size={16} /> Add Module
            </Button>
          </div>

          {MOCK_COURSE_MODULES.map(module => (
            <Card key={module.id} className="overflow-hidden">
              <button 
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold text-gray-900">{module.title}</h3>
                <span className="text-gray-500 text-sm">{module.lessons.length} lessons</span>
              </button>
              
              {expandedModule === module.id && (
                <div className="divide-y divide-gray-100 border-t border-gray-100">
                  {module.lessons.map(lesson => (
                    <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          lesson.type === 'Video' ? 'bg-blue-100 text-blue-600' :
                          lesson.type === 'Slides' ? 'bg-amber-100 text-amber-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {lesson.type === 'Video' ? <PlayCircle size={18} /> : 
                           lesson.type === 'Slides' ? <Presentation size={18} /> : 
                           <FileText size={18} />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{lesson.title}</p>
                          <p className="text-xs text-gray-500">{lesson.type}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="text-xs h-8 px-3 flex items-center gap-2">
                        <Upload size={14} /> Upload Content
                      </Button>
                    </div>
                  ))}
                  <div className="p-4 bg-gray-50/50 text-center">
                    <button className="text-sm font-medium text-[#002D62] hover:text-blue-800 flex items-center justify-center w-full gap-2">
                      <Plus size={16} /> Add Lesson
                    </button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Course Overview</h3>
            <div className="flex items-end justify-between mb-2">
              <span className="text-3xl font-bold text-[#002D62]">{course.progress}%</span>
              <span className="text-sm text-gray-500 pb-1">avg completion rate</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div className="bg-[#002D62] h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Students Passed</span>
                <span className="font-medium text-gray-900">{Math.floor(course.studentsCount * 0.75)} / {course.studentsCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Avg. Score</span>
                <span className="font-medium text-gray-900">78%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
