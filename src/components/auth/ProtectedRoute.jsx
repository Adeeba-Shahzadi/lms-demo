"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser } from '@/lib/mockAuth';

export default function ProtectedRoute({ children, allowedRoles }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.replace('/login');
    } else if (allowedRoles && !allowedRoles.includes(user.role)) {
      if (user.role === 'ADMIN') router.replace('/admin');
      else if (user.role === 'TEACHER') router.replace('/teacher');
      else if (user.role === 'STUDENT') router.replace('/student');
      else router.replace('/login');
    } else {
      setAuthorized(true);
    }
  }, [router, pathname, allowedRoles]);

  if (!authorized) return <div className="min-h-screen flex items-center justify-center p-4"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

  return <>{children}</>;
}
