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

router.post('/invite/:sessionid/:userid', (req, res) => {
  if(req.params.sessionid && req.params.userid) {
    
    session.inviteUser(req.oauth.payload.id, req.params.userid, req.params.sessionid)
    .then(result => {
      res.json(result)
      io.emit('invites ' + req.params.userid, 'come in!');
    })
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
    })

  } else {
    res.sendStatus(400);
  }
});

router.post('/accept-invite/:sessionid', (req, res) => {

  if(req.params.sessionid) {
    session.acceptInvite(req.params.sessionid, req.oauth.payload.id)
    .then(result => {
      res.json(result);

      if(result && result.success) {
        io.emit('invites ' + req.oauth.payload.id);
        io.emit('session ' + req.params.sessionid);
        io.emit('user ' + req.oauth.payload.id + ' sessions');
      }
      
    })
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(400);
  }
})

router.post('/decline-invite/:sessionid', (req, res) => {

  if(req.params.sessionid) {
    session.declineInvite(req.params.sessionid, req.oauth.payload.id)
    .then(result => {
      res.json(result);

      if(result && result.success) {
        io.emit('invites ' + req.oauth.payload.id);
      }
      
    })
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(400);
  }
})

router.post('/delete/:id', (req, res) => {
  if(req.params.id) {
    session.deleteSession(req.params.id, req.oauth.payload.id)
    .then(result => {
      res.json(result);
      io.emit('session ' + req.params.id);
      io.emit('user ' + req.oauth.payload.id + ' sessions');
    })
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
      io.emit('session ' + req.params.id);
    });
  } else {
    res.status(400);
  }
});

router.post('/leave/:id', (req, res) => {
  if(req.params.id) {
    session.leaveSession(req.oauth.payload.id, req.params.id)
    .then(result => {
      res.json(result);
      io.emit('session ' + req.params.id);
      io.emit('user ' + req.oauth.payload.id + ' sessions');
    })
    .catch(err => {
      logger.error(err, 500);
      res.sendStatus(500);
      io.emit('session ' + req.params.id);
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = { router, init };