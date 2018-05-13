import { WebSocketService } from './../service-client/web-socket.service';
import { Session } from './session';
import { map, switchMap } from 'rxjs/operators';
import { ServerOperationResult } from './server-operation-result';
import { UserSession } from './user-session';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { ConnectorService } from '../service-client/connector.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private connector: ConnectorService,
    private wbService: WebSocketService,
    private router: Router
  ) { }

  sessionCreated = new EventEmitter<string>();

  getMySessions(): Observable<UserSession[]> {
    return this.connector.secureSessionMineGET();
  }

  createSession(name: string, machine_id: number): Observable<ServerOperationResult> {
    return this.connector.secureSessionNewPOST(machine_id, name)
    .pipe(
      map(result => {
        if (result && result.success) {
          this.sessionCreated.emit('Yay!');
        }

        return result;
      })
    );
  }

  getSessionsUpdates(userid: number): Observable<UserSession[]> {
    return this.wbService.connectToChannel<string>('user ' + userid + ' sessions')
    .pipe(
      switchMap(update => {
        return this.getMySessions();
      })
    );
  }

  setActiveSession(sessionId): Observable<ServerOperationResult> {
    return this.connector.secureSessionSetActivePOST(sessionId);
  }

  navigateToActiveSession() {
    this.getMySessions().subscribe(result => {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].is_user_active_session) {
            this.router.navigate(['/home', 'sessions', 'session', result[i].session_id.toString()]);
            break;
          }
        }
      }
    });
  }

  getSessionById(session_id: number): Observable<Session> {
    return this.connector.secureSessionByIdGET(session_id);
  }

  getSessionUpdates(session_id: number): Observable<Session> {
    return this.wbService.connectToChannel<string>('session ' + session_id)
    .pipe(
      switchMap(update => {
        return this.getSessionById(session_id);
      })
    );
  }

  activateSession(sessionid: number): Observable<ServerOperationResult> {
    return this.connector.secureSessionSetStatePOST(sessionid, -1);
  }

  deactivateSession(sessionid: number): Observable<ServerOperationResult> {
    return this.connector.secureSessionSetStatePOST(sessionid, 0);
  }

  inviteUser(sessionid: number, userid: number): Observable<ServerOperationResult> {
    return this.connector.secureSessionInvitePOST(sessionid, userid);
  }

  acceptInvite(sessionid: number): Observable<ServerOperationResult> {
    return this.connector.secureSessionAcceptInvitePOST(sessionid);
  }

  declineInvite(sessionid: number): Observable<ServerOperationResult> {
    return this.connector.secureSessionDeclineInvitePOST(sessionid);
  }
}
