import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'sm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  loginForm: FormGroup;

  errorMessage = '';

  submitted = false;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.submitted = true;
    } else {
      this.auth.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Ooppps, Seems like something went wrong! Please try again later.';
        }
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.errorMessage = 'Invalid email/password combination!';
          } else {
            this.errorMessage = 'Ooppps, Seems like something went wrong! Please try again later.';
          }
        }
      });
      this.submitted = false;
      this.errorMessage = '';
    }
  }

  isInvalid(name: string, errorCode: string) {
    const control = this.loginForm.get(name);
    return control.hasError(errorCode) && (control.dirty || this.submitted);
  }

}
