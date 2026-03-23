import express from 'express';
import {newCustomer} from '../controllers/customer.contoller.js';


const router = express.Router();

// Router Post
router.post('/new-customer', newCustomer);




export default router