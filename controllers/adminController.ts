import { Response, Request, NextFunction } from "express";
import { createVendorInput } from "../dto";
import{ Vendor } from '../models'

export const createVendor = async (req: Request, res: Response, next: NextFunction)=> {
    const { name, address, pincode, foodType, email, password, ownerName, phone } = <createVendorInput>req.body
    
    const createVendor = await Vendor.create({
        name, address, pincode, foodType, email, password, ownerName, phone, salt: '', serviceAvailable: false, coverImages: []
    });

    res.status(200).json({
        message: 'Hello from createVendor', data: {
            name, address, pincode, foodType, email, password, ownerName, phone
    }})
}

export const getVendors = async (req: Request, res: Response, next: NextFunction)=> {
     
}

export const getVendorById = async (req: Request, res: Response, next: NextFunction)=> {
     
}