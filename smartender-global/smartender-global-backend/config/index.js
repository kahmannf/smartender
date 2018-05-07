'use strict';
require('dotenv').load();

const db = require('./db');
const general = require('./general');
const security = require('./security');

module.exports = {
  db,
  general,
  security
}