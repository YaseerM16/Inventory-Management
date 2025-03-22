import dotenv from 'dotenv'

dotenv.config()



export const config = {
    MODE: process.env.MODE,
    NODEMAILER_USER: process.env.NODEMAILER_USER,
    NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    MONGO_URI: process.env.MONGO_URI,
    user_email: process.env.USER_EMAIL,
    user_pass: process.env.USER_PASS
}