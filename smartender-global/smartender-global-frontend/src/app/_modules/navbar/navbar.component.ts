import { Invitation } from './../../shared/invitation';
import { UserService } from './../../shared/user.service';
import { AuthService } from './../../shared/auth.service';
import { environment } from './../../../environments/environment';
import { SessionService } from './../../shared/session.service';
import { UserSession } from './../../shared/user-session';
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'sm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  sessions: UserSession[];

  activeSession: UserSession = {
    session_id: 0,
    user_id: 0,
    can_edit_machine: 0,
    is_owner: 0,
    is_user_active_session: 0,
    name: '',
    active: 0
  };

  projectName: string;

  currentUser: User = {
    id: 0,
    alias: '',
    email: '',
    registerkey: '',
    iat: 0,
    exp: 0
  };

  invites: Invitation[] = [];

  ngOnInit() {
    this.projectName = environment.projectName;

    const resultHandler = (result: UserSession[]) => {
      const resultArray = [];

      this.activeSession = {
        session_id: 0,
        user_id: 0,
        can_edit_machine: 0,
        is_owner: 0,
        is_user_active_session: 0,
        name: '',
        active: 0
      };

      for (let i = 0; i < result.length; i++) {
        if (result[i].active) {
          if (result[i].is_user_active_session) {
            this.activeSession = result[i];
          }
          resultArray.push(result[i]);
        }
      }

      this.sessions = resultArray;
    };

    this.userService.getCurrentUser()
    .subscribe(user =>  {
      this.currentUser = user;


      this.userService.getInvitesUpdates(user.id)
      .subscribe(invites => this.invites = invites);

      this.sessionService.getSessionsUpdates(user.id)
      .subscribe(resultHandler);
    });

    this.sessionService.getMySessions()
    .subscribe(resultHandler);

    this.userService.getInvites()
    .subscribe(invites => this.invites = invites);
  }

  getSessionLabelText() {
    if (this.activeSession && this.activeSession.session_id) {
      return 'Session: ' + this.activeSession.name;
    } else if (this.sessions) {
      return `Sessions (${this.sessions.length})`;
    } else {
      return `Sessions (0)`;
    }
  }

  setActiveSession(session: UserSession) {
    this.sessionService.setActiveSession(session.session_id).subscribe();
  }

  logout() {
    this.authService.logout();
  }

}
