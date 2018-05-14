import { AuthService } from './../app/shared/auth.service';
import { UserService } from './../app/shared/user.service';
import { EventEmitter } from '@angular/core';

export function getUserService() {
  return {
    connector: undefined,
    wbService: undefined,
    checkAliasAvailable: () => { },
    checkEmailAvailable: () => { },
    getByRegisterKey: () => { },
    getMyMachines: () => { },
    registerMachine: () => { },
    getCurrentUser: () => { },
    getByIdArray: () => { },
    getInvites: () => { },
    getInvitesUpdates: () => { },
    searchFoSession: () => { },
    machineRegistered: new EventEmitter<string>()
  };
}

export function getAuthService() {
  return {
    connector: undefined,
    router: undefined,
    user: undefined,
    loggedInChanged: new EventEmitter<boolean>(),
    login: () => {},
    logout: () => {},
    isLoggedIn: () => {},
    register: () => {},
    activateAccount: () => {},
  };
}
