import { Response, Request, NextFunction } from "express";
import { createVendorInput } from "../dto";
import{ Vendor } from '../models'
import { createSalt, hashPassword } from "../utility";

export const createVendor = async (req: Request, res: Response, next: NextFunction)=> {
    const { name, address, pincode, foodType, email, password, ownerName, phone } = <createVendorInput>req.body

    const existedVendor = await Vendor.findOne({ email });

    if (existedVendor) { 
        return res.status(400).json({
            message: 'Vendor is already existed'
        })
    }
    
    //generate salt
    const salt = await createSalt();

    //hash password
    const hashedPassword = await hashPassword(password, salt);


    const createVendor = await Vendor.create({
        name, address, pincode, foodType, email, password: hashedPassword, ownerName, phone, salt, serviceAvailable: false, coverImages: []
    });

    res.status(200).json({
        message: 'Vendor is created sucessfully',
        data: createVendor
    })
}

export const getVendors = async (req: Request, res: Response, next: NextFunction)=> {
     
}

export const getVendorById = async (req: Request, res: Response, next: NextFunction)=> {
     
}