import { Invitation } from './../app/shared/invitation';
import { SessionService } from './../app/shared/session.service';
import { AuthService } from './../app/shared/auth.service';
import { UserService } from './../app/shared/user.service';
import { EventEmitter } from '@angular/core';
import { of, Observable } from 'rxjs';
import { User } from '../app/shared/user';
import { UserSession } from '../app/shared/user-session';

export function getUserService() {
  return {
    connector: undefined,
    wbService: undefined,
    checkAliasAvailable: () => { },
    checkEmailAvailable: () => { },
    getByRegisterKey: () => { },
    getMyMachines: () => of([]),
    registerMachine: () => { },
    getCurrentUser: (): Observable<User> =>
    of({
      id: -1,
      alias: 'Test User',
      email: 'test@smartender.kahmann.com',
      registerkey: '1234567890',
      iat: 0,
      exp:  0
    }),
    getByIdArray: () => { },
    getInvites: (): Observable<Invitation[]> => of([]),
    getInvitesUpdates: (id: number): Observable<Invitation[]> => of([]),
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
    getMySessions: (): Observable<UserSession[]> => of([]),
    createSession: () => {},
    getSessionsUpdates: () => {},
    setActiveSession: () => {},
    navigateToActiveSession: () => {},
    getSessionById: () => {},
    getSessionUpdates: (id: number): Observable<UserSession[]> => of([]),
    activateSession: () => {},
    deactivateSession: () => {},
    inviteUser: () => {},
    acceptInvite: () => {},
    declineInvite: () => {}
  };
}

export function getMachineService() {
  return {
    connector: undefined,
    wbService: undefined,
    getMachineById: () => {},
    subscribeMachineById: () => {},
  };
}
