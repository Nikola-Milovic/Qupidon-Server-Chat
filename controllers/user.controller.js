const { Mongoose, mongo } = require('mongoose');
const logger = require('../logging/logger');
const UserModel = require('../models/user.model')
const MessageModel = require('../models/message.model')

//GetUserByID return the user if it exists or null if the user doesnt exist
async function GetUserByID(id) {
    console.log(id)
    let user = await UserModel.User.findOne({ user_id: id }).exec();
    return user;
}

async function CreateNewUser(id) {
    await UserModel.User.create({ user_id: id })
}

async function OnUserConnected(userData) {
    console.log("user connected " + userData)
    await UserModel.User.updateOne({ user_id: userData.user_id }, {
        socket_id: userData.socket_id
    }, function (err, res) {
        console.log(res)
    });
}

async function OnUserDisconnected(userid) {
    console.log("user disconnected " + userid)
    await UserModel.User.updateOne({ user_id: userid }, {
        socket_id: ""
    })
}

function AddNewMessage(message) {
    UserModel.User.updateOne({ user_id: message.receiver_id }, {
        $push: { unread_messages: { sender_id: message.sender_id, content: message.content } }
    })
}

exports.CreateNewUser = CreateNewUser
exports.GetUserByID = GetUserByID
exports.OnUserConnected = OnUserConnected
exports.OnUserDisconnected = OnUserDisconnected
exports.AddNewMessage = AddNewMessage