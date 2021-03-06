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

router.post('/by-id-array', (req, res) => {
  if(req.body.ids && req.body.ids.length) {
    (new Promise((resolve, reject) => {
      var expected = req.body.ids.length;
      var current = 0;
      
      var result = [];

      for(var i = 0; i < expected; i++) {
        user.getById(req.body.ids[i])
        .then(user => {
          result.push(user);
          current++;

          if(current == expected) {
            resolve(result);
          }
        })
        .catch(err => {
          logger.error(err, 500);
          current++;
          if(current == expected) {
            resolve(result);
          }
        })
      }
    }))
    .then(users => res.json(users))
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(400);
  }
})

router.get('/my-invites', (req, res) => {
  user.getInvites(req.oauth.payload.id)
  .then(invites => res.json(invites))
  .catch(err => {
    logger.error(err, 500);
    res.sendStatus(500);
  });
});

router.get('/search-for-session', (req, res) => {
  
  if(!req.query.sessionid) {
    res.sendStatus(400);
  } else {

    var offset = 0;

    if(req.query.offset) {
      offset = req.query.offset;
    }

    var limit = 20;

    if(req.query.limit) {
      limit = req.query.limit;
    }

    user.searchForSession(req.query.sessionid,
                          limit, 
                          offset, 
                          req.query.search, 
                          req.oauth.payload.id)
    .then(users => res.json(users))
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
    });
  }
});

module.exports = router;