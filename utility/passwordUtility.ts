import bcrypt from 'bcryptjs'

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