import { ServerOperationResult } from './server-operation-result';
import { WebSocketService } from './../service-client/web-socket.service';
import { Machine } from './machine';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConnectorService } from '../service-client/connector.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(
    private connector: ConnectorService,
  private wbService: WebSocketService) {
  }

  getMachineById(id: number): Observable<Machine> {
    return this.connector.secureMachineByIdGET(id);
  }

  subscribeMachineById(id: number): Observable<Machine> {
    return this.wbService.connectToChannel<Machine>('machine ' + id)
    .pipe(switchMap(whatever => this.getMachineById(id)));
  }
}
