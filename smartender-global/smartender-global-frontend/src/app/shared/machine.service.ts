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

  machineAvailable(machine: Machine) {
    return !!machine && machine.isAvailable;
  }

  machineOperating(machine: Machine) {
    if (machine
    && !machine.isAvailable
    && machine.ports) {
      for (let i = 0; i < machine.ports.length; i++) {
        if (machine.ports[i].blockReasons
          && machine.ports[i].blockReasons.length) {
            return true;
        }
      }
    }

    return false;
  }

  machineUnavailable(machine: Machine) {
    if (machine
    && !machine.isAvailable) {
      if (machine.ports) {
        for (let i = 0; i < machine.ports.length; i++) {
          let noData = true;
          if (machine.ports[i].blockReasons
            && machine.ports[i].blockReasons.length) {
              noData = false;
          }

          return noData;
        }
      } else {
        return true;
      }
    }

    return false;
  }
}
