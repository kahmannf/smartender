import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { ConnectorService } from './../service-client/connector.service';
import { Observable, of } from 'rxjs';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from './user';
import { ServerOperationResult } from './server-operation-result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public connector: ConnectorService,
    public router: Router) { }

  user: User;

  loggedInChanged = new  EventEmitter<boolean>();

  login(email: string, password: string) {
    return this.connector.publicAuthLoginPOST(email, password)
    .pipe(
      map(tokenResponse => {
        if (tokenResponse && tokenResponse.token) {
          localStorage.setItem('token', tokenResponse.token);
          this.user = tokenResponse.user;
          this.loggedInChanged.emit(true);
          return true;
        } else {
          return false;
        }
      })
    );
  }


  logout() {
    localStorage.setItem('token', undefined);

    this.loggedInChanged.emit(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.connector.secureUserCurrentGET()
    .pipe(
      catchError(err => of(false)),
      map(user => {
        return !!user;
      })
    );
  }

  isAdmin(): Observable<boolean> {
    return this.connector.secureUserCurrentGET()
    .pipe(
      map(user => {
        if (user) {
          return !!user.is_admin;
        } else {
          return false;
        }
      })
    );
  }

  register(user: User): Observable<ServerOperationResult> {
    return this.connector.publicAuthRegisterPOST(user.email, user.alias);
  }

  activateAccount(user: User, password: string) {
    return this.connector.publicAuthActivatePOST(user, password);
  }
}
