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

module.exports = router;