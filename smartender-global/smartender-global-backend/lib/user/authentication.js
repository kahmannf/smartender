'use strict';
const crypto = require('crypto');

const config = require('../../config');

const createHash = (password, salt) => {
  var hash = crypto.createHmac(config.security.hash_algorithm, salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return value;
};

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
const genRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex') /** convert to hexadecimal format */
          .slice(0,length);   /** return required number of characters */
};

const getNewSalt = () => genRandomString(config.security.salt_length);

const validatePassword = (password, hash, salt) => {
  var newHash = createHash(password, salt);

  if(hash.length != newHash.length) {
    return false;
  }
  else {
    var valid = true;

    for(var i = 0; i < hash.length; i++) {
      if(hash[i] != newHash[i]) {
        valid = false;
      }
    }

    return valid;
  }

};

module.exports = {
  createHash,
  getNewSalt,
  validatePassword
}