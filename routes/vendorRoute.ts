import express, { Request, Response, NextFunction } from 'express';
import { getVendorProfile, vendorLogin , updateVendorProfile, updateVendorService} from '../controllers'
import { validateToken } from '../middlewares/validate';


const router = express.Router();

router.post('/login', vendorLogin);
router.get('/profile', validateToken, getVendorProfile)
router.put('/profile', validateToken,updateVendorProfile)
router.put('/service', validateToken,updateVendorService)


router.get('/', (req: Request, res: Response, next: NextFunction) => { 
    return res.json({ message: 'Hello from vendorRoute' });
})

export { router as vendorRoute };