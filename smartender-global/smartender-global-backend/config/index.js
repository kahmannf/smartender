'use strict';
require('dotenv').load();

const db = require('./db');
const general = require('./general');
const email = require('./email');
const security = require('./security');

module.exports = {
  db,
  email,
  general,
  security
}