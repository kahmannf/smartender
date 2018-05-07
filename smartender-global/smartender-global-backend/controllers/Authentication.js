'use strict';

var utils = require('../utils/writer.js');
var Authentication = require('../service/AuthenticationService');

module.exports.loginPOST = function loginPOST (req, res, next) {
  var loginform = req.swagger.params['loginform'].value;
  var password = req.swagger.params['password'].value;
  Authentication.loginPOST(loginform,password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.logoutPOST = function logoutPOST (req, res, next) {
  Authentication.logoutPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
