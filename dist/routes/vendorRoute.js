"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRoute = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var validate_1 = require("../middlewares/validate");
var multer_1 = __importDefault(require("multer"));
var router = express_1.default.Router();
exports.vendorRoute = router;
var imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'images');
    },
    filename: function (req, file, callback) {
        var newFileName = new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname;
        callback(null, newFileName);
    },
});
var images = (0, multer_1.default)({ storage: imageStorage }).array('images', 10);
router.post('/login', controllers_1.vendorLogin);
router.use(validate_1.validateToken);
router.get('/profile', controllers_1.getVendorProfile);
router.put('/profile', controllers_1.updateVendorProfile);
router.put('/service', controllers_1.updateVendorService);
router.put('/coverImage', images, controllers_1.updateVendorCoverImages);
router.post('/food', images, controllers_1.addFood);
router.get('/food', controllers_1.getFoods);
router.delete('/food/:id', controllers_1.deleteFoodById);
router.get('/', function (req, res, next) {
    return res.json({ message: 'Hello from vendorRoute' });
});
//# sourceMappingURL=vendorRoute.js.map