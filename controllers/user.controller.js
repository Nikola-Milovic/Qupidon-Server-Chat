const { Mongoose, mongo } = require('mongoose');
const logger = require('../logging/logger');
const UserModel = require('../models/user.model')

//GetUserByID return the user if it exists or null if the user doesnt exist
async function GetUserByID(id) {
    let user = await UserModel.User.findOne({ user_id: id }).exec();
    return user;
}

async function CreateNewUser(id) {
    await UserModel.User.create({ user_id: id })
}

function OnUserConnected(userData) {
    UserModel.User.update({ user_id: userData.user_id }, {
        socket_id: userData.socket_id
    })
}

function OnUserDisconnected(userid) {
    UserModel.User.update({ user_id: userid }, {
        socket_id: ""
    })
}

exports.CreateNewUser = CreateNewUser
exports.GetUserByID = GetUserByID
exports.OnUserConnected = OnUserConnected
exports.OnUserDisconnected = OnUserDisconnected