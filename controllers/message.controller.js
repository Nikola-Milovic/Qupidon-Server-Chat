const UserModel = require('../models/user.model')
const UserController = require('./user.controller')
const NotificationController = require('./notifications.controller')
const MessageModel = require('../models/message.model')


async function OnMessageSent(message, socket) {
    const contents = message.contents
    const receiver_id = message.receiver_id
    const sender_id = message.sender_id

    const receiver = await UserController.GetUserByID(receiver_id)
    const sender = await UserController.GetUserByID(sender_id)

    if (receiver != null) {
        console.log(receiver)
        //If the user is online, send them a message
        if (receiver.socket_id != "") {
            socket.to(receiver.socket_id).emit("onMessageReceived", message)
        } else { // else if user is offline send them notification and store the message for later
            console.log("Notification")
            UserController.AddNewMessage(message)
            NotificationController.MessageNotification(message, sender, receiver)
        }
    }
}


exports.OnMessageSent = OnMessageSent