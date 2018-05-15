import { ServerOperationResult } from './../app/shared/server-operation-result';
import { Invitation } from './../app/shared/invitation';
import { SessionService } from './../app/shared/session.service';
import { AuthService } from './../app/shared/auth.service';
import { UserService } from './../app/shared/user.service';
import { EventEmitter } from '@angular/core';
import { of, Observable } from 'rxjs';
import { User } from '../app/shared/user';
import { UserSession } from '../app/shared/user-session';
import { CustomValidators } from '../app/custom-validators';
import { AbstractControl } from '@angular/forms';
import { Machine } from '../app/shared/machine';
import { Session } from '../app/shared/session';

export function getUserService() {
  return {
    connector: undefined,
    wbService: undefined,
    checkAliasAvailable: () => { },
    checkEmailAvailable: () => { },
    getByRegisterKey: () => { },
    getMyMachines: () => of([]),
    registerMachine: (): Observable<ServerOperationResult> =>
    of({
      success: false,
      message: 'Unit-test result!'
    }),
    getCurrentUser: (): Observable<User> =>
    of({
      id: -1,
      alias: 'Test User',
      email: 'test@smartender.kahmann.com',
      registerkey: '1234567890',
      iat: 0,
      exp:  0
    }),
    getByIdArray: (): Observable<User[]> => of([]),
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
    login: (): Observable<boolean> => of(false),
    logout: () => {},
    isLoggedIn: () => true,
    register: (): Observable<ServerOperationResult> => of({ success: false, message: 'Test result'}),
    activateAccount: (): Observable<boolean> => of(false),
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
    getSessionsUpdates: (): Observable<UserSession[]> => of([]),
    setActiveSession: () => {},
    navigateToActiveSession: () => {},
    getSessionById: (): Observable<Session> => 
    of({
      owner_id: -1,
      machine_id: -1,
      active: 1,
      id: -1,
      name: 'Test Session',
      members: []
    }),
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
    getMachineById: (id: number): Observable<Machine> => 
    of({
      id: 0,
      owner_id: 0,
      name: '',
      ports: []
    }),
    subscribeMachineById: (id: number): Observable<Machine> => 
    of({
      id: 0,
      owner_id: 0,
      name: '',
      ports: []
    }),
  };
}

export function getCustomValidators(): CustomValidators {
  
  return {
    userService: undefined,
    alphanumric: (control: AbstractControl) => null,
    alphanumricwhitespace: (control: AbstractControl) => null,
    emailformat: (control: AbstractControl) => null,
    aliasavailable: (control: AbstractControl) => of(null),
    emailavailable: (control: AbstractControl) => of(null),
  }
}