import { Request, Response, NextFunction } from 'express';
import { loginVendorInput } from '../dto';
import { FindVendor } from './adminController';
import { comparePassword } from '../utility';

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

        res.status(200).json({
            message: 'Vendor is logged in successfully',
            data: existedVendor
        });
    } catch (error) {
        console.log(error);
    }
}