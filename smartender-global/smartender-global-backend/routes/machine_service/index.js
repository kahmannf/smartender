const express = require('express');
const router = express.Router();

const logger = require('../../logger');
const machine_lib = require('../../lib/machine');


var io = undefined;

const init = (socket_io) => {
  io = socket_io;
};

router.get('/report/:machinekey', (req, res) => {
  if(req.params.machinekey) {
    machine_lib.reportMachine(req.params.machinekey)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(400);
  }
});


module.exports = { 
  router,
  init
};