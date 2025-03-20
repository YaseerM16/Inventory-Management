import dotenv from 'dotenv'

dotenv.config()

export const MONGO_URI = process.env.MONGO_URI
export const user_email = process.env.USER_EMAIL
export const user_pass = process.env.USER_PASS