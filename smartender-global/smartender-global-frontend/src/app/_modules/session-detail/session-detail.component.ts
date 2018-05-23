import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSession } from './../../shared/user-session';
import { UserService } from './../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from './../../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { map, switchMap, merge } from 'rxjs/operators';
import { Session } from '../../shared/session';
import { User } from '../../shared/user';
import { of } from 'rxjs';
import { PageResult } from '../../shared/page-result';

@Component({
  selector: 'sm-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnInit {

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  session: Session;
  currentUser: User;

  lastSearch: string;

  userSearchResult: PageResult<User>;

  members: [User, UserSession][];

  searchForm: FormGroup;

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchValue: new FormControl('')
    });

    this.searchForm.valueChanges.subscribe(values => {
      this.search();
    });

    this.initSessionObservables();

    this.userService.getCurrentUser().subscribe(
      user => this.currentUser = user
    );
  }

  initSessionObservables() {
    const id$ = this.route.params
    .pipe(
      map(params => params['id'])
    );

    const initial$ = id$
    .pipe(
      switchMap(id => this.sessionService.getSessionById(id))
    );

    const updates$ = id$
    .pipe(
      switchMap(id => this.sessionService.getSessionUpdates(id))
    );

    this.userService.getCurrentUser().subscribe(
      user => {

        const user_updates$ = id$
        .pipe(
          switchMap(id => this.sessionService.getSessionsUpdates(user.id)
            .pipe(
              map(something => id)// allways return id for this sequence
            )
          ),
          switchMap(id => this.sessionService.getSessionById(id))
        );

        const all$ = initial$.pipe(merge(updates$), merge(user_updates$));

        all$.subscribe(
          session => this.session = session,
          error => console.log('error in sessiondetail component obseravable')
        );

        const updateMembers$ = all$
        .pipe(
          switchMap(session => {
            if (session.members) {
              const ids = [];
              // tslint:disable-next-line:prefer-const
              for (let member of session.members) {
                ids.push(member.user_id);
              }

              if (ids.length > 0) {
                return this.userService.getByIdArray(ids);
              } else {
                return of<User[]>([]);
              }

            } else {
              return of<User[]>([]);
            }
          })
        );

        updateMembers$.subscribe(users => {
          if (users && users.length) {
            const result: [User, UserSession][] = [];
            // tslint:disable-next-line:prefer-const
            for (let res_user of users) {
              if (this.session && this.session.members) {
                const sessUser = this.session.members.find(us => us.user_id === res_user.id);
                result.push([res_user, sessUser]);
              } else {
                // result.push([res_user, undefined]);
              }
            }
            this.members = result;
          } else {
            this.members = [];
          }
        });
      }
    );

  }

  canEditSession() {
    if (this.currentUser && this.session) {
      if (this.currentUser.id === this.session.owner_id) {
        return true;
      } else if (this.session.members) {
        // tslint:disable-next-line:prefer-const
        for (let member of this.session.members) {
          console.log(member);
          if (member.user_id === this.currentUser.id && member.can_edit_session) {
            return true;
          }
        }
      }
    }

    return false;
  }

  canEditMachine() {
    if (this.currentUser && this.session) {
      if (this.currentUser.id === this.session.owner_id) {
        return true;
      } else if (this.session.members) {
        // tslint:disable-next-line:prefer-const
        for (let member of this.session.members) {
          if (member.user_id === this.currentUser.id && member.can_edit_machine) {
            return true;
          }
        }
      }
    }

    return false;
  }

  deactivateSession() {
    this.sessionService.deactivateSession(this.session.id).subscribe();
  }

  activateSession() {
    this.sessionService.activateSession(this.session.id).subscribe();
  }

  search() {
    if (this.lastSearch !== this.searchForm.value.searchValue) {
      this.lastSearch = this.searchForm.value.searchValue;
      this.userService.searchFoSession(this.session.id, 20, 0, this.searchForm.value.searchValue)
      .subscribe(page => {
        this.userSearchResult = page;
      });
    }
  }

  canGetNext() {
    return this.userSearchResult
    && (this.userSearchResult.limit * (this.userSearchResult.offset + 1)) < this.userSearchResult.total;
  }

  canGetPrevious() {
    return this.userSearchResult && this.userSearchResult.offset > 0;
  }

  getNext() {
    this.userService.searchFoSession(this.session.id, 20, this.userSearchResult.offset + 1, this.searchForm.value.searchValue)
    .subscribe(page => {
      this.userSearchResult = page;
    });
  }

  getPrevious() {
    this.userService.searchFoSession(this.session.id, 20, this.userSearchResult.offset - 1, this.searchForm.value.searchValue)
    .subscribe(page => {
      this.userSearchResult = page;
    });
  }

  getResultText() {
    let result = 'Results ' + ((this.userSearchResult.offset * this.userSearchResult.limit) + 1);
    result += ' - ';
    if ((this.userSearchResult.offset + 1) * this.userSearchResult.limit > this.userSearchResult.total) {
      result += this.userSearchResult.total;
    } else {
      result += ((this.userSearchResult.offset + 1) * this.userSearchResult.limit);
    }

    result += ' of ' + this.userSearchResult.total;
    return result;
  }

  invite(userid: number) {
    this.sessionService.inviteUser(this.session.id, userid).subscribe(trigger => {
      this.refresh();
    });
  }

  refresh() {
    this.userService.searchFoSession(this.session.id, 20, this.userSearchResult.offset, this.searchForm.value.searchValue)
    .subscribe(page => {
      this.userSearchResult = page;
    });
  }

  delete() {
    this.sessionService.deleteSession(this.session.id).subscribe();
  }

  leave() {
    this.sessionService.leaverSession(this.session.id).subscribe();
  }
}
