'use strict';
module.exports = {
  hash_algorithm: process.env.HASH_ALGORITHM,
  salt_length: 50,
  secret: process.env.SECRET,
  tokenttl: process.env.TOKENTTL
}