const express = require('express');
const router = express.Router();

const config = require('../../config');
const logger = require('../../logger');

const user = require('../../lib/user');
const auth = require('../../lib/auth');
const email = require('../../lib/email');

router.post('/register', (req, res) => {
  
  user.isAliasAndEmailAvailable(req.body.email, req.body.alias)
  .then(result => {
    if(result.available) {
      return user.createUser(req.body.email, req.body.alias);
    }
    else {
      var message = '';
      if(result.alias && result.message) {
        message += "Both alias and email are already in use!";
      }
      else if (result.alias) {
        message += `Alias \'${req.body.alias}\' is already in use!`;
      }
      else {
        message += `Email \'${req.body.email}\' is already in use!`;
      }

      res.end({
        success: false,
        message
      });
    }
  })
  .then((created_user) => {
    email.registrationmail(user);
    res.end({
      success: true
    });
  })
  .catch(err => {
    logger.error(err, 500);
    
    res.sendStatus(500);
  })
});

router.post('/activate', (req, res) => {
  if(req.body.password && req.body.registerkey && req.body.id) {
    user.activateUser(req.body)
    .then(() => res.end())
    .catch(err => {
      logger.error(err, 500);
      
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(400);
  }
});

router.post('/login', (req, res) => {
  if(req.body.email && req.body.password) {
    user.getForLogin(req.body.email)
    .then(pw_user => {
      if(auth.verifyPassword(req.body.password, pw_user.hash, pw_user.salt)){
        user.getForTokenPayload(req.body.id)
        .then(token_user => {

        res.json({ token: auth.getToken(token_user), user: token_user });

        })
        .catch(err => {
          logger.error(err, 500);
          res.sendStatus(500);
        });
      }
      else {
        res.sendStatus(401);
      }
    })
    .catch(err => {
      if(err) {
        logger.error(err, 500);
        res.sendStatus(500);
      }
      else {
        res.sendStatus(401); //unauthorized, either wrong email or password
      }
    })
  }
  else {
    res.sendStatus(400);
  }
});


module.exports = router;