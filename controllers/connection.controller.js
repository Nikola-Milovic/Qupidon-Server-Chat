const logger = require("../../qupidon-app/logging/logger");

module.exports = function (io) {
    OnConnection(io)
};

function OnConnection(io) {
    io.on("connection", (socket) => {
        logger.info(socket.id)
      });
}