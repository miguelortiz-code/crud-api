import express from 'express';
import {getAllOrders, newOrder} from '../controllers/orders.controllers.js';

const router = express.Router();

// Router POST
router.post('/orders', newOrder);
// Router GET
router.get('/orders', getAllOrders);


export default router;