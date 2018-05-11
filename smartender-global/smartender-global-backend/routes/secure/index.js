const express = require('express');
const router = express.Router();

const user = require('./user');
const session = require('./session');

const auth_lib = require('../../lib/auth');


//decode oauth token
router.use(auth_lib.decodeToken);

//from here on only verified request. 
//will respond with a 401 for invalid request/tokens
router.use(auth_lib.requireAuth);

router.use((req, res, next) => {
  next();
});

router.use('/user', user);
router.use('/session', session);

module.exports = router;