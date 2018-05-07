'use strict';

var utils = require('../utils/writer.js');
var Administration = require('../service/AdministrationService');

module.exports.machinesAssociateDELETE = function machinesAssociateDELETE (req, res, next) {
  var machinekey = req.swagger.params['machinekey'].value;
  Administration.machinesAssociateDELETE(machinekey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.machinesAssociatePOST = function machinesAssociatePOST (req, res, next) {
  var machinekey = req.swagger.params['machinekey'].value;
  Administration.machinesAssociatePOST(machinekey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.machinesMachineidClearslotPOST = function machinesMachineidClearslotPOST (req, res, next) {
  var machineid = req.swagger.params['machineid'].value;
  Administration.machinesMachineidClearslotPOST(machineid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.machinesMachineidClose_allPOST = function machinesMachineidClose_allPOST (req, res, next) {
  var machineid = req.swagger.params['machineid'].value;
  Administration.machinesMachineidClose_allPOST(machineid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.machinesMachineidFillslotPOST = function machinesMachineidFillslotPOST (req, res, next) {
  var machineid = req.swagger.params['machineid'].value;
  var ingredientid = req.swagger.params['ingredientid'].value;
  Administration.machinesMachineidFillslotPOST(machineid,ingredientid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.machinesMachineidSetslot_statePOST = function machinesMachineidSetslot_statePOST (req, res, next) {
  var machineid = req.swagger.params['machineid'].value;
  var state = req.swagger.params['state'].value;
  Administration.machinesMachineidSetslot_statePOST(machineid,state)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.sessionsCreatePOST = function sessionsCreatePOST (req, res, next) {
  var machine = req.swagger.params['machine'].value;
  Administration.sessionsCreatePOST(machine)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.sessionsCurrentGET = function sessionsCurrentGET (req, res, next) {
  Administration.sessionsCurrentGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.sessionsDeleteDELETE = function sessionsDeleteDELETE (req, res, next) {
  var session = req.swagger.params['session'].value;
  Administration.sessionsDeleteDELETE(session)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.sessionsInvitePOST = function sessionsInvitePOST (req, res, next) {
  var userid = req.swagger.params['userid'].value;
  var sessionid = req.swagger.params['sessionid'].value;
  var canEditMachine = req.swagger.params['canEditMachine'].value;
  Administration.sessionsInvitePOST(userid,sessionid,canEditMachine)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.sessionsJoinPOST = function sessionsJoinPOST (req, res, next) {
  var guid = req.swagger.params['guid'].value;
  Administration.sessionsJoinPOST(guid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.sessionsKickPOST = function sessionsKickPOST (req, res, next) {
  var userid = req.swagger.params['userid'].value;
  var sessionid = req.swagger.params['sessionid'].value;
  Administration.sessionsKickPOST(userid,sessionid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.sessionsLeavePOST = function sessionsLeavePOST (req, res, next) {
  var guid = req.swagger.params['guid'].value;
  Administration.sessionsLeavePOST(guid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.sessionsPausePOST = function sessionsPausePOST (req, res, next) {
  var sessionid = req.swagger.params['sessionid'].value;
  Administration.sessionsPausePOST(sessionid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
