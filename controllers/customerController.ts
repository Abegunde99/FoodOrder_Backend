import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { CreateCustomerDetails } from '../dto/customer.dto';
import { validate } from 'class-validator';

export const customerSignup = async (req: Request, res: Response, next: NextFunction) => { 

    const customerDetails = plainToClass(CreateCustomerDetails, req.body);
    const inputErrors = await validate(customerDetails);
}


export const customerLogin = async (req: Request, res: Response, next: NextFunction) => { }


export const verifyCustomer = async (req: Request, res: Response, next: NextFunction) => { }


export const requestOtp = async (req: Request, res: Response, next: NextFunction) => { }


export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => { }


export const getCustomerProfile = async (req: Request, res: Response, next: NextFunction) => { }


export const updateCustomerProfile = async (req: Request, res: Response, next: NextFunction) => { }