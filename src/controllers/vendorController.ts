import e, { Request, Response, NextFunction } from 'express';
import { loginVendorInput, EditVendorInput, createFoodDetails } from '../dto';
import { FindVendor } from './adminController';
import {Food } from '../models';
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
    try {
        const vendor = res.locals.vendor;
        if (!vendor) {
            return res.status(400).json({
                message: 'Vendor is not found'
            });
        }

        res.status(200).json({
        message: 'Vendor profile is fetched successfully',
        vendor
    });
    } catch (error) {
        console.log(error);
    }
}

export const updateVendorProfile = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const {name, address, foodType, phone} = <EditVendorInput>req.body;
        const vendor = res.locals.vendor;
        if (!vendor) {
            return res.status(400).json({
                message: 'Vendor is not found'
            });
        }
        const existedVendor = await FindVendor(vendor.id);
        if (!existedVendor) {
            return res.status(400).json({
                message: 'Vendor is not found'
            });
        }
        existedVendor.name = name;
        existedVendor.address = address;
        existedVendor.foodType = foodType;
        existedVendor.phone = phone;

        await existedVendor.save();
        res.status(200).json({
            message: 'Vendor profile is fetched successfully',
            existedVendor
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => { 
    const vendor = res.locals.vendor;
    if (!vendor) {
        return res.status(400).json({
            message: 'Vendor is not found'
        });
    }
    const existedVendor = await FindVendor(vendor.id) ;
    if (!existedVendor) {
        return res.status(400).json({
            message: 'Vendor is not found'
        });
    }
    if (existedVendor.serviceAvailable == true || existedVendor.serviceAvailable == 'true') { 
        existedVendor.serviceAvailable = false;
    } else {
        existedVendor.serviceAvailable = true;
    }
    await existedVendor.save()

    res.status(200).json({
        message: 'Vendor service is updated successfully',
        existedVendor
    });
}

export const updateVendorCoverImages = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const vendor = res.locals.vendor;

        if(!vendor) {
            return res.status(400).json({
                message: 'Vendor is not found'
            });
        }

        const existedVendor = await FindVendor(vendor.id);

        if (!existedVendor) {
            return res.status(400).json({
                message: 'Vendor is not found'
            });
        }

        const files = req.files as [Express.Multer.File];

        const images = files.map(file => file.filename);

        existedVendor.coverImages.push(...images);

        await existedVendor.save();

        res.status(200).json({
            message: 'Vendor cover images are updated successfully',
            existedVendor
        });
    } catch (error) {
        console.log(error)
    }
}

export const addFood = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const vendor = res.locals.vendor;

        if (!vendor) {
            return res.status(400).json({
                message: 'Vendor is not found'
            });
        }

        const existedVendor = await FindVendor(vendor.id) ;
        if (!existedVendor) {
            return res.status(400).json({
                message: 'Vendor is not found'
            });
        }
        const { name, description, price, readyTime, category, foodType } = <createFoodDetails>req.body;
        const files = req.files as [Express.Multer.File];

        const images = files.map(file => file.filename);

        const food = await Food.create({
            name, description, price, readyTime, category, foodType, vendorId: existedVendor._id, images
        });
        existedVendor.foods.push(food);
        const result = await existedVendor.save();
        res.status(200).json({
            message: 'Food is added successfully',
            result
        });
    } catch (error) {
        console.log(error);
    }
}

export const getFoods = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const vendor = res.locals.vendor;
        if (!vendor) {
            return res.status(400).json({
                message: 'Vendor is not found'
            });
        }
        const existedVendor = await FindVendor(vendor.id) ;
        if (!existedVendor) {
            return res.status(400).json({
                message: 'Vendor is not found'
            });
        }
        const foods = await Food.find({vendorId: existedVendor._id});
        res.status(200).json({
            message: 'Foods are fetched successfully',
            foods
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteFoodById = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const { id } = req.params;
        const vendor = res.locals.vendor;

        if (!vendor) {
            return res.status(400).json({
                message: 'Vendor is not found'
            });
        }

        const existedVendor = await FindVendor(vendor.id);
        
        if (!existedVendor) {
            return res.status(400).json({
                message: 'Vendor is not found'
            });
        }

        const food = await Food.findByIdAndDelete(id);
        if (existedVendor.foods.includes(id)) {
            existedVendor.foods.splice(existedVendor.foods.indexOf(id), 1);
            await existedVendor.save();
        }

        if (!food) {
            return res.status(400).json({
                message: 'Food is not found'
            });
        }

        res.status(200).json({
            message: 'Food is deleted successfully',
            food
        });
    } catch (error) {
        console.log(error)
    }
}