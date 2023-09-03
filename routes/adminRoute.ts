import express, { Request, Response, NextFunction } from 'express';
import {createVendor, getVendors, getVendorById} from '../controllers'

const router = express.Router();

router.post('/vendor', createVendor);
router.get('/vendor', getVendors);
router.get('/vendor/:id', getVendorById);


router.get('/', (req: Request, res: Response, next: NextFunction) => { 
    return res.json({ message: 'Hello from adminRoute' });
})

export { router as adminRoute };