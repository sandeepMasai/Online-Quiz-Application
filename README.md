Assessment Portal Frontend
A React-based frontend for the Assessment Management System.



Features
Authentication: Login and Registration with JWT
Role-Based Access: Admin and Student dashboards
Admin Features:
Create, edit, delete questions
Support for multiple categories (React, JavaScript, HTML, CSS, Node.js, MongoDB, SQL, DSA)
Difficulty levels and tagging
Student Features:
Take timed assessments
Navigate between questions
View results after submission
Setup Instructions# 🧠 Assessment Portal Frontend

A **React-based frontend** for the **Assessment Management System** that provides role-based dashboards for administrators and students.  
Admins can manage questions and categories, while students can take timed assessments and view results.

---

## 🚀 Features

### 🔐 Authentication
- Secure login and registration using **JWT**
- Persistent authentication with context-based state management

### 🧑‍💼 Admin Features
- Create, edit, and delete questions
- Manage multiple categories:
  - React, JavaScript, HTML, CSS, Node.js, MongoDB, SQL, DSA
- Add difficulty levels and tags
- Dashboard overview of question bank

### 🎓 Student Features
- Take **timed assessments**
- Navigate between questions
- Submit quiz and view results
- Real-time progress tracking

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies
```bash
npm install

1. Install Dependencies
npm install
2. Configure Backend URL
Edit src/config/api.js if your backend runs on a different port:

export const API_URL = 'http://localhost:5000/api';
3. Start Development Server
npm run dev
The app will run on http://localhost:5173

4. Build for Production
npm run build
Project Structure
src/
├── components/
│   ├── Login.jsx              # Login component
│   ├── Register.jsx           # Registration component
│   ├── Navbar.jsx             # Navigation bar
│   └── admin/
│       ├── QuestionForm.jsx   # Question create/edit form
│       └── QuestionList.jsx   # Question listing
├── pages/
│   ├── AdminDashboard.jsx     # Admin dashboard
│   └── StudentDashboard.jsx   # Student dashboard
├── context/
│   └── AuthContext.jsx        # Authentication context
├── config/
│   └── api.js                 # API configuration
├── App.jsx                    # Main app component
├── main.jsx                   # Entry point
└── index.css                  # Global styles
Environment Requirements
Node.js 16+
npm or yarn
Backend API running on port 5000
Available Scripts
npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview production build
Technologies Used
React 18
Vite
Tailwind CSS
Lucide React (icons)
Fetch API for HTTP requests
Default Test Credentials
After registering, you can create an admin account with role "admin" to access the question management dashboard.

Students can register with role "student" to take assessments.



