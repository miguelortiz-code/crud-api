import express from 'express';
import {newOrder} from '../controllers/orders.controllers.js';

const router = express.Router();


router.post('/orders', newOrder);




export default router;