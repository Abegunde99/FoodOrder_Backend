import bcrypt from 'bcryptjs'
import jwt, { Jwt } from 'jsonwebtoken'
import { JwtPayload } from '../dto'
require('dotenv').config({ path: './src/.env' })

export const createSalt = async ():Promise<string> => { 
    const salt = await bcrypt.genSalt(10);
    return salt;
}

export const hashPassword = async (password: string, salt: string):Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
}

export const generateToken = async (id: string) => { 
    return await jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
}

export const verifyToken = async (token: string) => { 
    return await jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
}

export const generateOtp = async () => { 
    return Math.floor(100000 + Math.random() * 900000);
}

export const onRequestOtp = async (Otp: number, to: string) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_PHONE_NUMBER;
    const client = require('twilio')(accountSid, authToken);
    const message = await client.messages.create({
        body: `Your OTP is ${Otp}`,
        from,
        to
    })
    return message;
}