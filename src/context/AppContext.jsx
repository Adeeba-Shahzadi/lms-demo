"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_COURSES, MOCK_USERS, MOCK_ASSIGNMENTS, MOCK_QUIZZES, MOCK_GRADES, MOCK_NOTIFICATIONS } from '@/lib/mockData';
import { getCurrentUser } from '@/lib/mockAuth';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Data state
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [users, setUsers] = useState(MOCK_USERS);
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);
  const [quizzes, setQuizzes] = useState(MOCK_QUIZZES);
  const [grades, setGrades] = useState(MOCK_GRADES);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Helpers
  const addUser = (newUser) => setUsers([...users, { id: Date.now(), ...newUser, status: 'Active' }]);
  const addCourse = (newCourse) => setCourses([...courses, { id: 'c' + Date.now(), ...newCourse, status: 'Active', progress: 0 }]);
  const addAssignment = (newAssignment) => setAssignments([...assignments, { id: 'a' + Date.now(), ...newAssignment, submissions: 0, status: 'Pending' }]);
  const addQuiz = (newQuiz) => setQuizzes([...quizzes, { id: 'q' + Date.now(), ...newQuiz }]);
  const markNotificationRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));

  return (
    <AppContext.Provider value={{
      user, setUser,
      courses, setCourses, addCourse,
      users, setUsers, addUser,
      assignments, setAssignments, addAssignment,
      quizzes, setQuizzes, addQuiz,
      grades, setGrades,
      notifications, setNotifications, markNotificationRead
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
