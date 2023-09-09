import express, { Request, Response, NextFunction } from 'express';
import { customerLogin, customerSignup, getCustomerProfile, requestOtp, updateCustomerProfile, verifyCustomer } from '../controllers';
const router = express.Router();

//signup/create user
router.post('/signup', customerSignup)

//login user
router.post('/login', customerLogin)

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