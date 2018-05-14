const logger = require('../logger');

// example = {
// machineid: {
//     portid: [operation1, operation2]
//   }
// }
//
class MachineManager {
  constructor(io) {
    if(!MachineManager.instance) {
      this.blockedMachines = {};
      this.operations = Object.freeze(['maintenance', 'cleaning', 'mixing']);
      
      this.io = io;
      
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
        triggerUpdateMachine(machineid);
        return;
      }
    } else { // machine doesnt exist in array
      var machine = {};
      machine[portid] = [operation];
      this.blockedMachines[machineid] = machine;
      triggerUpdateMachine(machineid);
      return;
    }
  }

  releasePort(machineid, portid, operation) {
    if(this.blockedMachines[machineid] && this.blockedMachines[machineid][portid]) {
      if(this.blockedMachines[machineid][portid].includes(operation)) {
        var array = this.blockedMachines[machineid][portid].splice(this.blockedMachines[machineid][portid].indexOf(operation), 1);
        if(array.length) {
          this.blockedMachines[machineid][portid] = array;
        } else {
          delete this.blockedMachines[machineid][portid];

          if(!Object.keys(this.blockedMachines[machineid]).length) {
            delete this.blockedMachines[machineid];
            triggerUpdateMachine(machineid);
          }
        }
      }
    }
  }

  isAvailable (machineid) {
    return new Promise((resolve, reject) => { 
      var blocked = (this.blockedMachines[machineid]);
      
      if(blocked) {
        resolve(false);
      } else {
        // Todo: trigger live update here
        resolve(true);
      }
    });
  }

  getBlockedPortReasons(machineid, portid) {
    if(this.blockedMachines[machineid] && this.blockedMachines[machineid][portid]) {
      return this.blockedMachines[machineid][portid];
    } else {
      return undefined;
    }
  }
}

module.exports = MachineManager; 

