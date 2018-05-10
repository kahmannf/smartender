const db = require('./db');

const auth = require('./auth');

const isAliasAndEmailAvailable = (alias, email) => {
  return new Promise((resolve, reject) => {
    
    var sql = "select * from user where lower(alias) like lower($alias) or email like $email";
    var params = {
      $alias: alias,
      $email: email
    }
    db.get(sql, params, (err, row) => {
      if(err) {
        reject(err);
      }
      else if(row) {
        resolve({
          available: false,
          alias: row.alias === alias,
          email: row.email === email
        });
      }
      else {
        resolve({
          available: true
        });
      }
    });
  });
};

const createUser = (alias, email) => {
  return new Promise((resolve, reject) => {
    var registerkey = auth.genRandomString(20);

    var sql = "insert into user(alias, email, registerkey) values($alias, $email, $registerkey)";
    var params = {
      $alias: alias, 
      $email: email, 
      $registerkey: registerkey
    }

    db.run(sql, params, (err) => {
      if(err) {
        reject(err);
      }
      else {
        resolve({
          alias: alias, 
          email: email, 
          registerkey: registerkey
        });
      }
    });

  });
}

const activateUser = (user) => {
  return new Promise((resolve, reject) => {
    var sql = 'select * from user where registerkey = ?';
    var params = [user.registerkey];

    db.get(sql, params, (err, row) => {
      if(err) {
        reject(err);
      }
      else {
        if(row.alias == user.alias && row.email == user.email) {
          var salt = auth.genRandomString(50);
          var hash = auth.getHash(user.password, salt);
          new_user = {
            ...user,
            registerkey: undefined,
            salt,
            hash
          }

          updatePassword(new_user)
          .then(() => resolve())
          .catch(err => reject(err));
        }
        else {
          reject("User-data not consistent");
        }
      }
    });
  });
}

const updatePassword = (user) => {
  return new Promise((resolve, reject) => {
    var sql = "update user set hash = $hash, salt = $salt, registerkey = null where id = $id";
    var params = {
      $hash: user.hash,
      $salt: user.salt,
      $id: user.id
    };

    
    db.run(sql, params, err => {
      if(err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
}

const getByRegisterkey = (registerkey) => {
  return new Promise((resolve, reject) => {
    var sql = "select alias, email, id from user where registerkey = ?";
    var params = [registerkey];
    db.get(sql, params, (err, row) => {
      if(err) {
        reject(err)
      }
      else if (row) {
        resolve(row);
      }
      else {
        resolve(`No user with registerkey ${registerkey}`);
      }
    });
  });
}

const getForLogin = (email) => {
  return new Promise((req, res) => {
    var sql = "select hash, salt from user where email like ?";
    var params = [email];

    db.get(sql, params, (err, row) => {
      if(err) {
        reject(err);
      }
      else if (row) {
        resolve(row);
      }
      else {
        reject(undefined);
      }
    });
  });
}

const getForTokenPayload = (id) => {
  return new Promise((resolve, reject) => {
    var sql = "select email, alias, id from user where id = ?";
    var params = [id];

    db.get(sql, params, (err, row) => {
      if(err) {
        reject(err);
      }
      else if(row) {
        resolve(row);
      }
      else {
        reject(`No user with id ${id}`);
      }
    });
  });
}

module.exports = {
  activateUser, 
  createUser,
  getByRegisterkey,
  getForLogin,
  getForTokenPayload,
  isAliasAndEmailAvailable
};