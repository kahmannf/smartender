import { CompleteRegisterFormValue } from './../../store/reducers/complete-register.reducers';
import { FormGroupState, AbstractControlState } from 'ngrx-forms';
import { SubmitForm } from './../../store/actions/complete-register.actions';
import { AuthService } from './../../shared/auth.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from './../../shared/user.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../../shared/user';
import { environment } from '../../../environments/environment';
import { Store, select } from '@ngrx/store';
import { State } from '../../store/reducers';
import * as selectors from '../../store/selectors/complete-register.selectors';
import { getProjectName } from '../../store/selectors/utils.selectors';

@Component({
  selector: 'sm-complete-register',
  templateUrl: './complete-register.component.html',
  styleUrls: ['./complete-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompleteRegisterComponent implements OnInit {

  user$: Observable<User>;
  errorMessage$: Observable<string>;
  formState$: Observable<FormGroupState<CompleteRegisterFormValue>>;
  controlPassword$: Observable<AbstractControlState<string>>;
  controlPasswordRepeat$: Observable<AbstractControlState<string>>;
  errorsPassword$: Observable<ValidationErrors>;
  errorsPasswordRepeat$: Observable<ValidationErrors>;
  projectName$: Observable<string>;

  constructor(
    private store: Store<State>) { }

  ngOnInit() {

    this.projectName$ = this.store.pipe(
      select(getProjectName)
    );

    this.user$ = this.store.pipe(
      select(selectors.getUser)
    );

    this.errorMessage$ = this.store.pipe(
      select(selectors.getErrorMessage)
    );

    this.formState$ = this.store.pipe(
      select(selectors.completeRegisterFormState)
    );


    this.controlPassword$ = this.store.pipe(
      select(selectors.controlPassword),
    );

    this.controlPasswordRepeat$ = this.store.pipe(
      select(selectors.controlPasswordRepeat),
    );

    this.errorsPassword$ = this.controlPassword$.pipe(
      filter(control => control.isTouched),
      map(control => {
        return control.errors;
      })
    );


    this.errorsPasswordRepeat$ = this.controlPasswordRepeat$.pipe(
      filter(control => control.isTouched),
      map(control => {
        return control.errors;
      })
    );
  }

  complete() {
    this.store.pipe(select(selectors.getUser)).subscribe(user => {
      this.store.dispatch(new SubmitForm());
    });
  }

  passwordValidator(control: AbstractControl) {
    const controlPw = control.get('password');
    const controlPwR = control.get('passwordRepeat');

    if (controlPw && controlPwR) {
      const password = controlPw.value;
      const passwordRepeat = controlPwR.value;

      if (password && passwordRepeat) {
        if (password !== passwordRepeat) {
          control.get('passwordRepeat').setErrors({ match: true });
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

}
