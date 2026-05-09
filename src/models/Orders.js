import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

const ordersSchema = new mongoose.Schema({
    customer:{
        type: Schema.ObjectId,
        ref: 'Customer'
    },

    products: [{
        product :{
            type: Schema.ObjectId,
            ref:  'Products'
        }
    }],

    amount: Number,
    total: {
        type: Number
    }
});

const Orders = mongoose.model('Orders', ordersSchema);
export default Orders