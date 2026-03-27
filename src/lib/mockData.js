export const MOCK_COURSES = [
  { id: 'c1', title: 'Mathematics Grade 10', teacherName: 'Ms. Sara', studentsCount: 45, status: 'Active', progress: 65 },
  { id: 'c2', title: 'Physics Grade 11', teacherName: 'Ms. Sara', studentsCount: 38, status: 'Active', progress: 40 },
  { id: 'c3', title: 'Chemistry Grade 9', teacherName: 'Mr. John', studentsCount: 52, status: 'Active', progress: 80 },
  { id: 'c4', title: 'Biology Grade 10', teacherName: 'Ms. Emily', studentsCount: 41, status: 'Archived', progress: 100 },
  { id: 'c5', title: 'English Lit Grade 12', teacherName: 'Mr. Smith', studentsCount: 30, status: 'Active', progress: 20 },
  { id: 'c6', title: 'Computer Science', teacherName: 'Mr. Ahmed', studentsCount: 60, status: 'Active', progress: 90 },
];

export const MOCK_USERS = [
  { id: 1, name: 'Mr. Ahmed', email: 'admin@school.com', role: 'ADMIN', status: 'Active' },
  { id: 2, name: 'Ms. Sara', email: 'teacher@school.com', role: 'TEACHER', status: 'Active' },
  { id: 3, name: 'Ali Hassan', email: 'student@school.com', role: 'STUDENT', status: 'Active' },
  { id: 4, name: 'Omar Malik', email: 'omar@school.com', role: 'STUDENT', status: 'Active' },
  { id: 5, name: 'Fatima Zohra', email: 'fatima@school.com', role: 'STUDENT', status: 'Active' },
  { id: 6, name: 'Mr. John', email: 'john@school.com', role: 'TEACHER', status: 'Inactive' },
  { id: 7, name: 'Ms. Emily', email: 'emily@school.com', role: 'TEACHER', status: 'Active' },
  { id: 8, name: 'Mr. Smith', email: 'smith@school.com', role: 'TEACHER', status: 'Active' },
];

export const MOCK_ASSIGNMENTS = [
  { id: 'a1', title: 'Algebra Worksheet', course: 'Mathematics Grade 10', dueDate: '2026-03-30', maxMarks: 50, submissions: 18, totalStudents: 25, status: 'Pending' },
  { id: 'a2', title: 'Motion Lab Report', course: 'Physics Grade 11', dueDate: '2026-04-02', maxMarks: 100, submissions: 5, totalStudents: 38, status: 'Overdue' },
  { id: 'a3', title: 'Chemical Bonds Essay', course: 'Chemistry Grade 9', dueDate: '2026-03-25', maxMarks: 20, submissions: 52, totalStudents: 52, status: 'Graded', teacherFeedback: 'Excellent work!', marksReceived: 18 },
  { id: 'a4', title: 'Chapter 5 Questions', course: 'Mathematics Grade 10', dueDate: '2026-03-28', maxMarks: 25, submissions: 25, totalStudents: 25, status: 'Submitted' }
];

export const MOCK_QUIZZES = [
  { id: 'q1', title: 'Algebra Mid-Term', course: 'Mathematics Grade 10', timeLimit: 30, questionsCount: 5, attemptsLeft: 1, status: 'Published' },
  { id: 'q2', title: 'Kinematics Basics', course: 'Physics Grade 11', timeLimit: 15, questionsCount: 10, attemptsLeft: 2, status: 'Draft' },
  { id: 'q3', title: 'Periodic Table Quiz', course: 'Chemistry Grade 9', timeLimit: 20, questionsCount: 8, attemptsLeft: 0, status: 'Published' }
];

export const MOCK_GRADES = [
  { id: 1, studentName: 'Ali Hassan', a1: 45, a2: 85, q1: 28, q2: 12, final: 87, letter: 'A' },
  { id: 2, studentName: 'Omar Malik', a1: 30, a2: 70, q1: 20, q2: 10, final: 65, letter: 'C' },
  { id: 3, studentName: 'Fatima Zohra', a1: 48, a2: 95, q1: 30, q2: 14, final: 94, letter: 'A' },
  { id: 4, studentName: 'Zaid Khan', a1: 20, a2: 50, q1: 15, q2: 8, final: 46, letter: 'F' },
  { id: 5, studentName: 'Ayesha Rahman', a1: 40, a2: 80, q1: 25, q2: 13, final: 79, letter: 'B' }
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, icon: 'alert', title: 'Assignment Due', message: 'Algebra Worksheet is due tomorrow.', timeAgo: '2 hours ago', read: false },
  { id: 2, icon: 'check', title: 'Grade Posted', message: 'Your quiz results for "Periodic Table Quiz" are available.', timeAgo: '1 day ago', read: true },
  { id: 3, icon: 'bell', title: 'New Course Announcement', message: 'Welcome to Chemistry Grade 9! Please check the syllabus.', timeAgo: '3 days ago', read: false },
  { id: 4, icon: 'alert', title: 'System Maintenance', message: 'LMS will be down for 2 hours on Sunday night.', timeAgo: '4 days ago', read: true },
  { id: 5, icon: 'bell', title: 'Event Reminder', message: 'Science Fair tomorrow in the main hall.', timeAgo: '5 days ago', read: true },
];

export const MOCK_COURSE_MODULES = [
  {
    id: 'm1',
    title: 'Module 1: Introduction to Algebra',
    lessons: [
      { id: 'l1', title: 'Variables and Expressions', type: 'Video', completed: true },
      { id: 'l2', title: 'Solving Simple Equations', type: 'Slides', completed: true },
      { id: 'l3', title: 'Practice Exercises', type: 'PDF', completed: false }
    ]
  },
  {
    id: 'm2',
    title: 'Module 2: Linear Equations',
    lessons: [
      { id: 'l4', title: 'Graphing Lines', type: 'Video', completed: false },
      { id: 'l5', title: 'Slope and Intercept', type: 'Slides', completed: false }
    ]
  }
];

export const MOCK_QUIZ_QUESTIONS = [
  { id: 'qq1', text: 'What is the value of x in the equation 2x + 5 = 15?', options: ['x = 10', 'x = 5', 'x = 20', 'x = 2.5'], correctIndex: 1 },
  { id: 'qq2', text: 'Evaluate: 3(x - 4) when x = 7.', options: ['12', '9', '21', '-9'], correctIndex: 1 },
  { id: 'qq3', text: 'Which of the following is an expression?', options: ['4x = 12', 'y > 3', '2a + 3b', 'x + y = z'], correctIndex: 2 },
  { id: 'qq4', text: 'If y = 3x - 2, what is y when x = 4?', options: ['10', '1', '14', '12'], correctIndex: 0 },
  { id: 'qq5', text: 'Solve for a: a/4 = 8', options: ['a = 2', 'a = 12', 'a = 32', 'a = 4'], correctIndex: 2 }
];
