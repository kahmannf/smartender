import { UserSession } from './user-session';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConnectorService } from '../service-client/connector.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private connector: ConnectorService) { }

  getMySessions(): Observable<UserSession[]> {
    return this.connector.secureSessionMineGET();
  }
}
