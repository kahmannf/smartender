import { WebSocketService } from './../service-client/web-socket.service';
import { Invitation } from './invitation';
import { map, switchMap } from 'rxjs/operators';
import { ServerOperationResult } from './server-operation-result';
import { Machine } from './machine';
import { User } from './user';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectorService } from '../service-client/connector.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private connector: ConnectorService,
    private wbService: WebSocketService
  ) {
    this.machineRegistered = new EventEmitter<string>();
   }

  machineRegistered: EventEmitter<string>;

  checkAliasAvailable(alias: string): Observable<boolean> {
    return this.connector.publicUserIsAliasAvailableGET(alias);
  }

  checkEmailAvailable(email: string): Observable<boolean> {
    return this.connector.publicUserIsEmailAvailableGET(email);
  }

  getByRegisterKey(key: string): Observable<User> {
    return this.connector.publicUserByRegisterKeyGET(key);
  }

  getMyMachines(): Observable<Machine[]> {
    return this.connector.secureUserMyMachinesGET();
  }

  registerMachine(machinekey: string, name: string): Observable<ServerOperationResult> {
    return this.connector.secureUserRegisterMachinePOST(machinekey, name)
    .pipe(
      map(result => {
        if (result && result.success) {
          this.machineRegistered.emit('Yay!');
        }
        return result;
      })
    );
  }

  getCurrentUser(): Observable<User> {
    return this.connector.secureUserCurrentGET();
  }

  getByIdArray(ids: number[]): Observable<User[]> {
    return this.connector.secureUserByIdArrayPOST(ids);
  }

  getInvites(): Observable<Invitation[]> {
    return this.connector.secureUserMyInvitesGET();
  }

  getInvitesUpdates(userid: number): Observable<Invitation[]> {
    return this.wbService.connectToChannel('invites ' + userid)
    .pipe(
      switchMap(anything => {
        return this.getInvites();
      })
    );
  }
}
