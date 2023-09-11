import express, { Request, Response, NextFunction } from 'express';
import { getVendorProfile, vendorLogin , updateVendorProfile, updateVendorService, addFood, getFoods, deleteFoodById, updateVendorCoverImages} from '../controllers'
import { validateToken } from '../middlewares/validate';
import multer from 'multer';

const router = express.Router();

const imageStorage = multer.diskStorage({

    destination: function (req, file, callback) {
        callback(null, 'images')
    },
    filename: function (req, file, callback) {
        const newFileName = new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
        callback(null,newFileName)
    },
})

const images = multer({storage:imageStorage}).array('images', 10)

router.post('/login', vendorLogin);
router.use(validateToken)
router.get('/profile', getVendorProfile)
router.put('/profile',updateVendorProfile)
router.put('/service', updateVendorService)
router.put('/coverImage', images, updateVendorCoverImages)
router.post('/food', images ,addFood);
router.get('/food', getFoods);
router.delete('/food/:id', deleteFoodById);


router.get('/', (req: Request, res: Response, next: NextFunction) => { 
    return res.json({ message: 'Hello from vendorRoute' });
})

export { router as vendorRoute };