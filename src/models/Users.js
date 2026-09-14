import moongose, {Schema} from 'moongose';

moongose.Promise = global.Promise;

const usersSchema = new moongose.Schema({
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

const Users = moongose.model('Users', usersSchema);
export default Users;