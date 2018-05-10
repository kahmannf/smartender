const express = require('express');
const router = express.Router();

const user = require('./user');

const auth_lib = require('../../lib/auth');

//decode oauth token
router.use(auth_lib.decodeToken);

//from here on only verified request. 
//will respond with a 401 for invalid request/tokens
router.use(auth_lib.requireAuth);

router.use('/user', user);


module.exports = router;