const express = require('express');
const router = express.Router();

const logger = require('../logger');

const auth = require('./auth');

//log incomming requests
router.use((req, res, next) => {
  logger.log(`${req.method} ${req.url}`);
  next();
});

router.use('/auth', auth);

module.exports = router;