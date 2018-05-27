import { AcceptInvite, DeclineInvite, Logout } from './../../store/actions/user.actions';
import { MachineService } from './../../shared/machine.service';
import { Invitation } from './../../shared/invitation';
import { UserService } from './../../shared/user.service';
import { AuthService } from './../../shared/auth.service';
import { environment } from './../../../environments/environment';
import { SessionService } from './../../shared/session.service';
import { UserSession } from './../../shared/user-session';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../shared/user';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Machine } from '../../shared/machine';
import { Store, select } from '@ngrx/store';
import { State } from '../../store/reducers';
import { getProjectName } from '../../store/selectors/utils.selectors';
import * as sessionSelectors from '../../store/selectors/session.selectors';
import * as userSelectors from '../../store/selectors/user.selectors';
import { SetActiveSession } from '../../store/actions/session.actions';

@Component({
  selector: 'sm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  sessions$: Observable<UserSession[]>;
  activeSession$: Observable<UserSession>;
  currentUser$: Observable<User>;
  invites$: Observable<Invitation[]>;
  projectName$: Observable<string>;

  constructor(
    private store: Store<State>
  ) { }

  machineObservable: Observable<Machine>;

  ngOnInit() {
    this.projectName$ = this.store.pipe(
      select(getProjectName)
    );

    this.sessions$ = this.store.pipe(
      select(sessionSelectors.getUserSessions)
    );

    this.activeSession$ = this.store.pipe(
      select(sessionSelectors.getActiveSession)
    );

    this.invites$ = this.store.pipe(
      select(userSelectors.getInvites)
    );

    this.currentUser$ = this.store.pipe(
      select(userSelectors.getCurrentUser)
    );
  }

  getSessionLabelText(activeSession: UserSession, sessions: UserSession[]) {
    if (activeSession && activeSession.session_id) {
      return 'Session: ' + activeSession.name;
    } else if (sessions) {
      return `Sessions (${sessions.length})`;
    } else {
      return `Sessions (0)`;
    }
  }

  setActiveSession(session: UserSession) {
    this.store.dispatch(new SetActiveSession(session));
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  acceptInvite(invite: Invitation) {
    this.store.dispatch(new AcceptInvite(invite));
  }

  declineInvite(invite: Invitation) {
    this.store.dispatch(new DeclineInvite(invite));
  }
}
