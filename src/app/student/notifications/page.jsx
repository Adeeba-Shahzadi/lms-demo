"use client";
import { useState } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';

export default function StudentNotificationsPage() {
  const { notifications, setNotifications } = useAppContext();

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const toggleRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={markAllRead} className="flex items-center gap-2 h-9 px-3 text-sm">
            <Check size={16} /> Mark all read
          </Button>
          <Button variant="outline" onClick={clearAll} className="flex items-center gap-2 h-9 px-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
            <Trash2 size={16} /> Clear all
          </Button>
        </div>
      </div>

      <Card className="divide-y divide-gray-100 overflow-hidden shadow-sm">
        {notifications.map(notif => (
          <div 
            key={notif.id} 
            className={`p-6 flex gap-4 transition-colors hover:bg-gray-50/50 cursor-pointer ${!notif.read ? 'bg-blue-50/30' : ''}`}
            onClick={() => toggleRead(notif.id)}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${!notif.read ? 'bg-[#3b4e33] text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}>
              <Bell size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1 gap-4">
                <h3 className={`font-semibold ${!notif.read ? 'text-gray-900' : 'text-gray-600'}`}>
                  {notif.title}
                </h3>
                <span className="text-xs font-medium text-gray-500 whitespace-nowrap bg-gray-100 px-2.5 py-1 rounded-full">{notif.timeAgo}</span>
              </div>
              <p className={`text-sm ${!notif.read ? 'text-gray-700' : 'text-gray-500'}`}>{notif.message}</p>
            </div>
            {!notif.read && (
              <div className="shrink-0 flex justify-center pt-2">
                <div className="w-2.5 h-2.5 bg-[#3b4e33] rounded-full shadow-sm"></div>
              </div>
            )}
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
            <p>You don't have any new alerts right now.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
