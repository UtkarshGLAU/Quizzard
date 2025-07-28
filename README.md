# Quizzard 🧙‍♂️

A web application for creating and participating in quizzes, allowing users to test their knowledge on various topics and track their progress.

## 🌐 Live Demo

- [FrontEnd](https://quizzard-eta.vercel.app)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## ✨ Features

- **User Authentication**: Secure signup and login functionality
- **Quiz Creation**: Create custom quizzes with multiple question types
- **Quiz Participation**: Take quizzes created by others
- **Progress Tracking**: Monitor performance and view scores
- **Leaderboards**: See where you stand compared to others
- **Admin Panel**: Manage quizzes and users (admin access only)

## 🛠️ Tech Stack

### Frontend
- **React.js**: JavaScript library for building user interfaces
- **Vite**: Next-generation frontend tooling
- **React Router**: For navigation and routing
- **CSS3**: For styling components

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for storing user and quiz data
- **JWT Authentication**: For secure user sessions

### Tools & Services
- **Git & GitHub**: Version control and code hosting
- **Vercel**: Frontend deployment platform
- **MongoDB Atlas**: Cloud database service

## 📁 Project Structure

```
quizzard/
├── backend/              # Backend server code
│   ├── controller/       # Request handlers
│   ├── middleware/       # Express middlewares
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── index.js          # Server entry point
│
├── frontend/             # Frontend React application
│   ├── public/           # Static assets
│   └── src/              # Source files
│       ├── api/          # API communication
│       ├── assets/       # Images and media
│       ├── Components/   # Reusable components
│       ├── context/      # React context providers
│       ├── utils/        # Utility functions
│       └── [features]/   # Feature-specific components
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB instance (local or Atlas)

### Installation

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with your environment variables
# Example:
# MONGODB_URI=mongodb://localhost:27017/quizzard
# JWT_SECRET=your_jwt_secret
# PORT=5000

# Start the server
npm start
```

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file with your environment variables
# Example:
# VITE_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (authenticated)

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get a specific quiz
- `POST /api/quizzes` - Create a new quiz (authenticated)
- `PUT /api/quizzes/:id` - Update a quiz (authenticated)
- `DELETE /api/quizzes/:id` - Delete a quiz (authenticated)

### Quiz Attempts
- `POST /api/quiz-attempts` - Create a new quiz attempt
- `GET /api/quiz-attempts/:quizId` - Get attempts for a quiz
- `GET /api/quiz-attempts/user` - Get user's quiz attempts (authenticated)

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Made with ❤️ by Utkarsh Sharma
