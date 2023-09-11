import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utility';
import { FindVendor } from '../controllers/adminController';
import { Customer } from '../models';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                message: 'User not authorized'
            });
        }

        const decoded = await verifyToken(token);
        if (!decoded) {
            return res.status(400).json({
                message: 'User not authorized'
            });
        }
       
        const vendor = await FindVendor(decoded.id);

        res.locals.vendor = vendor;
        next();
    } catch (error) {
        console.log(error);
    }
}

export const validateToken2 = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                message: 'User not authorized'
            });
        }

        const decoded = await verifyToken(token);
        if (!decoded) {
            return res.status(400).json({
                message: 'User not authorized'
            });
        }
       
        const customer = await Customer.findOne({ _id: decoded.id });
        
        res.locals.customer = customer;
        next();
    } catch (error) {
        console.log(error);
    }
}
