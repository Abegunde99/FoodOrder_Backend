import express, { Request, Response, NextFunction } from 'express';
import { vendorLogin } from '../controllers'

const router = express.Router();

router.post('/login', vendorLogin);

router.get('/', (req: Request, res: Response, next: NextFunction) => { 
    return res.json({ message: 'Hello from vendorRoute' });
})

export { router as vendorRoute };