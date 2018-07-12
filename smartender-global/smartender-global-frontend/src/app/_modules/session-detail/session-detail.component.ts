import { getSearchResult, getUserSearchForm } from './../../store/selectors/session.selectors';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSession } from './../../shared/user-session';
import { UserService } from './../../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './../../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { map, switchMap, merge, filter } from 'rxjs/operators';
import { Session } from '../../shared/session';
import { User } from '../../shared/user';
import { of, Observable } from 'rxjs';
import { PageResult } from '../../shared/page-result';
import { State } from '../../store/reducers';
import { Store, select } from '@ngrx/store';
import {
  LoadSession,
  DeactivateSession,
  ActivateSession,
  GetNextSearchPage,
  GetPreviousSearchPage
} from '../../store/actions/session.actions';
import { getDetailSession, getDetailSessionMembers } from '../../store/selectors/session.selectors';
import { getCurrentUser } from '../../store/selectors/user.selectors';
import { FormGroupState } from 'ngrx-forms';
import { SearchFormValue } from '../../store/reducers/session.reducers';

@Component({
  selector: 'sm-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnInit {

  session$: Observable<Session>;
  user$: Observable<User>;
  sessionMembers$: Observable<[User, UserSession][]>;

  userSearchFormState$: Observable<FormGroupState<SearchFormValue>>;
  userSearchResult$: Observable<PageResult<User>>;

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private store: Store<State>
  ) { }


  ngOnInit() {

    this.session$ = this.store.pipe(
      select(getDetailSession)
    );

    this.user$ = this.store.pipe(
      select(getCurrentUser)
    );

    this.sessionMembers$ = this.store.pipe(
      select(getDetailSessionMembers)
    );

    this.userSearchResult$ = this.store.pipe(
      select(getSearchResult)
    );

    this.userSearchFormState$ = this.store.pipe(
      select(getUserSearchForm)
    );

    this.route.params.pipe(
      map(params => params['id']),
      filter(id => !!id),
      map(id => this.store.dispatch(new LoadSession(id)))
    ).subscribe();

  }


  canEditSession(session: Session, user: User) {
    if (user && session) {
      if (user.id === session.owner_id) {
        return true;
      } else if (session.members) {
        // tslint:disable-next-line:prefer-const
        for (let member of session.members) {
          if (member.user_id === user.id && member.can_edit_session) {
            return true;
          }
        }
      }
    }

    return false;
  }

  canEditMachine(session: Session, user: User) {
    if (user && session) {
      if (user.id === session.owner_id) {
        return true;
      } else if (session.members) {
        // tslint:disable-next-line:prefer-const
        for (let member of session.members) {
          if (member.user_id === user.id && member.can_edit_machine) {
            return true;
          }
        }
      }
    }

    return false;
  }

  deactivateSession(id: number) {
    this.store.dispatch(new DeactivateSession(id));
  }

  activateSession(id: number) {
    this.store.dispatch(new ActivateSession(id));
  }

  canGetNext(result: PageResult<User>) {
    return !!result && (result.total - result.limit) > (result.offset * result.limit);
  }

  canGetPrevious(result: PageResult<User>) {
    return !!result && result.offset > 0;
  }

  getNext() {
    this.store.dispatch(new GetNextSearchPage());
  }

  getPrevious() {
    this.store.dispatch(new GetPreviousSearchPage());
  }

  getResultText(userSearchResult: PageResult<User>) {
    let result = 'Results ' + ((userSearchResult.offset * userSearchResult.limit) + 1);
    result += ' - ';
    if ((userSearchResult.offset + 1) * userSearchResult.limit > userSearchResult.total) {
      result += userSearchResult.total;
    } else {
      result += ((userSearchResult.offset + 1) * userSearchResult.limit);
    }

    result += ' of ' + userSearchResult.total;
    return result;
  }

  invite(userid: number) {
  }

  refresh() {
  }

  allowMachineEdit(userid: number) {

  }

  allowSessionEdit(userid: number) {

  }

  denyMachineEdit(userid: number) {

  }

  denySessionEdit(userid: number) {

  }

  kick(userid: number) {

  }

  delete() {
  }

  leave() {
  }
}
