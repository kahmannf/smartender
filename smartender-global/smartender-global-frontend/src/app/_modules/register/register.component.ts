import { environment } from './../../../environments/environment';
import { AuthService } from './../../shared/auth.service';
import { CustomValidators } from './../../custom-validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private custValidators: CustomValidators,
    private authService: AuthService
  ) { }

  registerForm: FormGroup;

  errorMessage: string;

  submitted = false;

  success = false;

  projectName: string;

  ngOnInit() {
    this.projectName = environment.projectName;

    this.registerForm = new FormGroup({
      alias: new FormControl('', [Validators.required, this.custValidators.alphanumricwhitespace], this.custValidators.aliasavailable),
      email: new FormControl('', [Validators.required, this.custValidators.emailformat], this.custValidators.emailavailable)
    });
  }

  hasError(name: string, error: string) {
    const control = this.registerForm.get(name);
    return control.hasError(error) && (control.dirty || this.submitted);
  }

  isValueAvailable(name: string ) {
    const control = this.registerForm.get(name);
    return control.hasError('available');
  }

  register() {

    if (this.registerForm.invalid) {
      this.submitted = true;
    } else {

      this.authService.register({...this.registerForm.value })
      .subscribe(
        result => {
          if (result.success) {
            this.success = true;
          } else {
            this.errorMessage = result.message;
          }
        },
        err => {
          this.errorMessage = 'Oops, something went wrong! Please try again later.';
        }
      );

      this.errorMessage = '';
      this.submitted = false;
    }
  }
}
