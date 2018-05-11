const express = require('express');
const router = express.Router();

const logger = require('../../logger');

const user = require('../../lib/user');
const machine = require('../../lib/machine');

router.get('/current', (req, res) => {
  res.json(req.oauth.payload);
});

router.get('/my-machines', (req, res) => {
  machine.getUserMachines(req.oauth.payload.id)
  .then(machines => res.json(machines))
  .catch(err => {
    logger.error(err, 500);
    res.sendStatus(500);
  });
});

router.post('/register-machine', (req, res) => {
  if(req.body.machinekey && req.body.name) {
    machine.registerMachine(req.oauth.payload.id, req.body.machinekey, req.body.name)
    .then(result => res.json(result))
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
    });
  } else {
    res.status(400).end('No machinekey/name parameter provided');
  }
})

module.exports = router;