import mongoose from 'moongose';

mongoose.Promise = global.Promise;

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },

    lastname: {
        type: String,
        trim: true
    },
    
    company:{
        type: String,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },

    telefono: {
        type: String,
        trim: true
    },
}, {
    timestamps: true,
});


const Customers = mongoose.model('customers', customerSchema);

export default Customers