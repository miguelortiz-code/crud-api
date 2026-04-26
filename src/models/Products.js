import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    price: Number,
    image: String,
})



const Products  = mongoose.model('Products', productsSchema);
export default Products