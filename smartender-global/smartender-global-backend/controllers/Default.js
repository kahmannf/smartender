'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.logoutPOST = function logoutPOST (req, res, next) {
  Default.logoutPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
