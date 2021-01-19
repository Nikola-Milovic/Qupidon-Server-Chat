const Joi = require('joi');
const mongoose = require('mongoose');


var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
};

const messageSchema = new mongoose.Schema({
    sender_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }, sent_at_milis: {
        type: Number,
        required: true
    }
});

const Message = mongoose.model('Message', messageSchema);

exports.Message = Message;
exports.Schema = messageSchema;
