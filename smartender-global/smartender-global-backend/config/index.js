require('dotenv').load();

const db = require('./db');
const general = require('./general');

module.exports = {
    db,
    general
}