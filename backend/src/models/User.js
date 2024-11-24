const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true,
        enum: ['ADMIN', 'USER'],
        default: 'USER',
    },

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;