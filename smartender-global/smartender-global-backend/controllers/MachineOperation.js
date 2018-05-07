'use strict';

var utils = require('../utils/writer.js');
var MachineOperation = require('../service/MachineOperationService');

module.exports.orderPOST = function orderPOST (req, res, next) {
  var order = req.swagger.params['order'].value;
  MachineOperation.orderPOST(order)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
