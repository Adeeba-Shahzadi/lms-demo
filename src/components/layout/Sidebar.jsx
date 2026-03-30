"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { 
  LayoutDashboard, Users, BookOpen, BarChart2, Settings,
  FileText, CheckSquare, ClipboardList, UserCheck, Bell,
  LogOut
} from 'lucide-react';
import { logout } from '@/lib/mockAuth';

export function Sidebar() {
  const { user, setUser } = useAppContext();
  const pathname = usePathname();

  if (!user) return null;

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
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="h-20 flex items-center px-6 border-b border-gray-200 gap-3">
        <img src="https://ssphs.edu.pk/wp-content/uploads/2026/03/logo-removebg-preview.png" alt="SSPHS Logo" className="h-10 w-auto object-contain" />
        <span className="text-xl font-bold tracking-tight text-[#002D62] hidden lg:block">
          SSPHS
        </span>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          const Icon = link.icon;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                ${isActive 
                  ? 'bg-blue-50 text-[#002D62] border-l-4 border-[#002D62] shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                }
              `}
            >
              <Icon size={18} className={`mr-3 transition-colors ${isActive ? 'text-[#002D62]' : 'text-gray-400'}`} />
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={18} className="mr-3 text-gray-400 group-hover:text-red-500" />
          Logout
        </button>
      </div>
    </aside>
  );
}
