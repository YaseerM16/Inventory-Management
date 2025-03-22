import mongoose from 'mongoose';
import { config } from '../utils/constant';
// import { MONGO_URI } from '../utils/constant';


export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(String(config.MONGO_URI))
        console.log('MONGO DB CONNECTED')
    } catch (error: unknown) {
        console.error("MongoDB connection error:", error);
        throw error
    }
}
