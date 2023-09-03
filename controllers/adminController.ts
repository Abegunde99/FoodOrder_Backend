import { Response, Request, NextFunction } from "express";
import { createVendorInput } from "../dto";

export const createVendor = async (req: Request, res: Response, next: NextFunction)=> {
    const { name, address, pincode, foodType, email, password, ownerName, phone } = <createVendorInput>req.body
    
}

export const getVendors = async (req: Request, res: Response, next: NextFunction)=> {
     
}

export const getVendorById = async (req: Request, res: Response, next: NextFunction)=> {
     
}