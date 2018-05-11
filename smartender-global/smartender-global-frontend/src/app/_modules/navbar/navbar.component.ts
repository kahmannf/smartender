import { environment } from './../../../environments/environment';
import { SessionService } from './../../shared/session.service';
import { UserSession } from './../../shared/user-session';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  session_dropdown_label = 'Sessions';

  sessions: UserSession[];

  projectName: string;

  ngOnInit() {
    this.projectName = environment.projectName;

    this.sessionService.getMySessions()
    .subscribe(
      result => {
        this.sessions = result;
        this.session_dropdown_label = `Sessions (${result.length})`;
      },
      err => {
        this.session_dropdown_label = 'No sessions available';
      });
  }

}
