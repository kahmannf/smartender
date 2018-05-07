'use strict';


/**
 * gets drinks limited by paging
 *
 * offset Integer page-number, starting at 0 (optional)
 * limit Integer Amount of items retrieve default 20,  min 1, max 50  (optional)
 * returns DrinkPage
 **/
exports.drinksGET = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "next" : "next",
  "previous" : "previous",
  "drinks" : [ {
    "Ingredients" : [ {
      "name" : "name",
      "parts" : 5,
      "id" : 6,
      "alcvol" : 1
    }, {
      "name" : "name",
      "parts" : 5,
      "id" : 6,
      "alcvol" : 1
    } ],
    "name" : "name",
    "id" : 0
  }, {
    "Ingredients" : [ {
      "name" : "name",
      "parts" : 5,
      "id" : 6,
      "alcvol" : 1
    }, {
      "name" : "name",
      "parts" : 5,
      "id" : 6,
      "alcvol" : 1
    } ],
    "name" : "name",
    "id" : 0
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * returns the drink for the specified id
 *
 * id Integer an id of a drink
 * returns Drink
 **/
exports.drinksIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "Ingredients" : [ {
    "name" : "name",
    "parts" : 5,
    "id" : 6,
    "alcvol" : 1
  }, {
    "name" : "name",
    "parts" : 5,
    "id" : 6,
    "alcvol" : 1
  } ],
  "name" : "name",
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * gets ingredient limited by paging
 *
 * offset Integer page-number, starting at 0 (optional)
 * limit Integer Amount of items retrieve default 20,  min 1, max 50  (optional)
 * returns IngredientPage
 **/
exports.ingredientGET = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "next" : "next",
  "previous" : "previous",
  "ingredients" : [ {
    "name" : "name",
    "parts" : 5,
    "id" : 6,
    "alcvol" : 1
  }, {
    "name" : "name",
    "parts" : 5,
    "id" : 6,
    "alcvol" : 1
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * returns the ingredient for the specified id
 *
 * id Integer an id of an ingredient
 * returns Ingredient
 **/
exports.ingredientIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "name",
  "parts" : 5,
  "id" : 6,
  "alcvol" : 1
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
 * returns User
 **/
exports.meGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "alias" : "alias",
  "id" : 0
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
exports.userMachinesGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "owner" : {
    "alias" : "alias",
    "id" : 0
  },
  "name" : "name",
  "id" : 6
}, {
  "owner" : {
    "alias" : "alias",
    "id" : 0
  },
  "name" : "name",
  "id" : 6
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

