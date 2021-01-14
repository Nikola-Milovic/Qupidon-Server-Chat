const Joi = require('joi');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Message = mongoose.model('Message', messageSchema);

exports.Message = Message;
exports.Schema = messageSchema;
