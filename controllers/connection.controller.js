const logger = require("../../qupidon-app/logging/logger");
const UserController = require("../controllers/user.controller")

module.exports = function (io) {
    OnConnection(io)
};

function OnConnection(io) {
    io.on("connection", (socket) => {
        registerListener(socket)
    });
}

function registerListener(socket) {
    OnUserConnected(socket)
    OnMessageSent(socket)
    OnUserDisconnected(socket)
}

function OnUserConnected(socket) {
    socket.on("onUserConnected", (...args) => {
        UserController.OnUserConnected(JSON.parse(args[0]))
    });
}

function OnUserDisconnected(socket) {
    socket.on("onUserConnected", (...args) => {
        UserController.OnUserDisconnected(JSON.parse(args[0]).user_id)
    });
}

function OnMessageSent(socket) {
    socket.on("onMessageSent", (...args) => {
        console.log(JSON.parse(args[0]))
    });
}