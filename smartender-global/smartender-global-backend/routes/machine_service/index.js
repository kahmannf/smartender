const express = require('express');
const router = express.Router();

const logger = require('../../logger');
const machine_lib = require('../../lib/machine');


var io = undefined;

const init = (socket_io) => {
  io = socket_io;
};

router.post('/report/:machinekey', (req, res) => {
  if(req.params.machinekey) {
    machine_lib.convertKeyIntoId(req.params.machinekey)
    .then(machineid => {
      if(machineid) {
        res.sendStatus(200);
        io.emit('machine ' + machineid);
      } else {
        res.sendStatus(400);
      }
    })
    .catch(err => {
      logger.error(err);
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