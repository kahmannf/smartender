import { Observable } from 'rxjs';
import { MockService } from './../service-client/mock.service';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(public mockService: MockService) { }

  token: string;

  @Output() login_returned = new EventEmitter<boolean>();

  login(email: string, password: string) {
    this.mockService.login(email, password).toPromise().then(token => {
      this.token = token;
      this.login_returned.emit(true);
     }).catch(err => {
      this.login_returned.emit(false);
     });

  }

  logout() {
    this.mockService.logout();
  }

  isLoggedIn() {
    return this.mockService.isLoggedIn();
  }
}
