"use strict";
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
exports.deleteFoodById = exports.getFoods = exports.addFood = exports.updateVendorCoverImages = exports.updateVendorService = exports.updateVendorProfile = exports.getVendorProfile = exports.vendorLogin = void 0;
var adminController_1 = require("./adminController");
var models_1 = require("../models");
var utility_1 = require("../utility");
var vendorLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existedVendor, isMatch, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, adminController_1.FindVendor)('', email)];
            case 1:
                existedVendor = _b.sent();
                if (!existedVendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'invalid email or password'
                        })];
                }
                return [4 /*yield*/, (0, utility_1.comparePassword)(password, existedVendor.password)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'invalid email or password'
                        })];
                }
                return [4 /*yield*/, (0, utility_1.generateToken)(existedVendor._id)];
            case 3:
                token = _b.sent();
                res.cookie('token', token, { httpOnly: true });
                res.status(200).json({
                    message: 'Vendor is logged in successfully',
                    token: token,
                    data: existedVendor
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.vendorLogin = vendorLogin;
var getVendorProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vendor;
    return __generator(this, function (_a) {
        try {
            vendor = res.locals.vendor;
            if (!vendor) {
                return [2 /*return*/, res.status(400).json({
                        message: 'Vendor is not found'
                    })];
            }
            res.status(200).json({
                message: 'Vendor profile is fetched successfully',
                vendor: vendor
            });
        }
        catch (error) {
            console.log(error);
        }
        return [2 /*return*/];
    });
}); };
exports.getVendorProfile = getVendorProfile;
var updateVendorProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, address, foodType, phone, vendor, existedVendor, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, name_1 = _a.name, address = _a.address, foodType = _a.foodType, phone = _a.phone;
                vendor = res.locals.vendor;
                if (!vendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Vendor is not found'
                        })];
                }
                return [4 /*yield*/, (0, adminController_1.FindVendor)(vendor.id)];
            case 1:
                existedVendor = _b.sent();
                if (!existedVendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Vendor is not found'
                        })];
                }
                existedVendor.name = name_1;
                existedVendor.address = address;
                existedVendor.foodType = foodType;
                existedVendor.phone = phone;
                return [4 /*yield*/, existedVendor.save()];
            case 2:
                _b.sent();
                res.status(200).json({
                    message: 'Vendor profile is fetched successfully',
                    existedVendor: existedVendor
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateVendorProfile = updateVendorProfile;
var updateVendorService = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vendor, existedVendor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                vendor = res.locals.vendor;
                if (!vendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Vendor is not found'
                        })];
                }
                return [4 /*yield*/, (0, adminController_1.FindVendor)(vendor.id)];
            case 1:
                existedVendor = _a.sent();
                if (!existedVendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Vendor is not found'
                        })];
                }
                if (existedVendor.serviceAvailable == true || existedVendor.serviceAvailable == 'true') {
                    existedVendor.serviceAvailable = false;
                }
                else {
                    existedVendor.serviceAvailable = true;
                }
                return [4 /*yield*/, existedVendor.save()];
            case 2:
                _a.sent();
                res.status(200).json({
                    message: 'Vendor service is updated successfully',
                    existedVendor: existedVendor
                });
                return [2 /*return*/];
        }
    });
}); };
exports.updateVendorService = updateVendorService;
var updateVendorCoverImages = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vendor, existedVendor, files, images, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                vendor = res.locals.vendor;
                if (!vendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Vendor is not found'
                        })];
                }
                return [4 /*yield*/, (0, adminController_1.FindVendor)(vendor.id)];
            case 1:
                existedVendor = _b.sent();
                if (!existedVendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Vendor is not found'
                        })];
                }
                files = req.files;
                images = files.map(function (file) { return file.filename; });
                (_a = existedVendor.coverImages).push.apply(_a, images);
                return [4 /*yield*/, existedVendor.save()];
            case 2:
                _b.sent();
                res.status(200).json({
                    message: 'Vendor cover images are updated successfully',
                    existedVendor: existedVendor
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.log(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateVendorCoverImages = updateVendorCoverImages;
var addFood = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vendor, existedVendor, _a, name_2, description, price, readyTime, category, foodType, files, images, food, result, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                vendor = res.locals.vendor;
                if (!vendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Vendor is not found'
                        })];
                }
                return [4 /*yield*/, (0, adminController_1.FindVendor)(vendor.id)];
            case 1:
                existedVendor = _b.sent();
                if (!existedVendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Vendor is not found'
                        })];
                }
                _a = req.body, name_2 = _a.name, description = _a.description, price = _a.price, readyTime = _a.readyTime, category = _a.category, foodType = _a.foodType;
                files = req.files;
                images = files.map(function (file) { return file.filename; });
                return [4 /*yield*/, models_1.Food.create({
                        name: name_2,
                        description: description,
                        price: price,
                        readyTime: readyTime,
                        category: category,
                        foodType: foodType,
                        vendorId: existedVendor._id,
                        images: images
                    })];
            case 2:
                food = _b.sent();
                existedVendor.foods.push(food);
                return [4 /*yield*/, existedVendor.save()];
            case 3:
                result = _b.sent();
                res.status(200).json({
                    message: 'Food is added successfully',
                    result: result
                });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _b.sent();
                console.log(error_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addFood = addFood;
var getFoods = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vendor, existedVendor, foods, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                vendor = res.locals.vendor;
                if (!vendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Vendor is not found'
                        })];
                }
                return [4 /*yield*/, (0, adminController_1.FindVendor)(vendor.id)];
            case 1:
                existedVendor = _a.sent();
                if (!existedVendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Vendor is not found'
                        })];
                }
                return [4 /*yield*/, models_1.Food.find({ vendorId: existedVendor._id })];
            case 2:
                foods = _a.sent();
                res.status(200).json({
                    message: 'Foods are fetched successfully',
                    foods: foods
                });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getFoods = getFoods;
var deleteFoodById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vendor, existedVendor, food, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                id = req.params.id;
                vendor = res.locals.vendor;
                if (!vendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Vendor is not found'
                        })];
                }
                return [4 /*yield*/, (0, adminController_1.FindVendor)(vendor.id)];
            case 1:
                existedVendor = _a.sent();
                if (!existedVendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Vendor is not found'
                        })];
                }
                return [4 /*yield*/, models_1.Food.findByIdAndDelete(id)];
            case 2:
                food = _a.sent();
                if (!existedVendor.foods.includes(id)) return [3 /*break*/, 4];
                existedVendor.foods.splice(existedVendor.foods.indexOf(id), 1);
                return [4 /*yield*/, existedVendor.save()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (!food) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Food is not found'
                        })];
                }
                res.status(200).json({
                    message: 'Food is deleted successfully',
                    food: food
                });
                return [3 /*break*/, 6];
            case 5:
                error_6 = _a.sent();
                console.log(error_6);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteFoodById = deleteFoodById;
//# sourceMappingURL=vendorController.js.map