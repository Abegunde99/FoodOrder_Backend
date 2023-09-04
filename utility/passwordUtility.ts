import bcrypt from 'bcryptjs'
import jwt, { Jwt } from 'jsonwebtoken'
import { JwtPayload } from '../dto'
require('dotenv').config()

export const createSalt = async () => { 
    const salt = await bcrypt.genSalt(10);
    return salt;
}

export const hashPassword = async (password: string, salt: string) => {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const generateToken = async (id: string) => { 
    return await jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
}

export const verifyToken = async (token: string) => { 
    return await jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
}

