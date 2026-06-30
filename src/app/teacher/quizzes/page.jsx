"use client";
import { useState } from 'react';
import { Plus, Trash2, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

export default function QuizzesPage() {
  const { quizzes, addQuiz, courses } = useAppContext();
  const myCourses = courses.filter(c => c.teacherName === 'Ms. Sara');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState(myCourses[0]?.title || '');
  const [timeLimit, setTimeLimit] = useState(30);
  const [questions, setQuestions] = useState([]);

  // Question State
  const [qText, setQText] = useState('');
  const [qOpts, setQOpts] = useState(['', '', '', '']);
  const [qCorrect, setQCorrect] = useState(0);

  const handleAddQuestion = () => {
    if (!qText || qOpts.some(o => !o)) return toast.error("Fill all question fields");
    if (questions.length >= 5) return toast.error("Max 5 questions allowed in demo");
    
    setQuestions([...questions, { text: qText, options: qOpts, correctIndex: qCorrect }]);
    setQText(''); setQOpts(['', '', '', '']); setQCorrect(0);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (questions.length === 0) return toast.error("Add at least one question");
    if (!title) return toast.error("Missing title");
    
    addQuiz({ title, course, timeLimit, questionsCount: questions.length, attemptsLeft: 1, status: 'Published' });
    toast.success('Quiz published');
    setIsModalOpen(false);
    setTitle(''); setQuestions([]);
  };

  const handleOptChange = (idx, val) => {
    const newOpts = [...qOpts];
    newOpts[idx] = val;
    setQOpts(newOpts);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Quizzes & Assessments</h1>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus size={18} /> Create Quiz
        </Button>
      </div>

      <Card className="flex flex-col min-h-[500px]">
        <div className="flex-1 overflow-auto">
          <Table headers={['Title', 'Course', 'Time Limit', 'Questions', 'Status', 'Actions']}>
            {quizzes.map((quiz) => (
              <tr key={quiz.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-900">{quiz.title}</td>
                <td className="py-4 px-4 text-sm text-gray-500">{quiz.course}</td>
                <td className="py-4 px-4 text-sm text-gray-700">{quiz.timeLimit} mins</td>
                <td className="py-4 px-4 text-sm font-medium text-center">{quiz.questionsCount}</td>
                <td className="py-4 px-4">
                  <Badge variant={quiz.status === 'Published' ? 'success' : 'default'}>
                    {quiz.status}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <button className="text-sm font-medium text-[#3b4e33] hover:text-blue-800">Edit</button>
                    <button className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Quiz Builder">
        <div className="space-y-6">
          <form className="space-y-4 border-b pb-6">
            <h3 className="font-semibold text-gray-900">1. Basic Details</h3>
            <Input label="Quiz Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Course</label>
                <select value={course} onChange={e => setCourse(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
                  {myCourses.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                </select>
              </div>
              <Input label="Time Limit (mins)" type="number" value={timeLimit} onChange={e => setTimeLimit(e.target.value)} required />
            </div>
          </form>

          <div className="space-y-4 border-b pb-6">
            <h3 className="font-semibold text-gray-900 flex justify-between">
              <span>2. Add Questions</span>
              <span className="text-sm font-normal text-gray-500">{questions.length}/5 Added</span>
            </h3>
            
            <div className="p-4 bg-gray-50 border rounded-lg space-y-3">
              <Input placeholder="Question Text" value={qText} onChange={e => setQText(e.target.value)} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {qOpts.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input type="radio" name="correctOpt" checked={qCorrect === i} onChange={() => setQCorrect(i)} className="text-[#3b4e33] focus:ring-[#3b4e33]" />
                    <input type="text" placeholder={`Option ${i+1}`} value={opt} onChange={e => handleOptChange(i, e.target.value)} className="flex-1 px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-[#3b4e33]" />
                  </div>
                ))}
              </div>
              <Button type="button" variant="secondary" className="w-full mt-2" onClick={handleAddQuestion}>
                Save Question
              </Button>
            </div>

            {questions.map((q, i) => (
              <div key={i} className="p-3 border border-gray-100 rounded-lg text-sm bg-white shadow-sm">
                <p className="font-medium text-gray-900">Q{i+1}: {q.text}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="button" onClick={handlePublish} className="flex items-center gap-2 bg-[#3b4e33]">
              <ShieldCheck size={18} /> Publish Quiz
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
