export const DEMO_USERS = {
  admin:   { email: 'admin@school.com',   password: 'admin123',   role: 'ADMIN',   name: 'Mr. Ahmed' },
  teacher: { email: 'teacher@school.com', password: 'teacher123', role: 'TEACHER', name: 'Ms. Sara' },
  student: { email: 'student@school.com', password: 'student123', role: 'STUDENT', name: 'Ali Hassan' },
};

export const login = (email, password) => {
  const user = Object.values(DEMO_USERS).find(u => u.email === email && u.password === password);
  if (user) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
    return { success: true, user };
  }
  return { success: false, message: 'Invalid email or password' };
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

export const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
  }
  return null;
};
