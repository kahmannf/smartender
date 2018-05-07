'use strict';
const db = require('../db');

const getByLogin = (login) => new Promise((resolve, reject) => {
  var sql = 'select * from user where lower(login) like lower(?)';
  var params = [login];

  db.get(sql, params, (err, row) => {
    if(err) {
      reject(err);
    }
    else if (row){
      resolve(row);
    }
    else {
      reject('No user with that login value');
    }
  });
});

module.exports = {
    getByLogin   
}