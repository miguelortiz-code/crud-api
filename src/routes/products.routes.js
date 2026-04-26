import express from 'express';
import {newProducts} from '../controllers/products.controller.js';

const router = express.Router();

// Router POST
router.post('/products/new-product', newProducts);



export default router