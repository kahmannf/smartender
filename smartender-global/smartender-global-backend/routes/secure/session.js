const express = require('express');
const router = express.Router();

const logger = require('../../logger');

const session = require('../../lib/session');

router.get('/mine', (req, res) => {
  session.getUserSessions(req.oauth.payload.id)
  .then(userSessions => {
    res.json(userSessions);
  })
  .catch(err => {
    logger.error(err, 500);
    res.sendStatus(500);
  });
});


router.post('/new', (req, res) => {
  if(req.body.machine_id && req.body.user_id && req.body.name) {
    session.createSession(req.body.machine_id, req.body.user_id, req.body.name)
    .then(result => res.json(result))
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(400);
  }
});


module.exports = router;