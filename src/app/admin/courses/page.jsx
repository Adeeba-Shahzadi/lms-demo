"use client";
import { useState } from 'react';
import { Plus, Archive } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

export default function CoursesPage() {
  const { courses, addCourse } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [teacher, setTeacher] = useState('Ms. Sara');

  const handleAddCourse = (e) => {
    e.preventDefault();
    addCourse({ title, teacherName: teacher, studentsCount: 0 });
    toast.success('Course created successfully');
    setIsModalOpen(false);
    setTitle(''); setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center break-words">
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus size={18} /> Add Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <Card key={course.id} className="p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <Badge variant={course.status === 'Active' ? 'success' : 'default'}>
                {course.status}
              </Badge>
              <button className="text-gray-400 hover:text-[#002D62] transition-colors">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 mb-1">{course.title}</h3>
            <p className="text-sm text-gray-500 mb-6 flex-1">Teacher: <span className="text-gray-700 font-medium">{course.teacherName}</span></p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm font-medium text-gray-700">
                 {course.studentsCount} <span className="text-gray-500 font-normal">Students</span>
              </div>
              <div className="flex gap-3">
                <button className="text-sm font-medium text-[#002D62] hover:text-blue-800 transition-colors">Edit</button>
                <button className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors flex items-center gap-1">
                  <Archive size={14} /> Archive
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Course">
        <form onSubmit={handleAddCourse} className="space-y-4">
          <Input 
            label="Course Title" 
            placeholder="e.g. Advanced Mathematics" 
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea 
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002D62]"
              placeholder="Course description..."
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Assign Teacher</label>
            <select 
              value={teacher}
              onChange={e => setTeacher(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002D62]"
            >
              <option value="Ms. Sara">Ms. Sara</option>
              <option value="Mr. John">Mr. John</option>
              <option value="Ms. Emily">Ms. Emily</option>
              <option value="Mr. Smith">Mr. Smith</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Publish Course</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
