import { User } from './user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectorService } from '../service-client/connector.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public connector: ConnectorService) { }

  checkAliasAvailable(alias: string): Observable<boolean> {
    return this.connector.publicUserIsAliasAvailableGET(alias);
  }

  checkEmailAvailable(email: string): Observable<boolean> {
    return this.connector.publicUserIsEmailAvailableGET(email);
  }

  getByRegisterKey(key: string): Observable<User> {
    return this.connector.publicUserByRegisterKeyGET(key);
  }
}
