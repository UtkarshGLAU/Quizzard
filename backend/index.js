import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import AuthRoute from './routes/Auth.route.js'
import cookieParser from 'cookie-parser'
dotenv.config()
import quizRoutes from "./routes/Quiz.route.js";


const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: ["https://quizzard-frontend.vercel.app", "http://localhost:5173"], // Allow both production and local frontend
    credentials: true,  // Allow cookies, authorization headers, etc.
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}));


app.use('/api/auth', AuthRoute)
app.use("/api/quizzes", quizRoutes);

mongoose.connect(process.env.MONGODB_CONN).then(() => {
    console.log('Database Connected.')
}).catch(err => console.log('Database connection failed.', err))

app.listen(PORT, () => {
    console.log('Server Running On PORT:', PORT)
})