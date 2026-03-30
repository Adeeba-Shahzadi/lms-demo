"use client";
import { Menu, Bell } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export function Header({ setMobileMenuOpen }) {
  const { user, notifications } = useAppContext();
  
  if (!user) return null;

  const unreadCount = notifications ? notifications.filter(n => !n.read).length : 0;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-sm z-10">
      <div className="flex items-center">
        <button 
          className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg mr-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
        <div className="md:hidden flex items-center gap-2">
          <img src="https://ssphs.edu.pk/wp-content/uploads/2026/03/logo-removebg-preview.png" alt="SSPHS Logo" className="h-8 w-auto object-contain" />
          <span className="text-lg font-bold text-[#002D62]">
            SSPHS
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </button>
        <div className="flex items-center gap-3 pr-2">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role?.toLowerCase()}</p>
          </div>
          <div className="w-9 h-9 bg-[#002D62] text-white rounded-full flex items-center justify-center font-bold shadow-sm">
            {user.name?.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
