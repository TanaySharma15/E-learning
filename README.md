# E-learning - LMS Platform

## 📌 Overview
E-learning is a full-featured Learning Management System (LMS) that allows users to enroll in courses, watch lectures, and track their progress. This platform is built using the MERN stack with Redux Toolkit for state management and Prisma for database interactions.

## 🚀 Features
- 📚 Course Creation & Management
- 🎥 Video Lectures & Course Content
- 🔐 User Authentication & Authorization
- 📊 Progress Tracking
- 🎓 Student Enrollment
- ⚡ Fully Responsive UI

## 🛠️ Tech Stack
- **Frontend:** React, Redux Toolkit, Tailwind CSS, React Router, React Player
- **Backend:** Node.js, Express.js, MongoDb
- **Database:** MongoDb
- **State Management:** Redux Toolkit (RTK Query)

## 🔧 Installation

1. Clone the repository:
   
   git clone https://github.com/TanaySharma15/E-learning.git
   cd E-learning
  
2. Install dependencies:
   
   # Install frontend dependencies
   cd client
   npm install
   
   
   # Install backend dependencies
   cd ../server
   npm install
   
3. Set up environment variables:
   - Create a `.env` file in the `server` folder and configure the following:
     ```env
     DATABASE_URL=your_connection_string
     JWT_SECRET=your_jwt_secret
     ```
4. Run the project:

   # Start backend
   cd server
   npm run dev


   # Start frontend
   cd client
   npm start


## 📌 API Endpoints
- GET /api/v1/course/:courseId` - Get course details
- POST /api/v1/course/` - Create a course
- GET /api/v1/course/:courseId/lecture` - Get course lectures



💡 **Built by [Tanay Sharma](https://github.com/TanaySharma15)**

