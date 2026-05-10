import express from 'express';
import {getAllOrders, newOrder, getOrderById, updatedOrderById} from '../controllers/orders.controllers.js';

const router = express.Router();

// Router POST
router.post('/orders', newOrder);
// Router GET
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);

// Router PUT
router.put('/orders/:id', updatedOrderById)

export default router;