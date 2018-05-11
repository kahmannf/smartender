import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class MockService {

  constructor() { }

  user_logged_in = false;


  isLoggedIn() {
    return of(this.user_logged_in);
  }

}
