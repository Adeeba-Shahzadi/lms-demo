"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, FileText, Presentation, CheckCircle2, Circle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { MOCK_COURSE_MODULES } from '@/lib/mockData';
import { useAppContext } from '@/context/AppContext';

export default function StudentCourseDetails({ params }) {
  const { courses } = useAppContext();
  const course = courses.find(c => c.id === params.id) || courses[0];
  const [modules, setModules] = useState(MOCK_COURSE_MODULES);
  const [expandedModule, setExpandedModule] = useState(MOCK_COURSE_MODULES[0]?.id);

  const toggleLessonComplete = (moduleId, lessonId) => {
    setModules(modules.map(mod => {
      if (mod.id === moduleId) {
        return {
          ...mod,
          lessons: mod.lessons.map(l => l.id === lessonId ? { ...l, completed: !l.completed } : l)
        };
      }
      return mod;
    }));
  };

  if (!course) return null;

  const totalLessons = modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedLessons = modules.reduce((acc, mod) => acc + mod.lessons.filter(l => l.completed).length, 0);
  const progressPercent = Math.round((completedLessons / totalLessons) * 100) || 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 border-b pb-6">
        <Link href="/student/courses" className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-sm text-gray-500 mt-1">Instructor: {course.teacherName}</p>
        </div>
      </div>

      <Card className="p-6 bg-blue-50/50 border-blue-100 flex items-center gap-6">
        <div className="w-20 h-20 shrink-0 relative flex items-center justify-center">
          <svg className="w-20 h-20 -rotate-90 transform" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#E0E7FF" strokeWidth="8" fill="none" />
            <circle cx="50" cy="50" r="40" stroke="#3b4e33" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * progressPercent) / 100} className="transition-all duration-1000 ease-out" />
          </svg>
          <span className="absolute text-lg font-bold text-[#3b4e33]">{progressPercent}%</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">Your Progress</h3>
          <p className="text-gray-600">You have completed {completedLessons} out of {totalLessons} lessons.</p>
        </div>
      </Card>

      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Course Curriculum</h2>
        
        {modules.map(module => (
          <Card key={module.id} className="overflow-hidden">
            <button 
              onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-mono text-sm">{(module.id.replace('m', ''))}</span>
                <h3 className="font-semibold text-gray-900">{module.title}</h3>
              </div>
              <span className="text-sm text-gray-500">{module.lessons.filter(l => l.completed).length}/{module.lessons.length} completed</span>
            </button>
            
            {expandedModule === module.id && (
              <div className="divide-y divide-gray-100 border-t border-gray-100">
                {module.lessons.map(lesson => (
                  <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <button onClick={() => toggleLessonComplete(module.id, lesson.id)} className="text-gray-400 hover:text-[#3b4e33] transition-colors focus:outline-none">
                        {lesson.completed ? <CheckCircle2 className="text-green-500" size={24} /> : <Circle size={24} />}
                      </button>
                      
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${lesson.type === 'Video' ? 'bg-blue-100 text-blue-600' : lesson.type === 'Slides' ? 'bg-amber-100 text-amber-600' : 'bg-purple-100 text-purple-600'}`}>
                          {lesson.type === 'Video' ? <PlayCircle size={18} /> : lesson.type === 'Slides' ? <Presentation size={18} /> : <FileText size={18} />}
                        </div>
                        <div>
                          <p className={`font-medium ${lesson.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{lesson.title}</p>
                          <p className="text-xs text-gray-500">{lesson.type}</p>
                        </div>
                      </div>
                    </div>
                    {!lesson.completed && (
                      <button className="text-sm font-medium text-[#3b4e33] opacity-0 group-hover:opacity-100 transition-opacity pr-4" onClick={() => toggleLessonComplete(module.id, lesson.id)}>
                        Mark Complete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
