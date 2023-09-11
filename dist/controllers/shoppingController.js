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
exports.getRestaurantById = exports.searchFood = exports.getFastFood = exports.getTopRestaurants = exports.getFoodAvailability = void 0;
var models_1 = require("../models");
var getFoodAvailability = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pincode, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pincode = req.params.pincode;
                return [4 /*yield*/, models_1.Vendor.find({ pincode: pincode, serviceAvailable: false }).sort([['rating', 'descending']]).populate('foods')];
            case 1:
                result = _a.sent();
                if (result.length == 0)
                    return [2 /*return*/, res.status(404).json({ message: 'No data found' })];
                res.status(200).json({ message: 'Data Found', result: result });
                return [2 /*return*/];
        }
    });
}); };
exports.getFoodAvailability = getFoodAvailability;
var getTopRestaurants = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pincode, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pincode = req.params.pincode;
                return [4 /*yield*/, models_1.Vendor.find({ pincode: pincode, serviceAvailable: false }).sort([['rating', 'descending']]).limit(1)];
            case 1:
                result = _a.sent();
                if (result.length == 0)
                    return [2 /*return*/, res.status(404).json({ message: 'No data found' })];
                res.status(200).json({ message: 'Restaurants found', result: result });
                return [2 /*return*/];
        }
    });
}); };
exports.getTopRestaurants = getTopRestaurants;
var getFastFood = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pincode, result, foodResult, compare;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pincode = req.params.pincode;
                return [4 /*yield*/, models_1.Vendor.find({ pincode: pincode, serviceAvailable: false }).populate('foods')];
            case 1:
                result = _a.sent();
                if (result.length == 0)
                    return [2 /*return*/, res.status(404).json({ message: 'No data found' })];
                foodResult = [];
                compare = function (a, b) {
                    if (a.readyTime > b.readyTime)
                        return -1;
                    if (a.readyTime < b.readyTime)
                        return 1;
                    return 0;
                };
                result.forEach(function (vendor) {
                    vendor.foods.forEach(function (food) {
                        foodResult.push(food);
                    });
                });
                foodResult.sort(compare);
                res.status(200).json({ message: 'Restaurants found', result: foodResult });
                return [2 /*return*/];
        }
    });
}); };
exports.getFastFood = getFastFood;
var searchFood = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pincode, result, foods;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pincode = req.params.pincode;
                return [4 /*yield*/, models_1.Vendor.find({ pincode: pincode, serviceAvailable: false }).populate('foods')];
            case 1:
                result = _a.sent();
                if (result.length == 0)
                    return [2 /*return*/, res.status(404).json({ message: 'No Food found' })];
                foods = result[0].foods;
                res.status(200).json({ message: 'Food found', result: foods });
                return [2 /*return*/];
        }
    });
}); };
exports.searchFood = searchFood;
var getRestaurantById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, models_1.Vendor.findById(id).populate('foods')];
            case 1:
                result = _a.sent();
                if (!result)
                    return [2 /*return*/, res.status(404).json({ message: 'No Restaurant found' })];
                res.status(200).json({ message: 'Restaurant found', result: result });
                return [2 /*return*/];
        }
    });
}); };
exports.getRestaurantById = getRestaurantById;
//# sourceMappingURL=shoppingController.js.map