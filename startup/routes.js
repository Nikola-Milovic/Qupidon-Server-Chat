const express = require('express');
const error = require('../middleware/error');
const user = require('../routes/user.route')
const messaging = require('../routes/messaging.route')

module.exports = function (app) {
  app.use(express.json());
  app.use('/chat/user', user)
  app.use('/chat/messages', messaging)
  app.use(error);
}