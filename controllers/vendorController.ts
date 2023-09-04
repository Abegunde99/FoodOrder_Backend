import { Request, Response, NextFunction } from 'express';
import { loginVendorInput } from '../dto';
import { FindVendor } from './adminController';
import { comparePassword, generateToken } from '../utility';

export const vendorLogin = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const { email, password } = <loginVendorInput>req.body;

        const existedVendor = await FindVendor('', email);

        if (!existedVendor) {
            return res.status(400).json({
                message: 'invalid email or password'
            });
        }

        const isMatch = await comparePassword(password, existedVendor.password);
        if(!isMatch) {
            return res.status(400).json({
                message: 'invalid email or password'
            });
        }

        const token = await generateToken(existedVendor._id);
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({
            message: 'Vendor is logged in successfully',
            token,
            data: existedVendor
        });
    } catch (error) {
        console.log(error);
    }
}

export const getVendorProfile = async (req: Request, res: Response, next: NextFunction) => { 
    const vendor = res.locals.vendor;
    res.status(200).json({
        message: 'Vendor profile is fetched successfully',
        vendor
    });
}