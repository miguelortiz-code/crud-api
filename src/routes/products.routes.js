import express from 'express';
import {newProducts} from '../controllers/products.controller.js';
import {multerErrorHandler, updateImage} from '../middleware/index.middleware.js';
import {uploadTo} from '../config/multer.js';

const router = express.Router();

// Router POST
router.post('/products/new-product', uploadTo('products').single('image'), multerErrorHandler(), newProducts);



export default router