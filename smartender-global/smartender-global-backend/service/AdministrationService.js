'use strict';


/**
 *
 * machinekey String unique key associated with the machine
 * no response value expected for this operation
 **/
exports.machinesAssociateDELETE = function(machinekey) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * machinekey String unique key associated with the machine
 * no response value expected for this operation
 **/
exports.machinesAssociatePOST = function(machinekey) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * machineid Integer the id of the machine htat this operation will be executed for
 * no response value expected for this operation
 **/
exports.machinesMachineidClearslotPOST = function(machineid) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * machineid Integer the id of the machine htat this operation will be executed for
 * no response value expected for this operation
 **/
exports.machinesMachineidClose_allPOST = function(machineid) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * machineid Integer the id of the machine htat this operation will be executed for
 * ingredientid Integer id of the ingredient that ill be put in the slot
 * no response value expected for this operation
 **/
exports.machinesMachineidFillslotPOST = function(machineid,ingredientid) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * machineid Integer the id of the machine htat this operation will be executed for
 * state Boolean the state the slot should be set to
 * no response value expected for this operation
 **/
exports.machinesMachineidSetslot_statePOST = function(machineid,state) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * creates a new session for the logged-in user and the specified machine
 *
 * machine Integer id of the machine for this session
 * returns Session
 **/
exports.sessionsCreatePOST = function(machine) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "owner" : {
    "alias" : "alias",
    "id" : 0
  },
  "machine" : {
    "owner" : {
      "alias" : "alias",
      "id" : 0
    },
    "name" : "name",
    "id" : 6
  },
  "guid" : "guid",
  "active" : true
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * returns List
 **/
exports.sessionsCurrentGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "owner" : {
    "alias" : "alias",
    "id" : 0
  },
  "machine" : {
    "owner" : {
      "alias" : "alias",
      "id" : 0
    },
    "name" : "name",
    "id" : 6
  },
  "guid" : "guid",
  "active" : true
}, {
  "owner" : {
    "alias" : "alias",
    "id" : 0
  },
  "machine" : {
    "owner" : {
      "alias" : "alias",
      "id" : 0
    },
    "name" : "name",
    "id" : 6
  },
  "guid" : "guid",
  "active" : true
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * deletes the specified session. Logged-in user must be the owner
 *
 * session String guid of the session to delete
 * no response value expected for this operation
 **/
exports.sessionsDeleteDELETE = function(session) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * invite a user to a session
 *
 * userid Integer 
 * sessionid Integer 
 * canEditMachine Boolean if set to true, the user will be able to perform operations like setting slot values or ingredients (optional)
 * no response value expected for this operation
 **/
exports.sessionsInvitePOST = function(userid,sessionid,canEditMachine) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * join a session. A pending invite is required for that
 *
 * guid String global unique identifier of the session to join
 * no response value expected for this operation
 **/
exports.sessionsJoinPOST = function(guid) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * kicks a user from a session
 *
 * userid Integer 
 * sessionid Integer 
 * no response value expected for this operation
 **/
exports.sessionsKickPOST = function(userid,sessionid) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * leave a session. You have to be part of the session to leave
 *
 * guid String global unique identifier of the session to leave
 * no response value expected for this operation
 **/
exports.sessionsLeavePOST = function(guid) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * deactivates a session
 *
 * sessionid String guid of the session to pause
 * no response value expected for this operation
 **/
exports.sessionsPausePOST = function(sessionid) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

