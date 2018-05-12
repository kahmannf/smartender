import { switchMap } from 'rxjs/operators';
import { SessionService } from './../../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { UserSession } from '../../shared/user-session';

@Component({
  selector: 'sm-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  constructor(
    private sessionService: SessionService
  ) { }

  sessions: UserSession[] = [];

  ngOnInit() {

    this.sessionService.getMySessions().subscribe(
      result => {
        this.sessions = result;
      }
    );

    this.sessionService.sessionCreated
    .pipe(
      switchMap(result => this.sessionService.getMySessions())
    )
    .subscribe(result =>  this.sessions = result);
  }

}
