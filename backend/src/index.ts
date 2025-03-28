import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from "cors"
import { connectDB } from './config/db.config';
import { userRouter } from './routes/user.routes';
dotenv.config()

const app = express()
const PORT = process.env.PORT

connectDB()

app.use(morgan('dev'))
app.use(express.json());


// Enable CORS for frontend origin
app.use(cors({
    origin: ["http://localhost:5173", "https://inventory-management-navy-six.vercel.app", "https://inventory-management-3-camc.onrender.com"], // Allow only your frontend
    credentials: true, // If you're using cookies or authentication
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
}));

app.use(userRouter)

app.listen(PORT, (error: unknown) => {
    if (error) throw error
    console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`)
})
