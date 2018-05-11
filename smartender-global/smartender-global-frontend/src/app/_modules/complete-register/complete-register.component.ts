import { AuthService } from './../../shared/auth.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../../shared/user';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'sm-complete-register',
  templateUrl: './complete-register.component.html',
  styleUrls: ['./complete-register.component.scss']
})
export class CompleteRegisterComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private authService: AuthService) { }

  user: User = {
    email: undefined,
    alias: undefined,
    registerkey: undefined,
    id: 0,
    iat: 0,
    exp: 0
  };

  registerForm: FormGroup;

  errorMessage: string;

  submitted = false;

  projectName: string;

  ngOnInit() {

    this.projectName = environment.projectName;

    this.route.params
    .pipe(
      map(params => params['registerkey']),
      switchMap(key => this.userService.getByRegisterKey(key))
    ).subscribe(
    user => {
      if (user) {
        this.user = user;
      } else {
        this.router.navigate(['/login']);
      }
    },
    err => {
      this.router.navigate(['/login']);
    });

    this.registerForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordRepeat: new FormControl('')
    }, this.passwordValidator);
  }

  hasError(name: string) {
    const control = this.registerForm.get(name);
    return control.invalid && (control.dirty || this.submitted);
  }

  complete() {
    if (this.registerForm.invalid) {
      this.submitted = true;
    } else {
      this.authService.activateAccount(
        this.user,
        this.registerForm.value.password)
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['/login']);
            } else {
              this.errorMessage = 'Oops, something went wrong! Please try again later.';
            }
          },
          err => {
            this.errorMessage = err;
          });

      this.errorMessage = '';
      this.submitted = false;
    }
  }

  passwordValidator(control: AbstractControl) {
    const controlPw = control.get('password');
    const controlPwR = control.get('passwordRepeat');

    if (controlPw && controlPwR) {
      const password = controlPw.value;
      const passwordRepeat = controlPwR.value;

      if (password && passwordRepeat) {
        if (password !== passwordRepeat) {
          console.log('hey');
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
