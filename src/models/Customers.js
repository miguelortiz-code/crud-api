import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    lastname: {
        type: String,
        required: true,
        trim: true
    },
    
    company: {
        type: String,
        trim: true,
        default: ''
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Email inválido']
    },

    telefono: {
        type: String,
        trim: true,
        default: ''
    }
}, {
    timestamps: true
});

const Customers = mongoose.model('Customer', customerSchema);

export default Customers;