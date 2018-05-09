const express = require('express');
const router = express.Router();

const logger = require('../logger');

//log incomming requests
router.use((req, res, next) => {
  logger.log(`${req.method} ${req.url}`);
  next();
});


module.exports = router;