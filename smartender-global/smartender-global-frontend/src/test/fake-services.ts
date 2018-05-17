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
import { PageResult } from '../app/shared/page-result';

const dummyUser = {
  id: -1,
  alias: 'Test User',
  email: 'test@smartender.kahmann.com',
  registerkey: '1234567890',
  iat: 0,
  exp:  0,
  is_admin: 0
};

const dummyServerOperation = {
  success: false,
  message: 'Unit-test result!'
};

export const dummyMachine = {
  id: 0,
  owner_id: 0,
  name: '',
  isAvailable: false,
  isBusy: false
};

const dummySession = {
  owner_id: -1,
  machine_id: -1,
  active: 1,
  id: -1,
  name: 'Test Session',
  members: [],
  machine: dummyMachine
};

const dummyInvitation = {
  from: 'Sender',
  sessionname: 'Sessionname',
  session_id: -1,
  user_id: -1
};

const dummyPageResultUser = {
  offset: 0,
  limit: 20,
  total: 1,
  items: [dummyUser]
};

export function getUserService() {
  return {
    connector: undefined,
    wbService: undefined,
    checkAliasAvailable: (): Observable<boolean> => of(true),
    checkEmailAvailable: (): Observable<boolean> => of(true),
    getByRegisterKey: (): Observable<User> => of(dummyUser),
    getMyMachines: () => of([dummyMachine]),
    registerMachine: (): Observable<ServerOperationResult> => of(dummyServerOperation),
    getCurrentUser: (): Observable<User> => of(dummyUser),
    getByIdArray: (): Observable<User[]> => of([dummyUser]),
    getInvites: (): Observable<Invitation[]> => of([dummyInvitation]),
    getInvitesUpdates: (id: number): Observable<Invitation[]> => of([]),
    searchFoSession: (): Observable<PageResult<User>> => of(dummyPageResultUser),
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
    isLoggedIn: (): Observable<boolean> => of(true),
    register: (): Observable<ServerOperationResult> => of(dummyServerOperation),
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
    createSession: (): Observable<ServerOperationResult> => of(dummyServerOperation),
    getSessionsUpdates: (): Observable<UserSession[]> => of([]),
    setActiveSession: (): Observable<ServerOperationResult> => of(dummyServerOperation),
    navigateToActiveSession: () => {},
    getSessionById: (): Observable<Session> => of(dummySession),
    getSessionUpdates: (id: number): Observable<UserSession[]> => of([]),
    activateSession: (): Observable<ServerOperationResult> => of(dummyServerOperation),
    deactivateSession: (): Observable<ServerOperationResult> => of(dummyServerOperation),
    inviteUser: (): Observable<ServerOperationResult> => of(dummyServerOperation),
    acceptInvite: (): Observable<ServerOperationResult> => of(dummyServerOperation),
    declineInvite: (): Observable<ServerOperationResult> => of(dummyServerOperation)
  };
}

export function getMachineService() {
  return {
    connector: undefined,
    wbService: undefined,
    getMachineById: (id: number): Observable<Machine> => of(dummyMachine),
    subscribeMachineById: (id: number): Observable<Machine> => of(dummyMachine),
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
  };
}
