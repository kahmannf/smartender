const db = require('./db');

const isUserOwner = (machine_id, user_id) => {
  return new Promise((resolve, reject) => {
    var sql = "select * from machine where user_id = ? and id = ?";
    var params = [user_id, machine_id];

    db.get(sql, params, (err, row) => {
      if(err) {
        reject(err);
      } else if (row) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

const getUserMachines = (user_id) => {
  return new Promise((resolve, reject) => {
    var sql = "select name, id, owner_id from machine where owner_id = ?";
    var params = [user_id];

    db.all(sql, params, (err, rows) => {
      if(err) {
        reject(err);
      } else {
        resolve(rows);
      } 
    });
  });
}

module.exports = {
  isUserOwner,
  getUserMachines
}