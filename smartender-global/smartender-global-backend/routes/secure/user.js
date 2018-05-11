const express = require('express');
const router = express.Router();

const logger = require('../../logger');

const user = require('../../lib/user');

router.get('/current', (req, res) => {
  res.json(req.oauth.payload);
});

module.exports = router;