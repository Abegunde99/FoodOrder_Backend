import express, { Request, Response, NextFunction } from 'express';
import { customerLogin, customerSignup, getCustomerProfile, requestOtp, updateCustomerProfile, verifyCustomer } from '../controllers';
import { validateToken2 } from '../middlewares/validate';
const router = express.Router();

//signup/create user
router.post('/signup', customerSignup)

//login user
router.post('/login', customerLogin)

//authenticate
router.use(validateToken2)

//verify customer account
router.patch('/verify', verifyCustomer)

//otp / Requesting otp
router.get('/otp', requestOtp)

//profile
router.get('/profile', getCustomerProfile)

//update profile
router.patch('/profile', updateCustomerProfile)


//cart
//order


//payment

export { router as customerRoute };