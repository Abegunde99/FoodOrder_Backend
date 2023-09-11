import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { CreateCustomerDetails, UserLoginInputs, EditCustomerProfileInput } from '../dto/customer.dto';
import { validate } from 'class-validator';
import { Customer } from '../models';
import { createSalt, hashPassword, generateOtp, onRequestOtp, generateToken , comparePassword} from '../utility';

export const customerSignup = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const customerDetails = plainToClass(CreateCustomerDetails, req.body);
        const inputErrors = await validate(customerDetails, { validationError: { target: false } });
        
        if (inputErrors.length > 0) { 
            return res.status(400).json({ errors: inputErrors });
        }
    
        const { phone, email, password } = customerDetails;
    
        // check if customer already exists
        const existingCustomer = await Customer.findOne({ $or: [{ phone }, { email }] });
    
        // if yes, return error
        if (existingCustomer) { 
            return res.status(400).json({ errors: [{ message: 'Customer already exists' }] });
        }
    
        // else create customer
        const salt = await createSalt();
        const hashedPassword = await hashPassword(password, salt);
        const otp = await generateOtp();
        const expiry = new Date();
        const otpExpiry = expiry.setTime(new Date().getTime() + 60000)
    
        const customer = await Customer.create({ ...customerDetails, salt, password: hashedPassword, otp, otpExpiry });
        
        if (customer) {
            // send otp
            await onRequestOtp(otp, phone);
    
            //sign token
            const token = await generateToken(customer._id);
            res.cookie('token', token, { httpOnly: true });
            return res.status(201).json({ message: 'Customer created successfully', customer, token });
        }
        // return success message
        return res.status(400).json({ errors: [{ message: 'Customer could not be created' }] }); 
    } catch (error) {
       return res.status(400).json({ errors: [{ message: 'Could not create customer' }] }) 
    }
}


export const customerLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customerDetails = plainToClass(UserLoginInputs, req.body);
        const inputErrors = await validate(customerDetails, { validationError: { target: false } });
    
        if (inputErrors.length > 0) { 
            return res.status(400).json({ errors: inputErrors });
        }
    
        const { email, password } = customerDetails;
    
        // check if customer exists
        const existingCustomer = await Customer.findOne({ email });
    
        if(!existingCustomer) { 
            return res.status(400).json({ errors: [{ message: 'Invalid credentials' }] });
        }
    
        //compare password
        const isPasswordValid = await comparePassword(password, existingCustomer.password);
    
        if(!isPasswordValid) { 
            return res.status(400).json({ errors: [{ message: 'Invalid credentials' }] });
        }
    
        //sign token
        const token = await generateToken(existingCustomer._id);
    
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({ message: 'Customer logged in successfully', customer: existingCustomer, token });
    } catch (error) {
        return res.status(400).json({ errors: [{ message: 'Could not login customer' }] });
    }
}


export const verifyCustomer = async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const { otp } = req.body;
    const user = res.locals.customer;
    console.log(user);
    const { _id } = user;

    const customer = await Customer.findOne({ _id });

    if(!customer) { 
        return res.status(400).json({ errors: [{ message: 'Customer not found' }] });
    }

    if (customer.otp !== Number(otp)) { 
        return res.status(400).json({ errors: [{ message: 'Invalid otp' }] });
    }

    const now = new Date();
    const otpExpiry = new Date(customer.otpExpiry as number);

    if (now > otpExpiry) { 
        return res.status(400).json({ errors: [{ message: 'Otp has expired' }] });
    }

    customer.verified = true;
    delete customer.otp;
    delete customer.otpExpiry;

    await customer.save();

    const token = await generateToken(customer._id);

    return res.status(200).json({ message: 'Customer verified successfully', customer: customer, token });
  } catch (error) {
    return res.status(400).json({ errors: [{ message: 'Could not verify customer' }] });
  }
}


export const requestOtp = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const { customer } = res.locals;
        const existingCustomer = await Customer.findOne({ _id: customer._id });

        if(!existingCustomer) { 
            return res.status(400).json({ errors: [{ message: 'Customer not found' }] });
        }

        const otp = await generateOtp();
        const expiry = new Date();
        const otpExpiry = expiry.setTime(new Date().getTime() + 60000);

        existingCustomer.otp = otp;
        existingCustomer.otpExpiry = otpExpiry;

        await existingCustomer.save();

        await onRequestOtp(otp, existingCustomer.phone);

        return res.status(200).json({ message: 'Otp sent successfully' });
    } catch (error) {
        return res.status(400).json({ errors: [{ message: 'Could not request otp' }] });
    }
}


export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => { }


export const getCustomerProfile = async (req: Request, res: Response, next: NextFunction) => { 
    const { customer } = res.locals;
    const { _id } = customer;
    const existingCustomer = await Customer.findOne({ _id });

    if(!existingCustomer) { 
        return res.status(400).json({ errors: [{ message: 'Customer not found' }] });
    }

    return res.status(200).json({ message: 'Customer profile fetched successfully', customer: existingCustomer });
}


export const updateCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { customer } = res.locals;
        const { _id } = customer;
        const existingCustomer = await Customer.findOne({ _id });
    
        if(!existingCustomer) { 
            return res.status(400).json({ errors: [{ message: 'Customer not found' }] });
        }

        const customerDetails = plainToClass(EditCustomerProfileInput, req.body);
        const inputErrors = await validate(customerDetails, { validationError: { target: false } });

        if(inputErrors.length > 0) { 
            return res.status(400).json({ errors: inputErrors });
        }

        const { firstName, lastName, address } = customerDetails;

        existingCustomer.firstName = firstName;
        existingCustomer.lastName = lastName;
        existingCustomer.address = address;
        
        await existingCustomer.save();

        return res.status(200).json({ message: 'Customer profile updated successfully', customer: existingCustomer });
    } catch (error) {
        
    }
 }