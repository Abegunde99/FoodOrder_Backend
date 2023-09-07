import express, { Request, Response, NextFunction } from 'express';
import { Vendor, IFood } from '../models';

export const getFoodAvailability = async (req: Request, res: Response, next: NextFunction) => { 
    const pincode = req.params.pincode;

    const result = await Vendor.find({ pincode: pincode, serviceAvailable: false }).sort([['rating', 'descending']]).populate('foods');
    if (result.length == 0) return res.status(404).json({ message: 'No data found' })
    res.status(200).json({message: 'Data Found', result: result });
}

export const getTopRestaurants = async (req: Request, res: Response, next: NextFunction) => { 
    const pincode = req.params.pincode;

    const result = await Vendor.find({ pincode: pincode, serviceAvailable: false }).sort([['rating', 'descending']]).limit(1);
    if (result.length == 0) return res.status(404).json({ message: 'No data found' })
    res.status(200).json({ message: 'Restaurants found', result: result });
}

export const getFastFood = async (req: Request, res: Response, next: NextFunction) => { 
    const pincode = req.params.pincode;

    const result = await Vendor.find({ pincode: pincode, serviceAvailable: false }).populate('foods');
    if (result.length == 0) return res.status(404).json({ message: 'No data found' })

    let foodResult: any = [];
   
    const compare = (a: IFood, b: IFood) => {
        if (a.readyTime > b.readyTime) return -1;
        if (a.readyTime < b.readyTime) return 1;
        return 0;
    }

    result.forEach((vendor) => {
        vendor.foods.forEach((food: IFood) => {
                foodResult.push(food);
        })
    })

    foodResult.sort(compare);
    
    res.status(200).json({ message: 'Restaurants found', result: foodResult });
}

export const searchFood = async (req: Request, res: Response, next: NextFunction) => { }

export const getRestaurantById =async (req:Request, res:Response, next: NextFunction) => {
    
}