import { UserSession } from './../../shared/user-session';
import { UserService } from './../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from './../../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { map, switchMap, merge } from 'rxjs/operators';
import { Session } from '../../shared/session';
import { User } from '../../shared/user';
import { of } from 'rxjs';

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

  members: [User, UserSession][];

  ngOnInit() {
    this.initSessionObservables();

    this.userService.getCurrentUser().subscribe(
      user => this.currentUser = user
    );
  }

  initSessionObservables() {const id$ = this.route.params
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
          session => this.session = session
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
                result.push([user, sessUser]);
              } else {
                result.push([user, undefined]);
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

  canEdit() {
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

}
