import { SessionService } from './../app/shared/session.service';
import { AuthService } from './../app/shared/auth.service';
import { UserService } from './../app/shared/user.service';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';

export function getUserService() {
  return {
    connector: undefined,
    wbService: undefined,
    checkAliasAvailable: () => { },
    checkEmailAvailable: () => { },
    getByRegisterKey: () => { },
    getMyMachines: () => of([]),
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
    isLoggedIn: () => true,
    register: () => {},
    activateAccount: () => {},
  };
}

export function getSessionService() {
  return {
    connector: undefined,
    wbService: undefined,
    router: undefined,
    sessionCreated: new EventEmitter<string>(),
    getMySessions: () => {},
    createSession: () => {},
    getSessionsUpdates: () => {},
    setActiveSession: () => {},
    navigateToActiveSession: () => {},
    getSessionById: () => {},
    getSessionUpdates: () => {},
    activateSession: () => {},
    deactivateSession: () => {},
    inviteUser: () => {},
    acceptInvite: () => {},
    declineInvite: () => {}
  };
}
