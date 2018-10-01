"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    createdAt: Date,
    updateAt: Date,
    name: {
        type: String,
        default: '',
        path: 'name'
    },
    username: {
        type: String,
        default: '',
        path: 'username',
        unique: true,
        lowercase: true
    },
    email: {
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
        type: mongoose_1.Schema.Types.ObjectId,
        path: 'posts',
        ref: 'Post'
    }
});
exports.default = mongoose_1.model('User', UserSchema);
