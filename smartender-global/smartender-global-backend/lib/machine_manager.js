const logger = require('../logger');

// example = {
// machineid: {
//     portid: [operation1, operation2]
//   }
// }
//
class MachineManager {
  getTimeStamp() {
    return Date.now() / 1000 | 0;
  }

  constructor(machine_lib, io) {
    if(!MachineManager.instance) {
      this.registeredMachines = {};
      this.blockedMachines = {};

      this.machine_lib = machine_lib;

      this.operations = Object.freeze(['maintenance', 'cleaning', 'mixing']);
      
      this.io = io;
      
      this.timerObj = setInterval(() => {
        var machinekeys = Object.keys(this.registeredMachines);
        
        var timestamp = this.getTimeStamp()

        logger.log('Starting machine cleanup with ' + machinekeys.length + ' machines at '  + timestamp, 10010);

        for(var i = 0; machinekeys && i < machinekeys.length; i++) {
          //if timestamp is older than 20 seconds delete machine from active machines
          if(this.registeredMachines[machinekeys[i]] < timestamp - 20) {
            logger.log('Deleted machine: ' + machinekeys[i], 10005);
            delete this.registeredMachines[machinekeys[i]];
            this.machine_lib.getMachineByKey(machinekeys[i])
            .then(machine => {
              this.triggerUpdateMachine(machine.id);
            })
            .catch(err => {
              logger.error(err, 500);
            })
          }
        }

        logger.log('Finished machine cleanup with ' + Object.keys(this.registeredMachines).length + ' machines at '  + timestamp, 10010);

      }, 10000);

      MachineManager.instance = this;
    }

    return MachineManager.instance;
  }

  triggerUpdateMachine(machineid) {
    this.io.emit('machine ' + machineid);
  }

  blockPort(machineid, portid, operation) {
    if(!this.operations.includes(operation))
    throw new Error('Invalid operation: ' + operation);
    if(this.blockedMachines[machineid]) { //machine exists
      if(this.blockedMachines[machineid][portid] && this.blockedMachines[machineid][portid].length) {
        // machine-port has array
        if(this.blockedMachines[machineid][portid].includes(operation)) {
          return;
        } else {
          this.blockedMachines[machineid][portid].push(operation);
          return;
        }
      } else { // machineport has no array
        this.blockedMachines[machineid][portid] = [operation];
        this.triggerUpdateMachine(machineid);
        return;
      }
    } else { // machine doesnt exist in array
      var machine = {};
      machine[portid] = [operation];
      this.blockedMachines[machineid] = machine;
      this.triggerUpdateMachine(machineid);
      return;
    }
  }

  releasePort(machineid, portid, operation) {
    if(this.blockedMachines[machineid] && this.blockedMachines[machineid][portid]) {
      if(this.blockedMachines[machineid][portid].includes(operation)) {
        
        this.blockedMachines[machineid][portid].splice(this.blockedMachines[machineid][portid].indexOf(operation), 1);
        
        if(this.blockedMachines[machineid][portid].length) {
          this.blockedMachines[machineid][portid] = array;
        } else {
          delete this.blockedMachines[machineid][portid];

          if(!Object.keys(this.blockedMachines[machineid]).length) {
            delete this.blockedMachines[machineid];
            this.triggerUpdateMachine(machineid);
          }
        }
      }
    }
  }

  isPortAvailable(machineid, portid) {
    return new Promise((resolve, reject) => {
      
      this.machine_lib.convertIdIntoKey(machineid)
      .then(machinekey => {

        if(!this.registeredMachines[machinekey]) {
          resolve(false);
        } else {
          var blocked = (this.blockedMachines[machineid] && this.blockedMachines[machineid][portid]);
      
          if(blocked) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      })
      .catch((err) => reject(err));
    });
  }

  isAvailable (machineid) {
    return new Promise((resolve, reject) => {
      
      this.machine_lib.convertIdIntoKey(machineid)
      .then(machinekey => {

        if(!this.registeredMachines[machinekey]) {
          resolve(false);
        } else {
          var blocked = (this.blockedMachines[machineid]);
      
          if(blocked) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      })
      .catch((err) => reject(err));
    });
  }

  getBlockedPortReasons(machineid, portid) {
    if(this.blockedMachines[machineid] && this.blockedMachines[machineid][portid]) {
      return this.blockedMachines[machineid][portid];
    } else {
      return undefined;
    }
  }

  registerMachine(machinekey) {
    return new Promise((resolve, reject) => {
      if(this.registeredMachines[machinekey]) {
        //update timestamp
        this.registeredMachines[machinekey] = this.getTimeStamp();
        resolve();
      } else {
        this.machine_lib.getMachineByKey(machinekey)
        .then(machine => {
          if(!machine) {
            reject('no machine for key:' + machinekey);
          } else {
            
            //set timestamp
            this.registeredMachines[machinekey] = this.getTimeStamp();
            logger.log('Registered machine: ' + machinekey, 10005);
            //cleanup remaining blocks
            if(this.blockedMachines[machine.id]) {
              delete this.blockedMachines[machine.id];
            }

            this.triggerUpdateMachine(machine.id);
            
            resolve();
          }
        })
        .catch(err => reject(err));
      }
    });
  }
}

module.exports = MachineManager; 

