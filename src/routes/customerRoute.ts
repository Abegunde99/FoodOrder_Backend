import express, { Request, Response, NextFunction } from 'express';
import { createOrder, customerLogin, customerSignup, getCustomerProfile, getOrder, getOrders, requestOtp, updateCustomerProfile, verifyCustomer } from '../controllers';
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

//payment

//order
router.post('/create-order', createOrder);
router.get('/orders', getOrders);
router.get('/order/:id', getOrder);

export { router as customerRoute };