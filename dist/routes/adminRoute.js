"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var router = express_1.default.Router();
exports.adminRoute = router;
router.post('/vendor', controllers_1.createVendor);
router.get('/vendor', controllers_1.getVendors);
router.get('/vendor/:id', controllers_1.getVendorById);
router.delete('/vendor/:id', controllers_1.deleteVendorById);
router.get('/', function (req, res, next) {
    return res.json({ message: 'Hello from adminRoute' });
});
//# sourceMappingURL=adminRoute.js.map