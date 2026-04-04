import express from 'express';
import {getAllCustomers, getCustomerById, newCustomer} from '../controllers/customer.contoller.js';


const router = express.Router();

// Router Post
router.post('/new-customer', newCustomer);


// Router GET
router.get('/customers', getAllCustomers);
router.get('/customer/:id', getCustomerById);



export default router