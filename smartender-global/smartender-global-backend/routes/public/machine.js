const express = require('express');
const router = express.Router();

const machine = require('../../lib/machine');
const logger = require('../../logger');

router.get('/report/:machinekey', (req, res) => {
  if(req.params.machinekey) {
    machine.reportMachine(req.params.machinkey)
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

module.exports = router;