import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const usersSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        lowerCase: true,
        trim: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

const Users = mongoose.model('Users', usersSchema);
export default Users;