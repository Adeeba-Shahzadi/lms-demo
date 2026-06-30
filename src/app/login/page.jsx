"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { login, DEMO_USERS, getCurrentUser } from '@/lib/mockAuth';
import { useAppContext } from '@/context/AppContext';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Auto-redirect if already logged in
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      if (user.role === 'ADMIN') router.push('/admin');
      if (user.role === 'TEACHER') router.push('/teacher');
      if (user.role === 'STUDENT') router.push('/student');
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      setUser(result.user);
      if (result.user.role === 'ADMIN') router.push('/admin');
      if (result.user.role === 'TEACHER') router.push('/teacher');
      if (result.user.role === 'STUDENT') router.push('/student');
    } else {
      setError(result.message);
    }
  };

  const loginAs = (roleKey) => {
    const user = DEMO_USERS[roleKey];
    setEmail(user.email);
    setPassword(user.password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-between items-center p-4 overflow-y-auto">
      <div className="w-full flex-1 flex flex-col justify-center items-center py-12">
        <div className="text-center mb-8">
        <div className="flex flex-col items-center justify-center gap-2 mb-2">
          <img src="/majora_logo.png" alt="EduNest Logo" className="h-24 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform" />
          <h1 className="text-3xl font-bold tracking-tight text-[#3b4e33]">
            EduNest
          </h1>
        </div>
        <p className="text-gray-500 font-medium tracking-wide">Where Learning Feels Like Home</p>
      </div>

      <Card className="w-full max-w-md p-8 shadow-lg border-t-4 border-t-[#3b4e33]">
        <h2 className="text-2xl font-semibold text-center mb-6">Welcome Back</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="name@school.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={error ? true : false}
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          
          <Button type="submit" className="w-full py-2.5 text-lg shadow-sm">
            Sign In
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-center text-gray-500 font-medium mb-4">Quick Access Demo</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Button variant="outline" onClick={(e) => { e.preventDefault(); loginAs('admin'); }} className="text-sm py-2">
              Admin
            </Button>
            <Button variant="outline" onClick={(e) => { e.preventDefault(); loginAs('teacher'); }} className="text-sm py-2">
              Teacher
            </Button>
            <Button variant="outline" onClick={(e) => { e.preventDefault(); loginAs('student'); }} className="text-sm py-2">
              Student
            </Button>
          </div>
        </div>
        </Card>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500 pb-4">
        <p><strong>EduNest LMS Portal</strong></p>
        <p>Demo Environment &bull; Powered by <a href="https://majoratechnologies.com" target="_blank" rel="noopener noreferrer" className="text-[#3b4e33] font-semibold hover:underline transition-colors">Majora Technologies</a></p>
        <p className="mt-1 text-xs text-gray-400">Contact: <a href="mailto:support@edunest.com" className="hover:underline">support@edunest.com</a></p>
      </div>
    </div>
  );
}
