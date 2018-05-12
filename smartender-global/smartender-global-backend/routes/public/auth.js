const express = require('express');
const router = express.Router();

const config = require('../../config');
const logger = require('../../logger');

const user = require('../../lib/user');
const auth = require('../../lib/auth');
const email = require('../../lib/email');

router.post('/register', (req, res) => {
  
  user.isAliasAndEmailAvailable(req.body.alias, req.body.email)
  .then(result => {
    if(result.available) {
      return user.createUser(req.body.alias, req.body.email);
    }
    else {
      var message = '';
      if(result.alias && result.email) {
        message += "Both alias and email are already in use!";
      }
      else if (result.alias) {
        message += `Alias \'${req.body.alias}\' is already in use!`;
      }
      else {
        message += `Email \'${req.body.email}\' is already in use!`;
      }

      res.json({
        success: false,
        message
      });
    }
  })
  .then((created_user) => {
    if(created_user) {
      email.registrationmail(created_user);
      res.json({
        success: true
      });
    } else {
      //whatever
    }
  })
  .catch(err => {
    logger.error(err, 500);
    
    res.sendStatus(500);
  })
});

router.post('/activate', (req, res) => {
  if(req.body.password && req.body.registerkey && req.body.id) {
    user.activateUser(req.body)
    .then(() => res.json(true))
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
        user.getForTokenPayload(req.body.email)
        .then(token_user => {

        res.json({ token: auth.getToken(token_user), user: token_user });

        })
        .catch(err => {
          if(err) {
            logger.error(err, 500);
            res.sendStatus(500);
          } else {
            res.sendStatus(401);
          }
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