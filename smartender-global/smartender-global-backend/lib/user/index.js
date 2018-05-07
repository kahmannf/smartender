'use strict';
const jwt = require('jsonwebtoken');

const config = require('../../config');

const db_user = require('./db');
const logic = require('./logic');
const auth = require('./authentication');

const getBasicToken = (login, password) => new Promise((resolve, reject) => {
  db_user.getByLogin(login).then(user => {
    if(auth.validatePassword(password, user.hash, user.salt)) {
      resolve(jwt.sign({alias: user.alias, id: user.id}, config.security.secret, { expiresIn: config.security.tokenttl }));
    }

  }).catch(reject);
});

module.exports = {
  getBasicToken
}