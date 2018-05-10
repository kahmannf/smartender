const express = require('express');
const router = express.Router();

const logger = require('../../logger');

const user = require('../../lib/user');

router.get('/by-register-key/:key', (req, res) => {

  var key = req.params.key;
  if(key) {
    user.getByRegisterkey(key)
    .then(user => {
      if(user) {
        res.json(user);
      } 
      else {
        res.status('400').end('Invalid key')
      }
    })
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
    });
  }
  else {
    res.status(400).end('No \'key\' parameter');
  }
  
});


module.exports = router;