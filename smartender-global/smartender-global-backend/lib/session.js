const db = require('./db');

const machine_lib = require('./machine');

const logger = require('../logger');

const getUserSessions = (userid) => {
  return new Promise((resolve, reject) => {
    var sql = "select shm.session_id, " +
                    " shm.user_id, " +
                    " shm.can_edit_machine, " +
                    " shm.can_edit_session, " +
                    " shm.is_owner, " +
                    " shm.is_user_active_session, " +
                    " s.name, s.active, s.machine_id " +
                    " from session_has_members shm," +
                    " session s " + 
                    " where s.id = shm.session_id " + 
                   // " and (s.active != 0 or s.owner_id = $userid) " +
                    " and shm.user_id = $userid " +
                    " order by lower(s.name) asc ";
    var params = { $userid: userid };

    db.all(sql, params, (err, rows) => {
      if(err) {
        reject(err);
      } else {
        fillSessionMachineDataMulti(rows)
        .then(results => {
          resolve(results);
        })
        .catch(err => reject(err));
        
      }
    });

  });
}

const getUserUpdateIds = (session_id) => {
  return new Promise((resolve, reject) => {
    var sql = 'select user_id as id from session_has_members where session_id = ?';
    db.all(sql, [session_id], (err, rows) => {
      if(err) {
        reject(err) 
      } else {
        resolve(rows);
      }
    });
  })
}

const getSessionsByMachine = (machine_id) => {
  //broken
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

const getSessionById = (session_id, user_id) => {
  return new Promise((resolve, reject) => {
    var sql = "select * from session where id = ?";
    var params = [session_id];

    db.get(sql, params, (err, row) => {
      if(err) {
        reject(err);
      } else if (row) { 

        var session_copy = {
          ...row
        };
        
        fillSessionMembers(session_copy)
        .then(result => {
          if(canUserEditSession(user_id, result)) {
            resolve(result);
          } else {
            resolve(row);
          }
        })
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
                    " s.name, s.active " +
                    " from session_has_members shm," +
                    " session s " + 
                    " where s.id = shm.session_id " + 
                    " and s.id = ? ";
    var params = [session.id];

    db.all(sql, params, (err, rows) => {
      if(err) {
        reject(err);
      } else {
        session.members = rows;
        fillSessionMachineData(session)
        .then(machine_session => resolve(machine_session))
        .catch(err => {
          logger.error(err, 500);
          resolve(session);
        })
      }
    });

  });
}

const fillSessionMachineData = (session) => { 
  return new Promise((resolve, reject) => {
    machine_lib.getMachineById(session.machine_id)
    .then(machine => {
      session.machine = machine;
      resolve(session);
    })
    .catch(err => reject(err));
  });
}

const fillSessionMachineDataMulti = (sessions) => {
  return new Promise((resolve, reject) => {
    if(sessions && sessions.length) {
      var expected = sessions.length;
      var current = 0;
      var result = [];

      for(var i = 0; i < expected; i++) {
        fillSessionMachineData(sessions[i])
        .then(session => {
          result.push(session);
          current++;

          if(current == expected) {
            resolve(result);
          }

        })
        .catch(err => {
          logger.error(err, 500);
          current++;

          if(current == expected) {
            resolve(result);
          }

        });
      }

    } else {
      resolve([]);
    }
  });
}

const createSession = (machine_id, user_id, name) => {
  return new Promise((resolve, reject) => {
    machine_lib.isUserOwner(machine_id, user_id)
    .then(is_user_owner => {
      if(is_user_owner) {
        
        var sql1 = "insert into session(owner_id, machine_id, name, active) values ($owner_id, $machine_id, $name, -1)";
        var params1 = {
          $owner_id: user_id, 
          $machine_id: machine_id, 
          $name: name
        }

        db.run(sql1, params1, err => {
          if(err) {
            reject(err);
          }
          else {

            db.get('select id from session where rowid = last_insert_rowid()', (err, row_session_id) => {
              if(err) {
                reject(err);
              } else {
                var sql2 = 'insert into session_has_members ' + 
                            ' (session_id, user_id, can_edit_machine, can_edit_session, is_owner, is_user_active_session) ' + 
                            ' values($session_id, $user_id, -1, -1, -1, 0)';
                var params2 = {
                  $session_id: row_session_id.id, 
                  $user_id: user_id
                }

                db.run(sql2, params2, err => {
                  if(err) {
                    reject(err);
                  } else {
                    resolve({ 
                      operation_result: { success: true, message: '' },
                      session_id: params2.$session_id
                    });
                  }
                });
              }
            });
          }
        });
      }
      else {
        resolve({operation_result: { success: false, message: 'user is not machine owner'}});
      }
    }).catch(err => reject(err));
  });
}


const setActiveSession = (session_id, user_id) => {
  return new Promise((resolve, reject) => {
    var sqlDisable = 'update session_has_members set is_user_active_session = 0 where user_id = ?'
    
    db.run(sqlDisable, [user_id], err => {
      if(err) {
        reject(err)
      } else {
        var sqlActivate = 'update session_has_members set is_user_active_session = -1 where user_id = ? and session_id = ?'
        db.run(sqlActivate, [user_id, session_id], err => {
          if(err) {
            reject(err)
          } else {
            resolve({ success: true });
          }
        });
      }
    })
  });
}

const setSessionActiveState = (session_id, state, user_id) => {
  return new Promise((resolve,reject) => {
    getSessionById(session_id, user_id)
    .then(session => {
      if(session) {
        if(canUserEditSession(user_id, session)) {
          //remove active state of all members if deactivating
          var sql = 'select ?';
          if(!state || state === '0') {
            sql = 'update session_has_members set is_user_active_session = 0 where session_id = ?'
          }

          db.run(sql, [session_id], err => {
            if(err) {
              reject(err)
            } else {
              db.run('update session set active = ? where id = ?', [state, session_id], err => {
                if(err) {
                  reject(err);
                } else {
                  resolve({ success: true });
                }
              })
            }
          })
        }
      } else {
        resolve({ success: false, message: 'no session with that id'});
      }
    })
    .catch(err => reject(err));
  })
}

const canUserEditSession = (user_id, session) => {
  if(session.owner_id === user_id) {
    return true;
  } else if (session.members) {

    for(var i = 0; i < session.members.length; i++) {
      if(session.members[i] && session.members[i].user_id === user_id && session.members[i].can_edit_session) {
        return true;
      }
    }
  } 

  return false;
}

const inviteUser = (source_user_id, target_user_id, session_id) => {
  return new Promise((resolve, reject) => {
    getSessionById(session_id, source_user_id)
    .then(session => {
      if(canUserEditSession(source_user_id, session)) {
        var sql = "insert into user_has_invites(user_id, session_id, invited_by_id) values ($user_id, $session_id, $invited_by_id) ";
        var params = {
          $user_id: target_user_id, 
          $session_id: session_id, 
          $invited_by_id: source_user_id
        }

        db.run(sql, params, err => {
          if(err) {
            reject(err);
          } else {
            resolve({success: true, message: ''});
          }
        });

      } else {
        resolve({success: false, message: 'You dont have permission to do that!'});
      }
    })
    .catch(err => reject(err));
  });
}

const getInvite = (sessionid, userid) => {
  return new Promise((resolve, reject) => {
    var sql = 'select * from user_has_invites where user_id = ? and session_id = ?';
    var params = [userid, sessionid];

    db.get(sql, params, (err, row) => {
      if(err) {
        reject(err)
      } else {
        resolve(row);
      }
    });
  });
}

const acceptInvite = (sessionid, userid) => {
  return new Promise((resolve, reject) => {
    getInvite(sessionid, userid)
    .then(invite => {
      if(invite) {
        var sql = 'insert into session_has_members ' + 
                    ' (session_id, user_id, can_edit_machine, can_edit_session, is_owner, is_user_active_session) ' + 
                    ' values($sessionid, $userid, 0, 0, 0, -1)';
        var params = {
          $sessionid: sessionid, 
          $userid: userid
        }
        
        db.run(sql, params, err => {
          if(err) {
            reject(err);
          } else {
            var sql2 = 'delete from user_has_invites ' +
                        ' where user_id = $userid ' + 
                        ' and session_id = $sessionid ';
            db.run(sql2, params, err => {
              if(err) {
                reject(err);
              } else {
                resolve({ success: true });
              }
            })
          }
        });

      } else {
        resolve({ success: false, message: 'no pending invite for that session!'});
      }
    })
    .catch(err => reject(err));
  });
}

const declineInvite = (sessionid, userid) => {
  return new Promise((resolve, reject) => {
    getInvite(sessionid, userid)
    .then(invite => {
      if(invite) {
        
        var sql = 'delete from user_has_invites ' +
                    ' where user_id = $userid ' + 
                    ' and session_id = $sessionid ';

        var params = {
          $sessionid: sessionid, 
          $userid: userid
        };

        db.run(sql, params, err => {
          if(err) {
            reject(err);
          } else {
            resolve({ success: true });
          }
        })
      } else {
        resolve({ success: false, message: 'no pending invite for that session!'});
      }
    })
    .catch(err => reject(err));
  });
}

const deleteSession = (sessionId, userId) => new Promise((resolve, reject) => {
  getSessionById(sessionId, userId)
  .then(session => {
    if(session.owner_id === userId) {
      db.run('delete from user_has_invites where session_id = ?', [sessionId], (err) => {
        if(err) {
          reject(err);
        } else {
          db.run('delete from session_has_members where session_id = ?', [sessionId], (err) => {
            if(err) {
              reject(err);
            } else {
              db.run('delete from session where id = ?', [sessionId], err => {
                if(err) {
                  reject(err);
                } else {
                  resolve({ success: true, message: ''});
                }
              })
            }
          })
        }
      });
    } else {
      resolve({ success: false, message: 'you dont have the permission to do that'});
    }
  })
  .catch(err => reject(err));
});

const leaveSession = (userid, sessionid) => new Promise((resolve, reject) => {
  getSessionById(sessionid, userid)
  .then(session => {
    if(session.owner_id === userid) {
      resolve({ success: false, message: "the owner cannot leave the session"});
    } else if(session.members) {
      var solved = false;
      for(var i = 0; i < session.members.length; i++) {
        if(session.members[i].user_id == userid) {
          db.run('delete from session_has_members where user_id = ?', [userid], err => {
            if(err) {
              reject(err);
            } else {
              resolve({ success: true, message: ''});
            }
          })
          solved = true;
          break;
        }
      }
      if(!solved) {
        resolve({ success: false, message: "user is not member of session"});
      }
    } else {
      reject('failed to load the session');
    }
    
  })
  .catch(reject);
});

module.exports = {
  acceptInvite,
  createSession,
  declineInvite,
  deleteSession,
  getSessionById,
  canUserEditSession,
  //getSessionByMachine,
  getUserSessions,
  getUserUpdateIds,
  inviteUser,
  leaveSession,
  setActiveSession,
  setSessionActiveState
}