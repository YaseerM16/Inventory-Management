import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.config';
import morgan from 'morgan';
dotenv.config()

const app = express()
const PORT = process.env.PORT

connectDB()

app.use(morgan('dev'))

app.get("/", (req, res: any) => res.send("HHEELLOO jjjjiiii"))

app.listen(PORT, (error: unknown) => {
    if (error) throw error
    console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`)
})
