"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoppingRoute = void 0;
var express_1 = __importDefault(require("express"));
var shoppingController_1 = require("../controllers/shoppingController");
var router = express_1.default.Router();
exports.shoppingRoute = router;
//food availabilty
router.get('/:pincode', shoppingController_1.getFoodAvailability);
//top restaurants
router.get('/top-restaurants/:pincode', shoppingController_1.getTopRestaurants);
//Food available in 30mins
router.get('/fast-food/:pincode', shoppingController_1.getFastFood);
//search Food
router.get('/search/:pincode', shoppingController_1.searchFood);
//find Restaurant by Id
router.get('/restaurant/:id', shoppingController_1.getRestaurantById);
//# sourceMappingURL=shoppingRoute.js.map