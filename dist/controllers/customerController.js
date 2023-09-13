"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = exports.getOrders = exports.createOrder = exports.updateCustomerProfile = exports.getCustomerProfile = exports.verifyOtp = exports.requestOtp = exports.verifyCustomer = exports.customerLogin = exports.customerSignup = void 0;
var class_transformer_1 = require("class-transformer");
var dto_1 = require("../dto");
var class_validator_1 = require("class-validator");
var models_1 = require("../models");
var utility_1 = require("../utility");
var customerSignup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customerDetails, inputErrors, phone, email, password, existingCustomer, salt, hashedPassword, otp, expiry, otpExpiry, customer, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                customerDetails = (0, class_transformer_1.plainToClass)(dto_1.CreateCustomerDetails, req.body);
                return [4 /*yield*/, (0, class_validator_1.validate)(customerDetails, { validationError: { target: false } })];
            case 1:
                inputErrors = _a.sent();
                if (inputErrors.length > 0) {
                    return [2 /*return*/, res.status(400).json({ errors: inputErrors })];
                }
                phone = customerDetails.phone, email = customerDetails.email, password = customerDetails.password;
                return [4 /*yield*/, models_1.Customer.findOne({ $or: [{ phone: phone }, { email: email }] })];
            case 2:
                existingCustomer = _a.sent();
                // if yes, return error
                if (existingCustomer) {
                    return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Customer already exists' }] })];
                }
                return [4 /*yield*/, (0, utility_1.createSalt)()];
            case 3:
                salt = _a.sent();
                return [4 /*yield*/, (0, utility_1.hashPassword)(password, salt)];
            case 4:
                hashedPassword = _a.sent();
                return [4 /*yield*/, (0, utility_1.generateOtp)()];
            case 5:
                otp = _a.sent();
                expiry = new Date();
                otpExpiry = expiry.setTime(new Date().getTime() + 60000);
                return [4 /*yield*/, models_1.Customer.create(__assign(__assign({}, customerDetails), { salt: salt, password: hashedPassword, otp: otp, otpExpiry: otpExpiry, orders: [] }))];
            case 6:
                customer = _a.sent();
                if (!customer) return [3 /*break*/, 9];
                // send otp
                return [4 /*yield*/, (0, utility_1.onRequestOtp)(otp, phone)];
            case 7:
                // send otp
                _a.sent();
                return [4 /*yield*/, (0, utility_1.generateToken)(customer._id)];
            case 8:
                token = _a.sent();
                res.cookie('token', token, { httpOnly: true });
                return [2 /*return*/, res.status(201).json({ message: 'Customer created successfully', customer: customer, token: token })];
            case 9: 
            // return success message
            return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Customer could not be created' }] })];
            case 10:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Could not create customer' }] })];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.customerSignup = customerSignup;
var customerLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customerDetails, inputErrors, email, password, existingCustomer, isPasswordValid, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                customerDetails = (0, class_transformer_1.plainToClass)(dto_1.UserLoginInputs, req.body);
                return [4 /*yield*/, (0, class_validator_1.validate)(customerDetails, { validationError: { target: false } })];
            case 1:
                inputErrors = _a.sent();
                if (inputErrors.length > 0) {
                    return [2 /*return*/, res.status(400).json({ errors: inputErrors })];
                }
                email = customerDetails.email, password = customerDetails.password;
                return [4 /*yield*/, models_1.Customer.findOne({ email: email })];
            case 2:
                existingCustomer = _a.sent();
                if (!existingCustomer) {
                    return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Invalid credentials' }] })];
                }
                return [4 /*yield*/, (0, utility_1.comparePassword)(password, existingCustomer.password)];
            case 3:
                isPasswordValid = _a.sent();
                if (!isPasswordValid) {
                    return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Invalid credentials' }] })];
                }
                return [4 /*yield*/, (0, utility_1.generateToken)(existingCustomer._id)];
            case 4:
                token = _a.sent();
                res.cookie('token', token, { httpOnly: true });
                return [2 /*return*/, res.status(200).json({ message: 'Customer logged in successfully', customer: existingCustomer, token: token })];
            case 5:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Could not login customer' }] })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.customerLogin = customerLogin;
var verifyCustomer = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var otp, user, _id, customer, now, otpExpiry, token, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                otp = req.body.otp;
                user = res.locals.customer;
                console.log(user);
                _id = user._id;
                return [4 /*yield*/, models_1.Customer.findOne({ _id: _id })];
            case 1:
                customer = _a.sent();
                if (!customer) {
                    return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Customer not found' }] })];
                }
                if (customer.otp !== Number(otp)) {
                    return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Invalid otp' }] })];
                }
                now = new Date();
                otpExpiry = new Date(customer.otpExpiry);
                if (now > otpExpiry) {
                    return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Otp has expired' }] })];
                }
                customer.verified = true;
                delete customer.otp;
                delete customer.otpExpiry;
                return [4 /*yield*/, customer.save()];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, utility_1.generateToken)(customer._id)];
            case 3:
                token = _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'Customer verified successfully', customer: customer, token: token })];
            case 4:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Could not verify customer' }] })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.verifyCustomer = verifyCustomer;
var requestOtp = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, existingCustomer, otp, expiry, otpExpiry, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                customer = res.locals.customer;
                return [4 /*yield*/, models_1.Customer.findOne({ _id: customer._id })];
            case 1:
                existingCustomer = _a.sent();
                if (!existingCustomer) {
                    return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Customer not found' }] })];
                }
                return [4 /*yield*/, (0, utility_1.generateOtp)()];
            case 2:
                otp = _a.sent();
                expiry = new Date();
                otpExpiry = expiry.setTime(new Date().getTime() + 60000);
                existingCustomer.otp = otp;
                existingCustomer.otpExpiry = otpExpiry;
                return [4 /*yield*/, existingCustomer.save()];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, utility_1.onRequestOtp)(otp, existingCustomer.phone)];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'Otp sent successfully' })];
            case 5:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Could not request otp' }] })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.requestOtp = requestOtp;
var verifyOtp = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
exports.verifyOtp = verifyOtp;
var getCustomerProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, _id, existingCustomer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                customer = res.locals.customer;
                _id = customer._id;
                return [4 /*yield*/, models_1.Customer.findOne({ _id: _id })];
            case 1:
                existingCustomer = _a.sent();
                if (!existingCustomer) {
                    return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Customer not found' }] })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'Customer profile fetched successfully', customer: existingCustomer })];
        }
    });
}); };
exports.getCustomerProfile = getCustomerProfile;
var updateCustomerProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, _id, existingCustomer, customerDetails, inputErrors, firstName, lastName, address, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                customer = res.locals.customer;
                _id = customer._id;
                return [4 /*yield*/, models_1.Customer.findOne({ _id: _id })];
            case 1:
                existingCustomer = _a.sent();
                if (!existingCustomer) {
                    return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Customer not found' }] })];
                }
                customerDetails = (0, class_transformer_1.plainToClass)(dto_1.EditCustomerProfileInput, req.body);
                return [4 /*yield*/, (0, class_validator_1.validate)(customerDetails, { validationError: { target: false } })];
            case 2:
                inputErrors = _a.sent();
                if (inputErrors.length > 0) {
                    return [2 /*return*/, res.status(400).json({ errors: inputErrors })];
                }
                firstName = customerDetails.firstName, lastName = customerDetails.lastName, address = customerDetails.address;
                existingCustomer.firstName = firstName;
                existingCustomer.lastName = lastName;
                existingCustomer.address = address;
                return [4 /*yield*/, existingCustomer.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'Customer profile updated successfully', customer: existingCustomer })];
            case 4:
                error_5 = _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateCustomerProfile = updateCustomerProfile;
var createOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, _id, existingCustomer, orderId, cart, cartItems, netAmount, foods, currentOrder;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                customer = res.locals.customer;
                _id = customer._id;
                return [4 /*yield*/, models_1.Customer.findOne({ _id: _id })];
            case 1:
                existingCustomer = _a.sent();
                if (!existingCustomer) {
                    return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Customer not found' }] })];
                }
                orderId = "ORDER-".concat(Math.floor(Math.random() * 89999) + 1000);
                cart = req.body;
                cartItems = Array();
                netAmount = 0.0;
                return [4 /*yield*/, models_1.Food.find().where('_id').in(cart.map(function (item) { return item._id; })).exec()];
            case 2:
                foods = _a.sent();
                foods.map(function (food) {
                    cart.map(function (_a) {
                        var _id = _a._id, unit = _a.unit;
                        if (food._id == _id) {
                            netAmount += food.price * unit;
                            cartItems.push({ food: food, unit: unit });
                        }
                    });
                });
                if (!cartItems) return [3 /*break*/, 5];
                return [4 /*yield*/, models_1.Order.create({
                        orderId: orderId,
                        totalAmount: netAmount,
                        items: cartItems,
                        orderDate: new Date(),
                        paidThrough: 'COD',
                        paymentResponse: '',
                        orderStatus: 'waiting'
                    })];
            case 3:
                currentOrder = _a.sent();
                if (!currentOrder) {
                    return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Could not create order' }] })];
                }
                existingCustomer.orders.push(currentOrder);
                return [4 /*yield*/, existingCustomer.save()];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'Order created successfully', order: currentOrder })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createOrder = createOrder;
var getOrders = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, _id, existingCustomer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                customer = res.locals.customer;
                _id = customer._id;
                return [4 /*yield*/, models_1.Customer.findOne({ _id: _id }).populate('orders')];
            case 1:
                existingCustomer = _a.sent();
                if (!existingCustomer) {
                    return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Customer not found' }] })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'Orders fetched successfully', orders: existingCustomer.orders })];
        }
    });
}); };
exports.getOrders = getOrders;
var getOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, models_1.Order.findOne({ _id: id }).populate('items.food')];
            case 1:
                order = _a.sent();
                if (!order) {
                    return [2 /*return*/, res.status(400).json({ errors: [{ message: 'Customer not found' }] })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'Customer fetched successfully', order: order })];
        }
    });
}); };
exports.getOrder = getOrder;
//# sourceMappingURL=customerController.js.map