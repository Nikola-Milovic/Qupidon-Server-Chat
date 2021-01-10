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
exports.CreateNewUser = CreateNewUser
exports.GetUserByID = GetUserByID