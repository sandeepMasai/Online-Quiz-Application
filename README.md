# 🎯 Online Quiz Application

A full-stack **Online Assessment Portal** built with React and Node.js, featuring role-based access control, real-time assessments, and comprehensive question management.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.1.1-blue.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure token management
- **Role-based access control** (Admin & Student)
- **Persistent sessions** with localStorage
- **Protected routes** with middleware validation

### 👨‍💼 Admin Dashboard
- ✅ **Question Management**
  - Create, edit, and delete questions
  - Support for 8+ categories (React, JavaScript, HTML, CSS, Node.js, MongoDB, SQL, DSA)
  - Difficulty levels (Easy, Medium, Hard)
  - Tagging system for better organization
  
- 📊 **Statistics & Analytics**
  - Total questions count
  - Questions per category breakdown
  - Visual statistics dashboard
  
- 🔍 **Search & Filter**
  - Real-time search by question text, ID, or options
  - Filter by category
  - Filter by difficulty level
  - Combined filtering capabilities
  
- 📄 **Pagination**
  - 10 items per page
  - Page navigation controls
  - Smart page number display
  
- 🆔 **Question ID Display**
  - Unique ID for each question
  - Easy identification and tracking

### 🎓 Student Dashboard
- 🚀 **Assessment Taking**
  - Category-based assessments
  - Timed assessments with countdown timer
  - Question navigation (Previous/Next)
  - Question palette for quick navigation
  - Visual progress indicators
  
- 📈 **Results & Analytics**
  - Detailed score breakdown
  - Correct/Incorrect/Skipped statistics
  - Completion and accuracy rates
  - Visual progress bars and charts
  - Pass/Fail status (75% threshold)
  - Assessment history

### 🎨 UI/UX Features
- **Modern, responsive design** with Tailwind CSS
- **Gradient backgrounds** and smooth animations
- **Interactive elements** with hover effects
- **Color-coded** difficulty and status indicators
- **Mobile-friendly** responsive layout
- **Loading states** and error handling
- **Toast notifications** for user feedback

---

## 🛠 Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Router DOM** - Routing

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB & Mongoose 8.18.2** - Database and ODM
- **JWT (jsonwebtoken)** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Git** (for cloning the repository)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sandeepMasai/Online-Quiz-Application.git
cd Online-Quiz-Application
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file
touch .env
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend/clinet

# Install dependencies
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/quiz-app
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-app

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Server Port
PORT=5000

# JWT Expiration (optional)
JWT_EXPIRES_IN=1d
```

### Frontend API Configuration

Edit `frontend/clinet/src/config/api.js`:

```javascript
export const API_URL = 'http://localhost:5000/api';
// For production:
// export const API_URL = 'https://your-backend-domain.com/api';
```

---

## 🎮 Usage

### Start Backend Server

```bash
cd backend
npm start
```

The backend server will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend/clinet
npm run dev
```

The frontend will run on `http://localhost:5173`

### Build for Production

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend/clinet
npm run build
```

The production build will be in the `dist` folder.

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Questions (Admin Only)
- `GET /api/questions` - Get all questions (with optional filters)
- `GET /api/questions/:id` - Get question by ID
- `POST /api/questions` - Create new question
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question

### Assessments
- `POST /api/assessments/start` - Start new assessment
- `GET /api/assessments/:id` - Get assessment details

### Results
- `POST /api/results/submit` - Submit assessment answers
- `GET /api/results/:id` - Get result by ID
- `GET /api/results/user/history` - Get user's result history

### Users
- `GET /api/users/me` - Get current user profile
- `GET /api/users` - Get all users (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

---

## 📁 Project Structure

```
Online-Quiz-Application/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── auth.controller.js   # Authentication logic
│   │   ├── question.controller.js
│   │   ├── assessment.controller.js
│   │   ├── result.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   └── roles.js               # Role-based authorization
│   ├── models/
│   │   ├── User.js
│   │   ├── Question.js
│   │   ├── Assessment.js
│   │   └── Result.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── question.routes.js
│   │   ├── assessment.routes.js
│   │   ├── result.routes.js
│   │   └── user.routes.js
│   ├── utils/
│   │   └── jwt.js                 # JWT utilities
│   ├── index.js                   # Server entry point
│   └── package.json
│
├── frontend/
│   └── clinet/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Login.jsx
│       │   │   ├── Register.jsx
│       │   │   ├── Navbar.jsx
│       │   │   └── admin/
│       │   │       ├── QuestionForm.jsx
│       │   │       └── QuestionList.jsx
│       │   ├── pages/
│       │   │   ├── AdminDashboard.jsx
│       │   │   ├── StudentDashboard.jsx
│       │   │   └── Results.jsx
│       │   ├── context/
│       │   │   └── AuthContext.jsx
│       │   ├── config/
│       │   │   └── api.js
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   └── index.css
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

---

## 🎯 Key Features in Detail

### Admin Dashboard Features

1. **Question Statistics**
   - Total questions count with visual card
   - Category-wise breakdown
   - Real-time statistics updates

2. **Advanced Search**
   - Search by question text
   - Search by question ID
   - Search within options
   - Real-time filtering

3. **Smart Filtering**
   - Filter by category (8 categories)
   - Filter by difficulty (Easy/Medium/Hard)
   - Combined filters
   - Results counter

4. **Pagination**
   - 10 questions per page
   - Page navigation
   - Smart page number display
   - Previous/Next buttons

5. **Question Management**
   - Create questions with 4 options
   - Edit existing questions
   - Delete questions with confirmation
   - Question ID display for tracking

### Student Dashboard Features

1. **Category Selection**
   - 8 different categories
   - Visual category cards with icons
   - Category-specific assessments

2. **Assessment Taking**
   - Timed assessments with countdown
   - Question navigation
   - Question palette for quick access
   - Progress indicators
   - Answer selection with visual feedback

3. **Results Display**
   - Score percentage with circular progress
   - Detailed statistics (Correct, Incorrect, Skipped, Attempted)
   - Completion and accuracy rates
   - Pass/Fail status
   - Assessment history

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for password security
- **Input Validation** - Server-side validation for all inputs
- **ObjectId Validation** - Prevents invalid ID errors
- **CORS Configuration** - Secure cross-origin requests
- **Role-Based Access** - Middleware protection for routes

---

## 🧪 Testing

### Default Test Credentials

After setting up, you can:

1. **Register as Admin:**
   - Username: `admin`
   - Email: `admin@gmail.com`
   - Password: `admin123`
   - Role: `admin`

2. **Register as Student:**
   - Username: `student`
   - Email: `student@example.com`
   - Password: `student123`
   - Role: `student`

---

## 📝 Available Scripts

### Backend
```bash
npm start          # Start the server
npm run dev        # Start with nodemon (if configured)
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## 🌐 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MongoDB connection string is configured
3. Deploy to platforms like:
   - **Render**
   

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to:
   - **Vercel**
   -

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---



---

## 👨‍💻 Author

**Sandeep**

---

## 🙏 Acknowledgments

- **React** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **MongoDB** for the database solution

---



---

## 🎉 Features Roadmap

- [ ] Question import/export (CSV/JSON)
- [ ] Bulk question operations
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Question bank sharing
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Question templates
- [ ] Assessment scheduling
- [ ] Real-time collaboration

---

**Made with ❤️ using React and Node.js**
