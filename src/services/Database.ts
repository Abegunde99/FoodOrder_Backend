import mongoose from 'mongoose';
require('dotenv').config({ path: './src/.env' })

const MONGODB_URI = process.env.MONGODB_URI as string;

export const connectDb = async () => { 
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('MongoDB connected')
    } catch (error: any) {
        console.log(error.message)
        process.exit(1)
    }
}
