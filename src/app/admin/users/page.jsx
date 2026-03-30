"use client";
import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import { registerUser } from '@/lib/mockAuth';

export default function UsersPage() {
  const { users, addUser } = useAppContext();
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New user form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('STUDENT');

  const filteredUsers = users.filter(user => {
    const matchesTab = activeTab === 'All' || 
                      (activeTab === 'Students' && user.role === 'STUDENT') ||
                      (activeTab === 'Teachers' && user.role === 'TEACHER');
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    addUser({ name: newName, email: newEmail, role: newRole });
    registerUser({ email: newEmail, password: newPassword, role: newRole, name: newName });
    toast.success(`${newName} added successfully`);
    setIsModalOpen(false);
    setNewName(''); setNewEmail(''); setNewPassword(''); setNewRole('STUDENT');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2">
          <Plus size={18} /> Add User
        </Button>
      </div>

      <Card className="flex flex-col h-[calc(100vh-180px)] min-h-[500px]">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex space-x-1 bg-gray-100/80 p-1 rounded-lg">
            {['All', 'Students', 'Teachers'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <Table headers={['Name', 'Email', 'Role', 'Status', 'Actions']}>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#002D62]/10 text-[#002D62] flex items-center justify-center font-bold text-sm mr-3 shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">{user.email}</td>
                <td className="py-3 px-4">
                  <Badge variant={user.role === 'ADMIN' ? 'accent' : user.role === 'TEACHER' ? 'primary' : 'default'}>
                    {user.role}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Badge variant={user.status === 'Active' ? 'success' : 'danger'}>
                    {user.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-sm font-medium">
                  <div className="flex space-x-3">
                    <button className="text-[#002D62] hover:text-blue-800 transition-colors">Edit</button>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">Deactivate</button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">No users found</td>
              </tr>
            )}
          </Table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New User">
        <form onSubmit={handleAddUser} className="space-y-4">
          <Input 
            label="Full Name" 
            placeholder="John Doe" 
            value={newName}
            onChange={e => setNewName(e.target.value)}
            required
          />
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="john@school.com" 
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            required
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="Set user password" 
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select 
              value={newRole}
              onChange={e => setNewRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002D62]"
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add User</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
