const express = require('express');
const error = require('../middleware/error');
const user = require('../routes/user.route')

module.exports = function (app) {
  app.use(express.json());
  app.use('/chat/user', user)
  app.use(error);
}