'use strict';

var utils = require('../utils/writer.js');
var Data = require('../service/DataService');

module.exports.drinksGET = function drinksGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Data.drinksGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.drinksIdGET = function drinksIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Data.drinksIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.ingredientGET = function ingredientGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Data.ingredientGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.ingredientIdGET = function ingredientIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Data.ingredientIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.meGET = function meGET (req, res, next) {
  Data.meGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userMachinesGET = function userMachinesGET (req, res, next) {
  Data.userMachinesGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
