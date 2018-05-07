'use strict';
const config = require('../config');
module.exports = new (require('sqlite3')).Database(config.db.dbfile_name);