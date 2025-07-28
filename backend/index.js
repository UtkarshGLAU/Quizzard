import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import AuthRoute from './routes/Auth.route.js';
import quizRoutes from "./routes/Quiz.route.js";
import quizAttemptRoutes from "./routes/QuizAttempt.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
app.use(cors({
    origin: ["https://quizzard-eta.vercel.app/", "http://localhost:5173"], // Allow both production and local frontend
    credentials: true,  // Allow cookies, authorization headers, etc.
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));

app.use('/api/auth', AuthRoute);
app.use("/api/quizzes", quizRoutes);
app.use("/api/quiz-attempt", quizAttemptRoutes);

// Connect to Database
if (!process.env.MONGODB_CONN) {
    console.error("Error: MONGODB_CONN is not defined in .env file");
    process.exit(1); // Exit process if DB connection string is missing
}

mongoose.connect(process.env.MONGODB_CONN, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Database Connected.'))
    .catch(err => {
        console.error('❌ Database connection failed:', err);
        process.exit(1); // Exit process on database failure
    });

// Global Error Handling
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server Running on PORT: ${PORT}`));
