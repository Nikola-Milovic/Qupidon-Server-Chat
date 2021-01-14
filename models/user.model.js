const Joi = require('joi');
const mongoose = require('mongoose');
const messageModel = require('./message.model')

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    socket_id: {
        type: String
    },
    unread_messages: {
        type: [messageModel.Schema]
    }
});

const User = mongoose.model('User', userSchema);

exports.User = User;
