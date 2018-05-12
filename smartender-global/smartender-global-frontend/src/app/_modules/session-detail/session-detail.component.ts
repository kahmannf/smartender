import { UserService } from './../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from './../../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { map, switchMap, merge } from 'rxjs/operators';
import { Session } from '../../shared/session';
import { User } from '../../shared/user';

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

        initial$.pipe(merge(updates$), merge(user_updates$)).subscribe(
          session => this.session = session
        );
      }
    );

  }

  isOwner() {
    if (this.currentUser && this.session) {
      return this.currentUser.id === this.session.owner_id;
    } else {
      return false;
    }
  }

  deactivateSession() {
    this.sessionService.deactivateSession(this.session.id).subscribe();
  }

  activateSession() {
    this.sessionService.activateSession(this.session.id).subscribe();
  }

}
