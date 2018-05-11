var io = undefined;

const logger = require('../logger');

const machines = require('./machines');

const init = (socket_io) => {
  io = socket_io;

  machines.init(io);

  io.on('connection', (socket) => {
    logger.log('connected', 10000);
  
    socket.on('disconnect', () => {
      logger.log('disconnected', 10000);
    });

    socket.on('machine', machines.recieve);

  });
}

module.exports = {
  init,
}