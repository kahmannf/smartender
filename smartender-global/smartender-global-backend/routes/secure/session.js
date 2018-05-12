const express = require('express');
const router = express.Router();

const logger = require('../../logger');

const session = require('../../lib/session');

var io = undefined;

const init = (socket_io) => {
  io = socket_io;
};


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
  if(req.body.machine_id && req.body.name) {
    session.createSession(req.body.machine_id, req.oauth.payload.id, req.body.name)
    .then(result => { 
      
      if(result.operation_result.success) {
        session.setActiveSession(result.session_id, req.oauth.payload.id)
        .then(something => {
          console.log(JSON.stringify(result));
          io.emit('user ' + req.oauth.payload.id + ' sessions', 'Yay!');
          res.json(result.operation_result);
        })
        .catch(err => {
          res.json(result.operation_result);
        });
      } else {
        res.json(result.operation_result);
      }
    })
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(400);
  }
});

router.post('/set-active/:id', (req, res) => {
  if(req.params.id) {
    session.setActiveSession(req.params.id, req.oauth.payload.id)
    .then(result => {
      io.emit('user ' + req.oauth.payload.id + ' sessions', 'Yay!');
      
      res.json(result);
    })
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(400);
  }
})

router.get('/by-id/:id', (req, res) => {
  if(req.params.id) {
    session.getSessionById(req.params.id, req.oauth.payload.id)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
    })
  }
  
});

router.post('/set-state/:session_id/:state', (req, res) => {
  if(req.params.state && req.params.session_id) {
    session.setSessionActiveState(req.params.session_id, req.params.state, req.oauth.payload.id)
    .then(result => { 
      res.json(result);
      io.emit('session ' + req.params.session_id, 'HeyHeyHey!'); 

      session.getUserUpdateIds(req.params.session_id)
      .then(idArray => {
        for(var i = 0; i < idArray.length; i++) {
          io.emit('user ' + idArray[i].id + ' sessions', 'HeyHeyHey!');
        }
      })
      .catch(err => logger.error(err, 500));
    })
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(400);
  }
})

module.exports = { router, init };