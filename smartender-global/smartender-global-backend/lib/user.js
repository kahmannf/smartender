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

const isAliasAvailable = (alias) => {
  return new Promise((resolve, reject) => {
    if(alias) {
      var sql = 'select alias from user where lower(alias) like lower(?)';
      var params = [alias];

      db.get(sql, params, (err, row) => {
        if(err) {
          reject(err)
        } else if (row) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } else {
      resolve(false);
    }
  });
}

const isEmailAvailable = (email) => {
  return new Promise((resolve, reject) => {

    console.log(email);
    if(email) {
      var sql = 'select email from user where lower(email) like lower(?)';
      var params = [email];

      db.get(sql, params, (err, row) => {
        if(err) {
          reject(err)
        } else if (row) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } else {
      resolve(false);
    }
  });
}


const createUser = (alias, email) => {
  return new Promise((resolve, reject) => {
    var registerkey = auth.genRandomString(20);

    var sql = "insert into user(email, alias, registerkey) values($email, $alias, $registerkey)";
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
    var sql = "select alias, email, id, registerkey from user where registerkey = ?";
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
  return new Promise((resolve, reject) => {
    var sql = "select hash, salt from user where lower(email) like lower(?)";
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

const getForTokenPayload = (email) => {
  return new Promise((resolve, reject) => {
    var sql = "select email, alias, id, is_admin from user where lower(email) = lower(?)";
    var params = [email];

    db.get(sql, params, (err, row) => {
      if(err) {
        reject(err);
      }
      else if(row) {
        resolve(row);
      }
      else {
        reject(undefined);
      }
    });
  });
}

const getById = (id) => {
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
        reject(undefined);
      }
    });
  });
}

const getInvites = (userid) => {
  return new Promise((resolve, reject) => {
    var sql = 'select u.alias as \'from\', ' + 
              ' s.name as sessionname, ' + 
              ' s.id as session_id, ' +
              ' u.id as user_id ' +
              ' from user_has_invites uhi, user u, session s ' +
              ' where uhi.invited_by_id = u.id ' + 
              ' and uhi.session_id = s.id ' +
              ' and uhi.user_id = ? ';
              
    var params = [userid];

    db.all(sql, params, (err, rows) => {
      if(err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const searchForSession = (sessionid, limit, offset, searchString, userid) => {
  return new Promise((resolve, reject) => {
    var sql = ' select u.alias, u.email, u.id ' + 
              ' from user u ' + 
              ' left join session_has_members shm ' +
              ' on u.id = shm.user_id ' +
              ' and shm.session_id = $sessionid ' +
              ' left join user_has_invites uhi ' +
              ' on u.id = uhi.user_id ' +
              ' and uhi.session_id = $sessionid ' +
              ' where u.id <> $userid ' +
              ' and shm.user_id is null ' +
              ' and uhi.user_id is null ' +
              ' and u.registerkey is null ';
    var params = {
      $sessionid: sessionid,
      $userid: userid,
      $search: !!searchString ? '%' + searchString.trim() + '%' : undefined
    }
    if(searchString) {
      sql += ' and (lower(u.email) like lower($search) or lower(u.alias) like lower($search))';
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
  })
}

module.exports = {
  activateUser, 
  createUser,
  getById,
  getByRegisterkey,
  getInvites,
  getForLogin,
  getForTokenPayload,
  isAliasAndEmailAvailable,
  isAliasAvailable,
  isEmailAvailable,
  searchForSession
};