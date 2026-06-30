"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { 
  X, LayoutDashboard, Users, BookOpen, BarChart2, Settings,
  FileText, CheckSquare, ClipboardList, UserCheck, Bell,
  LogOut
} from 'lucide-react';
import { logout } from '@/lib/mockAuth';

export function MobileNav({ isOpen, onClose }) {
  const { user, setUser } = useAppContext();
  const pathname = usePathname();

  if (!user || !isOpen) return null;

  const roleLinks = {
    ADMIN: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { name: 'Users', href: '/admin/users', icon: Users },
      { name: 'Courses', href: '/admin/courses', icon: BookOpen },
      { name: 'Reports', href: '/admin/reports', icon: BarChart2 },
      { name: 'Settings', href: '/admin/settings', icon: Settings },
    ],
    TEACHER: [
      { name: 'Dashboard', href: '/teacher', icon: LayoutDashboard },
      { name: 'My Courses', href: '/teacher/courses', icon: BookOpen },
      { name: 'Assignments', href: '/teacher/assignments', icon: FileText },
      { name: 'Quizzes', href: '/teacher/quizzes', icon: CheckSquare },
      { name: 'Gradebook', href: '/teacher/gradebook', icon: ClipboardList },
      { name: 'Attendance', href: '/teacher/attendance', icon: UserCheck },
    ],
    STUDENT: [
      { name: 'Dashboard', href: '/student', icon: LayoutDashboard },
      { name: 'My Courses', href: '/student/courses', icon: BookOpen },
      { name: 'Assignments', href: '/student/assignments', icon: FileText },
      { name: 'Quizzes', href: '/student/quizzes', icon: CheckSquare },
      { name: 'Grades', href: '/student/grades', icon: ClipboardList },
      { name: 'Notifications', href: '/student/notifications', icon: Bell },
    ]
  };

  const links = roleLinks[user.role] || [];
  
  const handleLogout = () => {
    logout();
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <div className="md:hidden fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
        <div className="absolute top-0 right-0 -mr-12 pt-4">
          <button className="ml-1 flex items-center justify-center h-10 w-10 text-white hover:bg-white/10 rounded-full" onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <div className="flex-shrink-0 flex items-center px-4 gap-3">
            <img src="/majora_logo.png" alt="EduNest Logo" className="h-11 w-auto object-contain" />
            <span className="text-xl font-bold tracking-tight text-[#3b4e33]">
              EduNest
            </span>
          </div>
          <nav className="mt-8 px-2 space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              const Icon = link.icon;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={onClose}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md
                    ${isActive ? 'bg-green-50/70 text-[#3b4e33] border-l-4 border-[#3b4e33]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'}
                  `}
                >
                  <Icon className={`mr-4 h-6 w-6 ${isActive ? 'text-[#3b4e33]' : 'text-gray-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <button onClick={handleLogout} className="flex-shrink-0 group block w-full px-2 py-2 hover:bg-red-50 rounded-md">
            <div className="flex items-center">
              <LogOut className="inline-block h-6 w-6 text-gray-400 group-hover:text-red-500" />
              <div className="ml-4">
                <p className="text-base font-medium text-gray-700 group-hover:text-red-600">Logout</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
