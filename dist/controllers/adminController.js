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
exports.deleteVendorById = exports.getVendorById = exports.getVendors = exports.createVendor = exports.FindVendor = void 0;
var models_1 = require("../models");
var utility_1 = require("../utility");
var FindVendor = function (id, email) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!email) return [3 /*break*/, 2];
                return [4 /*yield*/, models_1.Vendor.findOne({ email: email })];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [4 /*yield*/, models_1.Vendor.findById(id)];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.FindVendor = FindVendor;
var createVendor = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, address, pincode, foodType, email, password, ownerName, phone, existedVendor, salt, hashedPassword, createVendor_1, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, name_1 = _a.name, address = _a.address, pincode = _a.pincode, foodType = _a.foodType, email = _a.email, password = _a.password, ownerName = _a.ownerName, phone = _a.phone;
                return [4 /*yield*/, (0, exports.FindVendor)('', email)];
            case 1:
                existedVendor = _b.sent();
                if (existedVendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Vendor is already existed'
                        })];
                }
                return [4 /*yield*/, (0, utility_1.createSalt)()];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, (0, utility_1.hashPassword)(password, salt)];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, models_1.Vendor.create({
                        name: name_1,
                        address: address,
                        pincode: pincode,
                        foodType: foodType,
                        email: email,
                        password: hashedPassword,
                        ownerName: ownerName,
                        phone: phone,
                        salt: salt,
                        serviceAvailable: false, coverImages: []
                    })];
            case 4:
                createVendor_1 = _b.sent();
                res.status(200).json({
                    message: 'Vendor is created sucessfully',
                    data: createVendor_1
                });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createVendor = createVendor;
var getVendors = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vendors, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.Vendor.find({})];
            case 1:
                vendors = _a.sent();
                if (!vendors) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'No vendors are found'
                        })];
                }
                res.status(200).json({
                    message: 'Vendors are fetched successfully',
                    data: vendors
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getVendors = getVendors;
var getVendorById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vendor, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (typeof id !== 'string') {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Id must be a string'
                        })];
                }
                return [4 /*yield*/, (0, exports.FindVendor)(id)];
            case 1:
                vendor = _a.sent();
                if (!vendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'No vendor is found'
                        })];
                }
                res.status(200).json({
                    message: 'Vendor is fetched successfully',
                    data: vendor
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getVendorById = getVendorById;
var deleteVendorById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vendor, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (typeof id !== 'string') {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Id must be a string'
                        })];
                }
                return [4 /*yield*/, models_1.Vendor.findByIdAndDelete(id)];
            case 1:
                vendor = _a.sent();
                if (!vendor) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'No vendor is found'
                        })];
                }
                res.status(200).json({
                    message: 'Vendor is deleted successfully',
                    data: vendor
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.log(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteVendorById = deleteVendorById;
//# sourceMappingURL=adminController.js.map