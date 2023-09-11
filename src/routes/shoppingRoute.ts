import express, {Request, Response, NextFunction} from 'express';
import { getFastFood, getFoodAvailability, getRestaurantById, getTopRestaurants, searchFood } from '../controllers/shoppingController';
const router = express.Router();

//food availabilty
router.get('/:pincode', getFoodAvailability)

//top restaurants
router.get('/top-restaurants/:pincode', getTopRestaurants)

//Food available in 30mins
router.get('/fast-food/:pincode', getFastFood)

//search Food
router.get('/search/:pincode', searchFood)

//find Restaurant by Id
router.get('/restaurant/:id', getRestaurantById)


export {router as shoppingRoute}