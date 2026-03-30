"use client";
import { useState } from 'react';
import { Plus, Check, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

export default function AssignmentsPage() {
  const { assignments, addAssignment, courses } = useAppContext();
  const myCourses = courses.filter(c => c.teacherName === 'Ms. Sara');
  const myAssignments = assignments.filter(a => myCourses.some(c => c.title === a.course));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGradingOpen, setIsGradingOpen] = useState(false);
  const [activeAssignment, setActiveAssignment] = useState(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(myCourses[0]?.title || '');
  const [dueDate, setDueDate] = useState('');
  const [maxMarks, setMaxMarks] = useState(100);

  const [gradingMarks, setGradingMarks] = useState({});
  const [gradingFeedback, setGradingFeedback] = useState({});

  const handlePost = (e) => {
    e.preventDefault();
    addAssignment({ title, course, dueDate, maxMarks, status: 'Pending', totalStudents: courses.find(c => c.title === course)?.studentsCount || 0 });
    toast.success('Assignment posted');
    setIsModalOpen(false);
    setTitle(''); setDescription(''); setDueDate('');
  };

  const openGrading = (assignment) => {
    setActiveAssignment(assignment);
    setIsGradingOpen(true);
  };

  const handleSaveGrades = () => {
    toast.success('Grades saved for ' + activeAssignment.title);
    setIsGradingOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center break-words">
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus size={18} /> Create Assignment
        </Button>
      </div>

      <Card className="flex flex-col h-[calc(100vh-140px)] min-h-[500px]">
        <div className="flex-1 overflow-auto">
          <Table headers={['Title', 'Course', 'Due Date', 'Submissions', 'Status', 'Actions']}>
            {myAssignments.map((assignment) => (
              <tr key={assignment.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-900">{assignment.title}</td>
                <td className="py-4 px-4 text-sm text-gray-500">{assignment.course}</td>
                <td className="py-4 px-4 text-sm text-gray-700">{assignment.dueDate}</td>
                <td className="py-4 px-4 text-sm font-medium">
                  {assignment.submissions} / {assignment.totalStudents}
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-[#002D62] h-1.5 rounded-full" style={{ width: `${(assignment.submissions / Math.max(assignment.totalStudents, 1)) * 100}%` }}></div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge variant={
                    assignment.status === 'Pending' ? 'warning' :
                    assignment.status === 'Graded' ? 'success' :
                    assignment.status === 'Submitted' ? 'primary' : 'danger'
                  }>
                    {assignment.status}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <Button variant="outline" className="text-sm py-1.5 px-3" onClick={() => openGrading(assignment)}>
                    Grade
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Assignment">
        <form onSubmit={handlePost} className="space-y-4">
          <Input label="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea 
              rows={3} value={description} onChange={e => setDescription(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002D62]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Course</label>
            <select value={course} onChange={e => setCourse(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002D62]" required>
              {myCourses.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Due Date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
            <Input label="Max Marks" type="number" value={maxMarks} onChange={e => setMaxMarks(e.target.value)} required />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Post Assignment</Button>
          </div>
        </form>
      </Modal>

      {/* Grading Modal */}
      <Modal isOpen={isGradingOpen} onClose={() => setIsGradingOpen(false)} title={`Grade: ${activeAssignment?.title}`}>
        {activeAssignment && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 text-[#002D62] rounded-lg mb-4 text-sm flex justify-between border border-blue-100">
              <span><strong>Course:</strong> {activeAssignment.course}</span>
              <span><strong>Max Marks:</strong> {activeAssignment.maxMarks}</span>
            </div>
            
            <div className="space-y-4 p-1">
              {['Ali Hassan', 'Omar Malik', 'Fatima Zohra'].map((student, idx) => (
                <div key={idx} className="border p-4 rounded-lg bg-gray-50 flex flex-col gap-3 shadow-sm hover:shadow transition-shadow">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">{student}</span>
                    <Badge variant="success">Submitted</Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-24">
                      <Input 
                        placeholder="Marks" 
                        type="number"
                        value={gradingMarks[student] || ''}
                        onChange={(e) => setGradingMarks({...gradingMarks, [student]: e.target.value})}
                      />
                    </div>
                    <div className="flex-1">
                      <Input 
                        placeholder="Add feedback..." 
                        value={gradingFeedback[student] || ''}
                        onChange={(e) => setGradingFeedback({...gradingFeedback, [student]: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6 border-t pt-4">
              <Button variant="outline" onClick={() => setIsGradingOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveGrades} className="flex items-center gap-2">
                <Check size={16} /> Save Grades
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
