'use strict';
const db = require('./db');

const user = require('./user');

const addIngredient = (ingredient, user_id) => new Promise((resolve, reject) => {
  ingredient.user_id = user_id;
  console.dir(ingredient);
  if(!validateIngredient(ingredient, false)) {
    resolve({ success: false, message: 'Invalid ingredient'});
  } else {
    user.getById(user_id)
    .then(user => {
      if(user && user.is_admin) {

        var sqlCheck = 'select * from ingredient where lower(name) like lower(?)';

        db.get(sqlCheck, ingredient.name, (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            resolve({ success: false, message: `A ingredient with the name ${ingredient.name} already exists`});
          } else {

            var sql = 'insert into ingredient (name, alcvol, user_id) values ($name, $alcvol, $user_id)';

            var params = {
              $name: ingredient.name, 
              $alcvol: ingredient.alcvol, 
              $user_id: user_id
            };
            
            db.run(sql, params, err => {
              if(err) {
                reject(err);
              } else {
                resolve({ success: true });
              }
            })
          }
        });
      } else {
        resolve({ success: false, message: 'user has insufficient permissions'});
      }
    })
    .catch(err => reject(err));
  }
});

const updateIngredient = (ingredient, user_id) => new Promise((resolve, reject) => {
  ingredient.user_id = user_id;
  if(!validateIngredient(ingredient)) {
    resolve({ success: false, message: 'Invalid ingredient'});
  } else {
    user.getById(user_id)
    .then(user => {
      if(user && user.is_admin) {

        var sqlCheck = 'select * from ingredient where lower(name) like lower(?)';

        db.get(sqlCheck, ingredient.name, (err, row) => {
          if (err) {
            reject(err);
          } else if (!row) {
            resolve({ success: false, message: `A ingredient with the id ${ingredient.id} does not exists`});
          } else {

            var sql = 'update ingredient set name=$name, alcvol=$alcvol where id = $id';

            var params = {
              $name: ingredient.name, 
              $alcvol: ingredient.alcvol, 
              $id: ingredient.id
            };
            
            db.run(sql, params, err => {
              if(err) {
                reject(err);
              } else {
                resolve({ success: true });
              }
            })
          }
        });
      } else {
        resolve({ success: false, message: 'user has insufficient permissions'});
      }
    })
    .catch(err => reject(err));
  }
});


const validateIngredient = (ingredient, update) => 
  ingredient  
  && ingredient.name 
  && (ingredient.alcvol || ingredient.alcvol === 0) 
  && ingredient.user_id 
  && (update ? !!ingredient.id : true);

const searchIngredient = (limit, offset, searchString) => new Promise((resolve, reject) => {
  var sql = 'select * from ingredient where lower(name) like lower($search)';
  var params = {
    $search: !!searchString ? '%' + searchString.trim() + '%' : undefined
  }

  db.all(sql, params, (err, rows) => {
    if(err) {
      reject(err);
    } else {
      var result = {
        offset: offset,
        limit: limit,
        total: rows ? rows.length : 0,
        items: []
      }
      
      if(limit * offset > rows.length) {
        
      } else if (limit * (offset + 1) > rows.length) {
        result.items = rows.slice(offset * limit);
      } else {
        result.items = rows.slice(offset * limit, (offset + 1) * limit);
      }

      resolve(result);
    }
  });
});

module.exports = {
  addIngredient,
  searchIngredient,
  updateIngredient
}