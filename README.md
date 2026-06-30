# 🪺 EduNest

> **Where Learning Feels Like Home**

A fully functional, role-based "School LMS Demo" frontend built with Next.js 14 and Tailwind CSS. 
This project uses mock data and React Context for state management, meaning there's absolutely no backend or database required. It's ready to be deployed instantly.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fedunest-lms-demo)

## 🔐 Login Credentials

Use the following credentials to explore the different dashboards:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@edunest.com` | `admin123` |
| **Teacher** | `teacher@edunest.com` | `teacher123` |
| **Student** | `student@edunest.com` | `student123` |

> *Note: By default, the app uses React Context with initial mock data. All state modifications (creating courses, taking quizzes, adding users) will reset if you hard refresh the page.*

## 🌟 Features

- **Three distinct roles:** Admin, Teacher, and Student.
- **Interactive UI:** Dynamic dashboards, table filtering, modals, and charts (Recharts).
- **Responsive Design:** Fully responsive layouts using Tailwind CSS.
- **Mock Authentication:** Seamless login experience directly loading into specific role capabilities via explicit paths.
- **No Backend Needed:** Clean and secure way to showcase frontend design without setting up a backend.

## 🚀 Getting Started Locally

First, clone the repository and navigate into it:

```bash
git clone https://github.com/your-username/edunest-lms-demo.git
cd edunest-lms-demo
```

Next, install the dependencies:

```bash
npm install
```
*(If you face peer dependency issues, append `--legacy-peer-deps`)*

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Lucide React (UI Icons)
- Recharts (Data Visualization)
- React Hot Toast (Alerts & Notifications)
