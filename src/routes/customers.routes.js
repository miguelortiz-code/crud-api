import express from 'express';
import {getAllCustomers, getCustomerById, newCustomer, updateCustomerById, deleteCustomerById} from '../controllers/customer.contoller.js';
import { jwtVerification } from '../middleware/index.middleware.js';

const router = express.Router();

// Router Post
router.post('/new-customer', jwtVerification, newCustomer);


// Router GET
router.get('/customers',jwtVerification, getAllCustomers);
router.get('/customer/:id',jwtVerification, getCustomerById);

// Router PUT
router.put('/customer/:id', jwtVerification, updateCustomerById)

// Router DELETE
router.delete('/customer/:id', jwtVerification, deleteCustomerById)

export default router