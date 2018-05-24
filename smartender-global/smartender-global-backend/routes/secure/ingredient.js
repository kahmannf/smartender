'use strict';
const express = require('express');
const router = express.Router();

const drink = require('../../lib/drink');
const logger = require('../../logger');


router.get('/search', (req, res) => {
  
  var offset = 0;

  if(req.query.offset) {
    offset = req.query.offset;
  }

  var limit = 20;

  if(req.query.limit) {
    limit = req.query.limit;
  }

  drink.searchIngredient(limit, offset, req.query.search)
  .then(result => res.json(result))
  .catch(err => {
    logger.error(err, 500);
    res.sendStatus(500);
  })
  
});

router.post('/add', (req, res) => {
  drink.addIngredient(req.body, req.oauth.payload.id)
  .then(result => res.json(result))
  .catch(err => {
    logger.error(err, 500);
    res.sendStatus(500);
  });
})

module.exports = router;