const express = require('express');
const router = express.Router();

const user = require('./user');
const session = require('./session');
const machine = require('./machine');

const auth_lib = require('../../lib/auth');

const init = (io) => {
  session.init(io)
  machine.init(io);
};


//decode oauth token
router.use(auth_lib.decodeToken);

//from here on only verified request. 
//will respond with a 401 for invalid request/tokens
router.use(auth_lib.requireAuth);

router.use((req, res, next) => {
  next();
});

router.use('/user', user);
router.use('/session', session.router);
router.use('/machine', machine.router);

module.exports = { router, init };