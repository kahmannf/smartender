const express = require('express');
const router = express.Router();

const auth = require('./auth');
const user = require('./user');
const machine = require('./machine');

router.use('/auth', auth);
router.use('/user', user);
router.use('/machine', machine);


module.exports = router;