import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { State } from '../../store/reducers';
import { LoginFormValue } from '../../store/reducers/login.reducers';
import * as selectors from '../../store/selectors/login.selectors';
import { AuthService } from '../../shared/auth.service';
import { filter, map } from 'rxjs/operators';
import { LoginSubmitForm } from '../../store/actions/login.actions';
import { getProjectName } from '../../store/selectors/utils.selectors';

@Component({
  selector: 'sm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormState$: Observable<FormGroupState<LoginFormValue>>;
  errorMessage$: Observable<string>;
  errorEmail$: Observable<ValidationErrors>;
  errorPassword$: Observable<ValidationErrors>;
  projectName$: Observable<string>;

  constructor(
    private store: Store<State>,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.projectName$ = this.store.pipe(
      select(getProjectName)
    );

    this.errorMessage$ = this.store.pipe(
      select(selectors.getLoginErrorMessage)
    );

    this.loginFormState$ = this.store.pipe(
      select(selectors.getLoginForm)
    );

    this.errorEmail$ = this.store.pipe(
      select(selectors.loginEmailControl),
      filter(control => control.isTouched),
      map(control => control.errors)
    );

    this.errorPassword$ = this.store.pipe(
      select(selectors.loginPasswordControl),
      filter(control => control.isTouched),
      map(control => control.errors)
    );
  }

  login() {
    this.store.dispatch(new LoginSubmitForm());
  }


}
