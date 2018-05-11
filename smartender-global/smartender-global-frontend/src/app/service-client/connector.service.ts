import { TokenResponse } from './../shared/token-response';
import { ServerOperationResult } from './../shared/server-operation-result';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  constructor(private http: HttpClient) { }

  getHttpHeaders(secure: boolean = true, additionalHeaders?: { [name: string]: string}): HttpHeaders {
    let headers = { };

    if (additionalHeaders) {
      headers = {
        ...additionalHeaders
      };
    }

    if (secure) {
      headers = {
        ...headers,
        'Authentication': 'Bearer ' + localStorage.getItem('token')
      };
    }

    return new HttpHeaders(headers);
  }

  publicAuthRegisterPOST(email: string, alias: string): Observable<ServerOperationResult> {
    return this.http
    .post<ServerOperationResult>(env.apiBaseUrl + 'public/auth/register',
    { alias, email },
    { headers: this.getHttpHeaders(false) });
  }

  publicAuthActivatePOST(user: User, password: string): Observable<boolean> {
    const body = {
      ...user,
      password
    };

    return this.http
    .post<boolean>(env.apiBaseUrl + 'public/auth/activate',
    body,
    { headers: this.getHttpHeaders(false) });
  }

  publicUserByRegisterKeyGET(registerkey: string): Observable<User> {
    return this.http
    .get<User>(env.apiBaseUrl + 'public/user/by-register-key/' + registerkey,
    { headers: this.getHttpHeaders(false) });
  }

  publicAuthLoginPOST(email: string, password: string): Observable<TokenResponse> {
    return this.http
    .post<TokenResponse>(env.apiBaseUrl + 'public/auth/login',
    { email, password },
    { headers: this.getHttpHeaders(false) });
  }

  secureUserCurrentGET(): Observable<User> {
    return this.http.get<User>(env.apiBaseUrl + 'secure/user/current',
    { headers: this.getHttpHeaders() });
  }

  publicUserIsAliasAvailableGET(alias: string): Observable<boolean> {
    return this.http.get<boolean>(env.apiBaseUrl + 'public/user/is-alias-available/' + alias,
    { headers: this.getHttpHeaders(false) });
  }

  publicUserIsEmailAvailableGET(email: string): Observable<boolean> {
    return this.http.get<boolean>(env.apiBaseUrl + 'public/user/is-email-available/' + email,
    { headers: this.getHttpHeaders(false) });
  }
}
