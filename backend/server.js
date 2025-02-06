const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const quizRoutes = require("./routes/quizRoutes.js");

dotenv.config();

// Cors configuration with allowed origins
const corsOptions = {
  origin: [
    "http://localhost:5173",
    process.env.FRONTEND_URL, // Add your Vercel frontend URL
  ],
  credentials: true,
};

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in environment variables!");
  process.exit(1);
}

connectDB();
const app = express();

// Use cors with specific options
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api", quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
