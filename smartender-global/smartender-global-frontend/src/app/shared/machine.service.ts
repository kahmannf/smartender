import { WebSocketService } from './../service-client/web-socket.service';
import { Machine } from './machine';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConnectorService } from '../service-client/connector.service';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(
    private connector: ConnectorService,
  private wsService: WebSocketService) {
  }

  getMachineById(id: number): Observable<Machine> {
    return this.connector.secureMachineByIdGET(id);
  }

  subscribeMachineById(id: number): Observable<Machine> {
    return this.wsService.connectToChannel('machine ' + id);
  }
}
