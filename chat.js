'use strict';
const logger = require('./logging/logger')
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

//Sockets
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);

require('../qupidon-chat/controllers/connection.controller')(io)

module.exports = () => {
    server.listen(3001)
};