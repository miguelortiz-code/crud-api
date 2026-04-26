import express from 'express';
import {getAllCustomers, getCustomerById, newCustomer, updateCustomerById, deleteCustomerById} from '../controllers/customer.contoller.js';


const router = express.Router();

// Router Post
router.post('/new-customer', newCustomer);


// Router GET
router.get('/customers', getAllCustomers);
router.get('/customer/:id', getCustomerById);

// Router PUT
router.put('/customer/:id', updateCustomerById)

// Router DELETE
router.delete('/customer/:id', deleteCustomerById)

export default router