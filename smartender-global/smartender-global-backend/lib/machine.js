'use strict';
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

const getMachineByKey = (machinekey) => {
  return new Promise((resolve, reject) => {
    var sql = "select * from machine where machinekey = ?";
    var params = [machinekey];

    db.get(sql, params, (err, row) => {
      if(err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

const getMachineById = (id) => {
  return new Promise((resolve, reject) => {
    var sql = "select id, name, owner_id from machine where id = ?";
    var params = [id];

    db.get(sql, params, (err, row) => {
      if(err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}


const registerMachine = (user_id, machinekey, name) => {
  return new Promise((resolve, reject) => {
    getMachineByKey(machinekey)
    .then(machine => {
      if(machine && !machine.owner_id) {
        var sql = "update machine set owner_id = $ownerid, name = $name where machinekey = $machinekey";
        var params =  {
          $ownerid: user_id,
          $name: name,
          $machinekey: machinekey
        };
         
        db.run(sql, params, err => {
          if(err) {
            reject(err);
          } else {
            resolve({
              success: true
            })
          }
        });
      } else {
        resolve({
          success: false,
          message: 'Invalid machine key'
        })
      }
    })
    .catch(err => reject(err));
  });
}

module.exports = {
  isUserOwner,
  getUserMachines,
  getMachineById,
  getMachineByKey,
  registerMachine
}