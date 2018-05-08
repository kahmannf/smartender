import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class MockService {

  constructor() { }

  user_logged_in = false;

  login(username: string, password: string) {
    this.user_logged_in = true;
    return of('token');
  }

  logout() {
    this.user_logged_in = false;
  }

  isLoggedIn() {
    return of(this.user_logged_in);
  }

}
