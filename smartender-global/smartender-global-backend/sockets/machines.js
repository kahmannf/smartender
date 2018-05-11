var io = undefined;

const machine_lib = require('../lib/machine');

const logger = require('../logger');

const init = (socket_io) => io = socket_io;

const recieve = (machine_msg) => {
  
}

module.exports = {
  recieve,
  init
}