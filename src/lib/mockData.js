export const MOCK_COURSES = [
  { id: 'c1', title: 'Mathematics (Science) - Class 10', teacherName: 'Ms. Ayesha', studentsCount: 45, status: 'Active', progress: 65 },
  { id: 'c2', title: 'Physics - Class 10', teacherName: 'Ms. Ayesha', studentsCount: 38, status: 'Active', progress: 40 },
  { id: 'c3', title: 'Chemistry - Class 9', teacherName: 'Mr. Tariq', studentsCount: 52, status: 'Active', progress: 80 },
  { id: 'c4', title: 'Biology - Class 10', teacherName: 'Ms. Fatima', studentsCount: 41, status: 'Archived', progress: 100 },
  { id: 'c5', title: 'Pre-Medical (FSC Part 1)', teacherName: 'Mr. Usman', studentsCount: 30, status: 'Active', progress: 20 },
  { id: 'c6', title: 'Computer Science - Class 9', teacherName: 'Mr. Ali', studentsCount: 60, status: 'Active', progress: 90 },
];

export const MOCK_USERS = [
  { id: 1, name: 'EduNest Admin', email: 'admin@edunest.com', role: 'ADMIN', status: 'Active' },
  { id: 2, name: 'Ms. Ayesha', email: 'teacher@edunest.com', role: 'TEACHER', status: 'Active' },
  { id: 3, name: 'Hassan Ali', email: 'student@edunest.com', role: 'STUDENT', status: 'Active' },
  { id: 4, name: 'Omar Malik', email: 'omar@edunest.com', role: 'STUDENT', status: 'Active' },
  { id: 5, name: 'Zainab Noor', email: 'zainab@edunest.com', role: 'STUDENT', status: 'Active' },
  { id: 6, name: 'Mr. Tariq', email: 'tariq@edunest.com', role: 'TEACHER', status: 'Inactive' },
  { id: 7, name: 'Ms. Fatima', email: 'fatima@edunest.com', role: 'TEACHER', status: 'Active' },
  { id: 8, name: 'Mr. Usman', email: 'usman@edunest.com', role: 'TEACHER', status: 'Active' },
];

export const MOCK_ASSIGNMENTS = [
  { id: 'a1', title: 'Math Unit 1 Exercise', course: 'Mathematics (Science) - Class 10', dueDate: '2026-03-30', maxMarks: 50, submissions: 18, totalStudents: 25, status: 'Pending' },
  { id: 'a2', title: 'Physics Practical Journal', course: 'Physics - Class 10', dueDate: '2026-04-02', maxMarks: 100, submissions: 5, totalStudents: 38, status: 'Overdue' },
  { id: 'a3', title: 'Organic Chemistry Prep', course: 'Chemistry - Class 9', dueDate: '2026-03-25', maxMarks: 20, submissions: 52, totalStudents: 52, status: 'Graded', teacherFeedback: 'Excellent work!', marksReceived: 18 },
  { id: 'a4', title: 'Matrix Operations Worksheet', course: 'Mathematics (Science) - Class 10', dueDate: '2026-03-28', maxMarks: 25, submissions: 25, totalStudents: 25, status: 'Submitted' }
];

export const MOCK_QUIZZES = [
  { id: 'q1', title: 'Algebra Mid-Term', course: 'Mathematics (Science) - Class 10', timeLimit: 30, questionsCount: 5, attemptsLeft: 1, status: 'Published' },
  { id: 'q2', title: 'Kinematics Basics', course: 'Physics - Class 10', timeLimit: 15, questionsCount: 10, attemptsLeft: 2, status: 'Draft' },
  { id: 'q3', title: 'Periodic Table Quiz', course: 'Chemistry - Class 9', timeLimit: 20, questionsCount: 8, attemptsLeft: 0, status: 'Published' }
];

export const MOCK_GRADES = [
  { id: 1, studentName: 'Hassan Ali', courseTitle: 'Mathematics (Science)', totalMarks: 100, obtainedMarks: 87, percentage: 87, letter: 'A+' },
  { id: 2, studentName: 'Omar Malik', courseTitle: 'Physics', totalMarks: 75, obtainedMarks: 45, percentage: 60, letter: 'C' },
  { id: 3, studentName: 'Zainab Noor', courseTitle: 'Chemistry', totalMarks: 75, obtainedMarks: 71, percentage: 95, letter: 'A+' },
  { id: 4, studentName: 'Zaid Khan', courseTitle: 'Biology', totalMarks: 75, obtainedMarks: 25, percentage: 33, letter: 'F' },
  { id: 5, studentName: 'Ayesha Rahman', courseTitle: 'English (Compulsory)', totalMarks: 100, obtainedMarks: 79, percentage: 79, letter: 'A' },
  { id: 6, studentName: 'Hassan Ali', courseTitle: 'Physics', totalMarks: 75, obtainedMarks: 65, percentage: 86, letter: 'A+' },
  { id: 7, studentName: 'Hassan Ali', courseTitle: 'Chemistry', totalMarks: 75, obtainedMarks: 60, percentage: 80, letter: 'A' }
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, icon: 'alert', title: 'Assignment Due', message: 'Math Unit 1 Exercise is due tomorrow.', timeAgo: '2 hours ago', read: false },
  { id: 2, icon: 'check', title: 'Grade Posted', message: 'Your quiz results for "Periodic Table Quiz" are available.', timeAgo: '1 day ago', read: true },
  { id: 3, icon: 'bell', title: 'New Course Announcement', message: 'Welcome to Chemistry - Class 9! Please check the syllabus.', timeAgo: '3 days ago', read: false },
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
