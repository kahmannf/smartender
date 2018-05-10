const express = require('express');
const router = express.Router();

const logger = require('../logger');

const public = require('./public');
const secure = require('./secure');

//log incomming requests
router.use((req, res, next) => {
  logger.log(`${req.method} ${req.url}`, 1000);
  next();
});


router.use('/public', public);
router.use('/secure', secure);

module.exports = router;