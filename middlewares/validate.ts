import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utility';
import { FindVendor } from '../controllers/adminController';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                message: 'Token is not found'
            });
        }

        const decoded = await verifyToken(token);
        if (!decoded) {
            return res.status(400).json({
                message: 'Token is not valid'
            });
        }
       
        const vendor = await FindVendor(decoded.id);
        res.locals.vendor = vendor;
        next();
    } catch (error) {
        console.log(error);
    }
}
