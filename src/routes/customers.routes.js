import express from 'express';
import {getAllCustomers, newCustomer} from '../controllers/customer.contoller.js';


const router = express.Router();

// Router Post
router.post('/new-customer', newCustomer);


// Router GET
router.get('/all-customers', getAllCustomers);



export default router