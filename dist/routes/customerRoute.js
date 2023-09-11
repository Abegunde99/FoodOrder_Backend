"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoute = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var validate_1 = require("../middlewares/validate");
var router = express_1.default.Router();
exports.customerRoute = router;
//signup/create user
router.post('/signup', controllers_1.customerSignup);
//login user
router.post('/login', controllers_1.customerLogin);
//authenticate
router.use(validate_1.validateToken2);
//verify customer account
router.patch('/verify', controllers_1.verifyCustomer);
//otp / Requesting otp
router.get('/otp', controllers_1.requestOtp);
//profile
router.get('/profile', controllers_1.getCustomerProfile);
//update profile
router.patch('/profile', controllers_1.updateCustomerProfile);
//# sourceMappingURL=customerRoute.js.map