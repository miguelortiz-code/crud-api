import express from 'express';
import {getAllProducts, getProductById, newProducts, updateProductById, saveImageGroup} from '../controllers/products.controller.js';
import {multerErrorHandler, updateImage} from '../middleware/index.middleware.js';
import {uploadTo} from '../config/multer.js';

const router = express.Router();

// Router POST
router.post('/products/new-product', uploadTo('products').single('image'), multerErrorHandler(), newProducts);

// Router GET
router.get ('/products', getAllProducts);
router.get ('/product/:id', getProductById);

// Router PUT
router.put("/product/:id",  uploadTo('products').single('image'), multerErrorHandler(), updateProductById);

export default router