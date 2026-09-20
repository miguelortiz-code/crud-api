import express from 'express';
import {getAllProducts, getProductById, newProducts, updateProductById, deleteProduct, searchProduct} from '../controllers/products.controller.js';
import {multerErrorHandler, updateImage} from '../middleware/index.middleware.js';
import {uploadTo} from '../config/multer.js';
import { jwtVerification } from '../middleware/index.middleware.js';

const router = express.Router();

// Router POST
router.post('/products/new-product',jwtVerification, uploadTo('products').single('image'), multerErrorHandler(), newProducts);
router.post('/products/search/:query', jwtVerification, searchProduct)
// Router GET
router.get ('/products', jwtVerification, getAllProducts);
router.get ('/product/:id', jwtVerification, getProductById);

// Router PUT
router.put("/product/:id", jwtVerification,  uploadTo('products').single('image'), multerErrorHandler(), updateProductById);

// Router DELETE
router.delete('/product/:id', jwtVerification, deleteProduct);

export default router   