const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    socket_id: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

exports.User = User;
