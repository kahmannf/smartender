'use strict';
const db = require('./db');
const logger = require('../logger');
const MachineManager = require('./machine_manager');

var socketIo = undefined;
var machineManager = undefined;


const initSockets = (io) => {
  socketIo = io;
  machineManager = new MachineManager(io);
}

const isUserOwner = (machine_id, user_id) => {
  return new Promise((resolve, reject) => {
    var sql = "select * from machine where owner_id = ? and id = ?";
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
        if(row) {
          getPortData(row.port_start, row.port_end)
          .then(ports => {
            row.ports = ports;

            fillLiveData(row)
            .then(result => {
              resolve(result);
            })
            .catch(err => {
              logger.error(err);
              resolve(row);
            })
          })
          .catch(err => {
            logger.error(err);
            resolve(row);
          })
        } else {
          resolve(undefined);
        }
      }
    });
  });
}

const getPortData = (portstart, portend) => {
  return new Promise((resolve, reject) => {
    if(portstart <= portend) {
      var result = [];
      
      for(var i = portstart; i <= portend; i++) {
        result.push({
          id: i
        });
      }

      resolve(result);
    } else {
      resolve([]);
    }
  });
}

const getMachineById = (id) => {
  return new Promise((resolve, reject) => {
    var sql = "select id, name, owner_id, port_start, port_end from machine where id = ?";
    var params = [id];

    db.get(sql, params, (err, row) => {
      if(err) {
        reject(err);
      } else {
        if(row) {
          getPortData(row.port_start, row.port_end)
          .then(ports => {
            row.ports = ports;

            fillLiveData(row)
            .then(result => {
              resolve(result);
            })
            .catch(err => {
              logger.error(err);
              resolve(row);
            })
          })
          .catch(err => {
            logger.error(err);
            resolve(row);
          })
        } else {
          resolve(undefined);
        }
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

const fillLiveData = (machine) => {
  return new Promise((resolve, reject) => {
    if (machine) {
      machineManager.isAvailable(machine.id)
      .then(available => {
        machine.isAvailable = available;
      
        if(!machine.isAvailable && machine.ports) {
          for(var i = 0; i < machine.ports.length; i++) {
            machine.ports[i].blockReasons = machineManager.getBlockedPortReasons(
              machine.id, 
              machine.ports[i].id);
          }
        }
      })
      .catch(err => {
        machine.isAvailable = false;  
      });

      resolve(machine);
    } else {
      resolve(undefined);
    }
  });
}

const fillLivaDataMulti = (machines) => {
  return new Promise((resolve, reject) => {
    if(machines && machines.length) {
      var expected = machines.length;
      var current = 0;
      var result = [];

      for (var i = 0; i < machines.length; i++) {
        fillLiveData(machines[i])
        .then(machine => {
          result.push(machine);
          current++;

          if(current === expected) {
            resolve(result);
          }
        })
        .catch(err => {
          logger.error(err);
          current++;
          
          if(current === expected) {
            resolve(result);
          }
        });
      }

    } else {
      resolve([]);
    }
  });
}

module.exports = {
  initSockets,
  isUserOwner,
  getUserMachines,
  getMachineById,
  getMachineByKey,
  registerMachine
}