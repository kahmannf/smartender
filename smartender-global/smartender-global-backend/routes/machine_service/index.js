const express = require('express');
const router = express.Router();

const logger = require('../../logger');
const machine_lib = require('../../lib/machine');


var io = undefined;

const init = (socket_io) => {
  io = socket_io;
};

router.get('/init/:key', (req, res) => {
  if(req.params.key) {
    machine_lib.getMachineByKey(req.params.key)
    .then(result => {
      if(result) {
        result.machinekey = undefined;

        io.emit('machine ' + result.id, result);
      }
      res.end();
    })
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = { 
  router,
  init
};