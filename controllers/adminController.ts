import { Response, Request, NextFunction } from "express";
import { createVendorInput } from "../dto";
import{ Vendor } from '../models'
import { createSalt, hashPassword } from "../utility";

export const FindVendor = async (id: string | undefined, email?: string) => {
    if (email) {
        return await Vendor.findOne({ email });
    } else {
        return await Vendor.findById(id);
    }
}

export const createVendor = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const { name, address, pincode, foodType, email, password, ownerName, phone } = <createVendorInput>req.body

        const existedVendor = await FindVendor('', email );

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
    } catch (error) {
       console.log(error); 
    }
}

export const getVendors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendors = await Vendor.find({});
    
        if (!vendors) {
            return res.status(400).json({
                message: 'No vendors are found'
            })
        }

        res.status(200).json({
            message: 'Vendors are fetched successfully',
            data: vendors
        })
    } catch (error) {
        console.log(error)
    }
};

export const getVendorById = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const id = req.params.id;
        if (typeof id !== 'string') {
            return res.status(400).json({
                message: 'Id must be a string'
            })
        }
    
        const vendor = await FindVendor(id);
    
        if(!vendor){
            return res.status(400).json({
                message: 'No vendor is found'
            });
        }
    
        res.status(200).json({
            message: 'Vendor is fetched successfully',
            data: vendor
        }) 
    } catch (error) {
        console.log(error);
    }
    
}