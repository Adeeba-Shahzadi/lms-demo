"use client";
import { useState } from 'react';
import { UploadCloud, CheckCircle, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

export default function StudentAssignmentsPage() {
  const { assignments, setAssignments } = useAppContext();
  const [activeTab, setActiveTab] = useState('Pending');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const filteredAssignments = assignments.filter(a => {
    if (activeTab === 'Pending') return a.status === 'Pending' || a.status === 'Overdue';
    return a.status === 'Submitted' || a.status === 'Graded';
  });

  const openSubmit = (assignment) => {
    setSelectedAssignment(assignment);
    setIsSubmitModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAssignments(assignments.map(a => 
      a.id === selectedAssignment.id ? { ...a, status: 'Submitted' } : a
    ));
    toast.success('Assignment submitted successfully!');
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">My Assignments</h1>
      
      <div className="flex space-x-1 border-b border-gray-200">
        {['Pending', 'Submitted & Graded'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab ? 'border-[#3b4e33] text-[#3b4e33]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map(assignment => (
          <Card key={assignment.id} className="flex flex-col h-full hover:shadow-md transition-shadow duration-200">
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4">
                <Badge variant={
                  assignment.status === 'Pending' ? 'warning' :
                  assignment.status === 'Graded' ? 'success' :
                  assignment.status === 'Submitted' ? 'primary' : 'danger'
                }>
                  {assignment.status}
                </Badge>
                {assignment.status === 'Graded' && (
                  <span className="font-bold text-[#3b4e33] bg-blue-50 px-3 py-1 rounded-full text-sm">
                    {assignment.marksReceived}/{assignment.maxMarks}
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">{assignment.title}</h3>
              <p className="text-sm text-gray-500 mb-4 flex-1">{assignment.course}</p>
              
              <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 mb-2">
                <Clock size={16} className="mr-2 text-gray-400" />
                <span>Due: <strong className="text-gray-900">{assignment.dueDate}</strong></span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                {['Pending', 'Overdue'].includes(assignment.status) && (
                  <Button className="w-full" onClick={() => openSubmit(assignment)}>
                    Submit Work
                  </Button>
                )}
                {assignment.status === 'Submitted' && (
                  <Button variant="outline" className="w-full text-gray-500 border-gray-200 cursor-not-allowed" disabled>
                    <CheckCircle size={18} className="mr-2 text-green-500" /> Submitted
                  </Button>
                )}
                {assignment.status === 'Graded' && assignment.teacherFeedback && (
                  <div className="text-sm bg-amber-50 text-amber-900 p-3 rounded-lg border border-amber-100 mt-2">
                    <p className="font-semibold mb-1">Teacher Feedback:</p>
                    <p>"{assignment.teacherFeedback}"</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
        {filteredAssignments.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
            <CheckCircle size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No assignments here</h3>
            <p>You're all caught up for now.</p>
          </div>
        )}
      </div>

      <Modal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} title="Submit Assignment">
        {selectedAssignment && (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">{selectedAssignment.title}</h3>
              <p className="text-sm text-gray-500">{selectedAssignment.course}</p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-[#3b4e33] hover:bg-blue-50/50 transition-colors cursor-pointer text-center group">
              <UploadCloud size={48} className="mx-auto text-gray-400 mb-4 group-hover:text-[#3b4e33] transition-colors" />
              <p className="text-sm font-medium text-gray-900 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, DOCX, or ZIP (Max: 10MB)</p>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Add a comment (Optional)</label>
              <textarea 
                rows={3} 
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4e33] resize-none"
                placeholder="Message for your teacher..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button variant="outline" type="button" onClick={() => setIsSubmitModalOpen(false)}>Cancel</Button>
              <Button type="submit">Confirm Submission</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
