const { Mongoose, mongo } = require('mongoose');
const logger = require('../logging/logger');
const UserModel = require('../models/user.model').User;
const MessageModel = require('../models/message.model')

//GetUserByID return the user if it exists or null if the user doesnt exist
async function GetUserByID(id) {
    console.log(id)
    let user = await UserModel.findOne({ user_id: id }).exec();
    return user;
}

async function CreateNewUser(id) {
    console.log("Create new user " + id)
    await UserModel.create({ user_id: id })
}

async function AddFCMToken(id, token) {
    await UserModel.updateOne({ user_id: id }, { fcm_token: token })
}

async function OnUserConnected(userData) {
    await UserModel.updateOne({ user_id: userData.user_id }, {
        socket_id: userData.socket_id
    }, function (err, res) {
    });
}

async function OnUserDisconnected(userid) {
    console.log("user disconnected " + userid)
    await UserModel.updateOne({ user_id: userid }, {
        socket_id: ""
    })
}

async function AddNewMessage(message) {
    console.log(message)
    await UserModel.updateOne({ user_id: message.receiver_id }, {
        $push: {
            unread_messages: { sender_id: message.sender_id, content: message.contents, sent_at_milis: message.sent_at_milis }
        }
    });
}

async function GetUnreadMessages(id) {
    const user = await GetUserByID(id)
    await UserModel.updateOne({ user_id: id }, { unread_messages: [] })

    return user.unread_messages

}

exports.CreateNewUser = CreateNewUser
exports.GetUserByID = GetUserByID
exports.OnUserConnected = OnUserConnected
exports.OnUserDisconnected = OnUserDisconnected
exports.AddNewMessage = AddNewMessage
exports.AddFCMToken = AddFCMToken
exports.GetUnreadMessages = GetUnreadMessages