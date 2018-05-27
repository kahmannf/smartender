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

  // private socket: SocketIOClient.Socket;

  connectToChannel<T>(channel: string): Observable<T> {
    const socket = io(environment.apiBaseUrl);

    const observable = new Observable<T>(observer_internal => {
      socket.on(channel, (machine) => {
        observer_internal.next(machine);
      });
      return () => socket.disconnect();
    });

    return observable;
  }
}
