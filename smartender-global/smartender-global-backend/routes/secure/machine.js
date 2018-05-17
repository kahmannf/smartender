const express = require('express');
const router = express.Router();

const logger = require('../../logger');

const machine = require('../../lib/machine');

const config = require('../../config');

var io = undefined;

const init = (socketIO) => {
  machine.initSockets(socketIO);
  io = socketIO;
}

router.get('/by-id/:id', (req, res) => {
  if(req.params.id) {
    machine.getMachineById(req.params.id)
    .then(mach => {
      if(mach.owner_id !== req.oauth.payload.id) {
        res.status(401).send('You are not the owner of this machine!');
      } else {
        res.json(mach);
      }
    })
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
    });
  } else {
    res.status(400).end('no id parameter');
  }
})

module.exports = { 
  init,
  router
}