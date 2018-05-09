const express = require('express');
const router = express.Router();

const logger = require('../logger');

const google = require('../lib/google');

router.get('/loginurl', (req, res) => {
  res.end(JSON.stringify({
    authurl: google.getAuthUrl()
  }));
});

router.use('/oauthcallback', (req, res) => {
  logger.log(JSON.stringify(req.params));
});



module.exports = router;