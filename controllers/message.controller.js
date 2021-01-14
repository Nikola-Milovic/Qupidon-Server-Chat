const UserModel = require('../models/user.model')
const UserController = require('./user.controller')
const MessageModel = require('../models/message.model')


async function OnMessageSent(message, socket) {
    const contents = message.contents
    const receiver_id = message.receiver_id
    const sender_id = message.sender_id

    const receiver = await UserController.GetUserByID(receiver_id)

    if (receiver != null) {
        console.log(receiver)
        //If the user is online, send them a message
        if (receiver.socket_id != "") {
            socket.to(receiver.socket_id).emit("onMessageReceived", message)
        } else { // else if user is offline send them notification and store the message for later
            UserController.AddNewMessage(message)
            //notification
        }
    }
}


exports.OnMessageSent = OnMessageSent