const db = require('./db');

const machine_lib = require('./machine');

const getUserSessions = (userid) => {
  return new Promise((resolve, reject) => {
    var sql = "select shm.session_id, " +
                    " shm.user_id, " +
                    " shm.can_edit_machine, " +
                    " shm.can_edit_session, " +
                    " shm.is_owner, " +
                    " shm.is_user_active_session, " +
                    " s.name " +
                    " from session_has_members shm," +
                    " session s " + 
                    " where s.id = shm.session_id " + 
                    " and s.active != 0 " +
                    " and shm.user_id = $userid ";
    var params = { $userid: userid };

    db.all(sql, params, (err, rows) => {
      if(err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });

  });
}

const getSessionByMachine = (machine_id) => {
  return new Promise((resolve, reject) => {
    var sql = "select * from session where machine_id = ?";
    var params = [machine_id];

    db.get(sql, params, (err, row) => {
      if(err) {
        reject(err);
      } else if (row) {
        fillSessionMembers(row)
        .then(result => resolve(result))
        .catch(err => reject(err));
      } else {
        resolve(undefined);
      }
    });
  });
};

const getSessionByOwner = (user_id) => {
  return new Promise((resolve, reject) => {
    var sql = "select * from session where owner_id = ?";
    var params = [user_id];

    db.get(sql, params, (err, row) => {
      if(err) {
        reject(err);
      } else if (row) {
        fillSessionMembers(row)
        .then(result => resolve(result))
        .catch(err => reject(err));
      } else {
        resolve(undefined);
      }
    });
  });
};


const fillSessionMembers = (session) => {
  return new Promise((resolve, reject) => {
    var sql = "select shm.*, " +
                    " s.name " +
                    " from session_has_members shm," +
                    " session s " + 
                    " where s.id = shm.session_id " + 
                    " and s.active <> 0 ";
                    " and s.id = ? ";
    var params = [session.id];

    db.all(sql, params, (err, rows) => {
      if(err) {
        reject(err);
      } else {
        session.members = rows;
        resolve(session);
      }
    });

  });
}

const createSession = (machine_id, user_id, name) => {
  return new Promise((resolve, reject) => {
    machine_lib.isUserOwner(machine_id, user_id)
    .then(is_user_owner => {
      if(is_user_owner) {
        getSessionByMachine(machine_id)
        .then(machine => {
          if(machine) {
            resolve({ success: false, message: 'machine already has a session' });
          }
          else {
            var sql = "insert into session(owner_id, machine_id, name, active) values ($owner_id, $machine_id, $name, 1)";
            var params = {
              $owner_id: user_id, 
              $machine_id: machine_id, 
              $name: name
            }

            db.run(sql, params, err => {
              if(err) {
                reject(err);
              }
              else {
                resolve({ success: true, message: '' });
              }
            });
          }
        })
        .catch(err => reject(err));
      }
      else {
        resolve({ success: false, message: 'user is not machine owner'});
      }
    }).catch(err => reject(err));
  });
}


module.exports = {
  createSession,
  getUserSessions,
  getSessionByMachine,
  getSessionByOwner
  
}