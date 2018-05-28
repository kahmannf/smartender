import { switchMap } from 'rxjs/operators';
import { SessionService } from './../../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { UserSession } from '../../shared/user-session';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../../store/reducers';
import { getUserSessions } from '../../store/selectors/session.selectors';

@Component({
  selector: 'sm-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  sessions$: Observable<UserSession[]>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {

    this.sessions$ = this.store.pipe(select(getUserSessions));
  }

}
