export const DEMO_USERS = {
  admin:   { email: 'admin@school.com',   password: 'admin123',   role: 'ADMIN',   name: 'Maj (R) Mudasser' },
  teacher: { email: 'teacher@school.com', password: 'teacher123', role: 'TEACHER', name: 'Ms. Ayesha' },
  student: { email: 'student@school.com', password: 'student123', role: 'STUDENT', name: 'Hassan Ali' },
};

export const getRegisteredUsers = () => {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('registered_users');
    if (raw) return JSON.parse(raw);
  }
  return [];
};

export const registerUser = (userObj) => {
  if (typeof window !== 'undefined') {
    const existing = getRegisteredUsers();
    localStorage.setItem('registered_users', JSON.stringify([...existing, userObj]));
  }
};

export const login = (email, password) => {
  const defaultUser = Object.values(DEMO_USERS).find(u => u.email === email && u.password === password);
  const registeredUser = getRegisteredUsers().find(u => u.email === email && u.password === password);
  const user = defaultUser || registeredUser;
  
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
