'use strict';
require('dotenv').load();

const db = require('./db');
const general = require('./general');
const google = require('./google');

module.exports = {
  db,
  general,
  google
}