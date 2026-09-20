import express from 'express';
import {getAllOrders, newOrder, getOrderById, updatedOrderById, deleteOrder} from '../controllers/orders.controllers.js';
import { jwtVerification } from '../middleware/index.middleware.js';

const router = express.Router();

// Router POST
router.post('/orders', jwtVerification, newOrder);
// Router GET
router.get('/orders', jwtVerification, getAllOrders);
router.get('/orders/:id', jwtVerification, getOrderById);

// Router PUT
router.put('/orders/:id', jwtVerification, updatedOrderById);

// Router DELETE    
router.delete('/orders/:id', jwtVerification, deleteOrder);
export default router;