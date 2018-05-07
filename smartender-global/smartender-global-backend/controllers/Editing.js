'use strict';

var utils = require('../utils/writer.js');
var Editing = require('../service/EditingService');

module.exports.drinksDeleteIdDELETE = function drinksDeleteIdDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
  Editing.drinksDeleteIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.drinksNewPUT = function drinksNewPUT (req, res, next) {
  var drink = req.swagger.params['drink'].value;
  Editing.drinksNewPUT(drink)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.drinksUpdatePUT = function drinksUpdatePUT (req, res, next) {
  var drink = req.swagger.params['drink'].value;
  Editing.drinksUpdatePUT(drink)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.ingredientNewPUT = function ingredientNewPUT (req, res, next) {
  var ingredient = req.swagger.params['ingredient'].value;
  Editing.ingredientNewPUT(ingredient)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.ingredientUpdatePUT = function ingredientUpdatePUT (req, res, next) {
  var ingredient = req.swagger.params['ingredient'].value;
  Editing.ingredientUpdatePUT(ingredient)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
