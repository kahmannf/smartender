import { Machine } from './../shared/machine';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }

  private socket: SocketIOClient.Socket;

  connectToChannel(channel: string): Observable<Machine> {
    this.socket = io(environment.apiBaseUrl);

    const observable = new Observable<Machine>(observer_internal => {
      this.socket.on(channel, (machine) => {
        observer_internal.next(machine);
      });
      return () => this.socket.disconnect();
    });

    return observable;
  }
}
