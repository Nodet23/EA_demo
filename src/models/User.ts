import {Schema, model, Mongoose} from 'mongoose';

const UserSchema: Schema = new Schema({

    createdAt: Date, 
    updateAt: Date, 
    name:{
        type: String, 
        default: '', 
        path: 'name'
    },
    username:{
        type: String, 
        default: '', 
        path: 'username',
        unique: true,
        lowercase: true
    },
    email:{
        //url.com/posts/firtscosa
        type: String, 
        default: '',
        path: 'email',
        unique: true
    },
    password: {
        type: String, 
        default: '', 
        path: 'password',
    }, 
    posts: {
        type: Schema.Types.ObjectId, 
        path: 'posts',
        ref: 'Post'
    }
});

export default model('User', UserSchema);
