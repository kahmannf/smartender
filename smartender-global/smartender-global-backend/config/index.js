'use strict';
require('dotenv').load();

const db = require('./db');
const general = require('./general');
const email = require('./email');
const machine = require('./machine');
const security = require('./security');

module.exports = {
  db,
  email,
  general,
  machine,
  security
}