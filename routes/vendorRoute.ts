import express, { Request, Response, NextFunction } from 'express';
import { getVendorProfile, vendorLogin } from '../controllers'
import { validateToken } from '../middlewares/validate';


const router = express.Router();

router.post('/login', vendorLogin);
router.get('/profile', validateToken,getVendorProfile)

router.get('/', (req: Request, res: Response, next: NextFunction) => { 
    return res.json({ message: 'Hello from vendorRoute' });
})

export { router as vendorRoute };