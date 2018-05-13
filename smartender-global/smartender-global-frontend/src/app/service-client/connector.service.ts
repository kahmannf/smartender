import { Invitation } from './../shared/invitation';
import { Session } from './../shared/session';
import { Machine } from './../shared/machine';
import { TokenResponse } from './../shared/token-response';
import { ServerOperationResult } from './../shared/server-operation-result';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { User } from '../shared/user';
import { UserSession } from '../shared/user-session';
import { PageResult } from '../shared/page-result';

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
    return this.http.post<ServerOperationResult>(
      env.apiBaseUrl + 'public/auth/register',
      { alias, email },
      { headers: this.getHttpHeaders(false) });
  }

  publicAuthActivatePOST(user: User, password: string): Observable<boolean> {
    const body = {
      ...user,
      password
    };

    return this.http.post<boolean>(
      env.apiBaseUrl + 'public/auth/activate',
      body,
      { headers: this.getHttpHeaders(false) });
  }

  publicUserByRegisterKeyGET(registerkey: string): Observable<User> {
    return this.http.get<User>(
      env.apiBaseUrl + 'public/user/by-register-key/' + registerkey,
      { headers: this.getHttpHeaders(false) });
  }

  publicAuthLoginPOST(email: string, password: string): Observable<TokenResponse> {
    return this.http
    .post<TokenResponse>(
      env.apiBaseUrl + 'public/auth/login',
      { email, password },
      { headers: this.getHttpHeaders(false) });
  }

  secureUserCurrentGET(): Observable<User> {
    return this.http.get<User>(
      env.apiBaseUrl + 'secure/user/current',
      { headers: this.getHttpHeaders() });
  }

  publicUserIsAliasAvailableGET(alias: string): Observable<boolean> {
    return this.http.get<boolean>(
      env.apiBaseUrl + 'public/user/is-alias-available/' + alias,
      { headers: this.getHttpHeaders(false) });
  }

  publicUserIsEmailAvailableGET(email: string): Observable<boolean> {
    return this.http.get<boolean>(
      env.apiBaseUrl + 'public/user/is-email-available/' + email,
      { headers: this.getHttpHeaders(false) });
  }

  secureSessionMineGET(): Observable<UserSession[]> {
    return this.http.get<UserSession[]>(
      env.apiBaseUrl + 'secure/session/mine',
      { headers: this.getHttpHeaders() } );
  }

  secureSessionNewPOST(machine_id: number, name: string): Observable<ServerOperationResult> {
    console.log(name);
    return this.http.post<ServerOperationResult>(
      env.apiBaseUrl + 'secure/session/new',
      {
        machine_id,
        name
      },
      { headers: this.getHttpHeaders() } );
  }

  secureUserMyMachinesGET(): Observable<Machine[]> {
    return this.http.get<Machine[]>(
      env.apiBaseUrl + 'secure/user/my-machines',
      { headers: this.getHttpHeaders() } );
  }

  secureUserRegisterMachinePOST(machinekey: string, name: string): Observable<ServerOperationResult> {
    return this.http.post<ServerOperationResult>(
      env.apiBaseUrl + 'secure/user/register-machine',
      { machinekey, name },
      { headers: this.getHttpHeaders() });
  }

  secureMachineByIdGET(machineid: number): Observable<Machine> {
    return this.http.get<Machine>(
      env.apiBaseUrl + 'secure/machine/by-id/' + machineid,
      { headers: this.getHttpHeaders() });
  }

  secureSessionSetActivePOST(sessionid: number): Observable<ServerOperationResult> {
    return this.http.post<ServerOperationResult>(
      env.apiBaseUrl + 'secure/session/set-active/' + sessionid,
      { },
      { headers: this.getHttpHeaders() }
    );
  }

  secureSessionByIdGET(sessionid: number): Observable<Session> {
    return this.http.get<Session>(
      env.apiBaseUrl + 'secure/session/by-id/' + sessionid,
      { headers: this.getHttpHeaders() }
    );
  }

  secureSessionSetStatePOST(sessionid: number, state: number) {
    return this.http.post<ServerOperationResult>(
      env.apiBaseUrl + 'secure/session/set-state/' + sessionid + '/' + state,
      { },
      { headers: this.getHttpHeaders() }
    );
  }

  secureUserByIdArrayPOST(ids: number[]) {
    return this.http.post<User[]>(
      env.apiBaseUrl + 'secure/user/by-id-array',
      { ids },
      { headers: this.getHttpHeaders() }
    );
  }

  secureSessionInvitePOST(sessionid: number, userid: number): Observable<ServerOperationResult> {
    return this.http.post<ServerOperationResult>(
      env.apiBaseUrl + `secure/session/invite/${sessionid}/${userid}`,
      {},
      { headers: this.getHttpHeaders() }
    );
  }

  secureUserMyInvitesGET(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(
      env.apiBaseUrl + 'secure/user/my-invites',
      { headers: this.getHttpHeaders() }
    );
  }

  secureUserSearchForSessionGET(sessionid: number, limit: number, offset: number, searchstring?: string): Observable<PageResult<User>> {
    return this.http.get<PageResult<User>>(
      (env.apiBaseUrl + `secure/user/search-for-session` +
      `?sessionid=${sessionid}` +
      `&limit=${limit}` +
      `&offset=${offset}` +
      (!!searchstring ? `&search=${searchstring}` : '')),
      { headers: this.getHttpHeaders() }
    );
  }

  secureSessionAcceptInvitePOST(sessionid: number): Observable<ServerOperationResult> {
    return this.http.post<ServerOperationResult>(
      env.apiBaseUrl + `secure/session/accept-invite/${sessionid}`,
      { },
      { headers: this.getHttpHeaders() }
    );
  }

  secureSessionDeclineInvitePOST(sessionid: number): Observable<ServerOperationResult> {
    return this.http.post<ServerOperationResult>(
      env.apiBaseUrl + `secure/session/decline-invite/${sessionid}`,
      { },
      { headers: this.getHttpHeaders() }
    );
  }
}
