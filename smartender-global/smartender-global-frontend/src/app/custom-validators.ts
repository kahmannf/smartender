import { map } from 'rxjs/operators';
import { UserService } from './shared/user.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

// ^         Start of string
// [a-z0-9]  a or b or c or ... z or 0 or 1 or ... 9
// +         one or more times (change to * to allow empty string)
// *         zero or more times (change to * to allow empty string)
// $         end of string
// /i        case-insensitive

@Injectable()
export class CustomValidators {

  static userService: UserService;

  constructor(private userService: UserService) {
    CustomValidators.userService = userService;
  }

  alphanumric(control: AbstractControl) {
    const value = control.value;

    const regex = new RegExp(/^[a-z0-9 ]*$/i);

    if (value) {
      if (!regex.test(value)) {
        return { alphanumeric: true };
      }
    }

    return null;
  }

  emailformat(control: AbstractControl) {
    const value = control.value;

    // https://stackoverflow.com/a/201447/9055931
    const regex = new RegExp(/^\S+@\S+\.\S+$/);


    if (value) {
      if (!regex.test(value)) {
        return { emailformat: true };
      }
    }

    return null;
  }

  aliasavailable(control: AbstractControl) {
    const value = control.value;


    if (value) {
      return CustomValidators.userService.checkAliasAvailable(value)
      .pipe(
        map(result => {
          console.log('Alias available: ' + !!result);

          if (result) {
            return null;
          } else {
            return { available: true };
          }
        })
      );
    }

    return null;
  }

  emailavailable(control: AbstractControl) {
    const value = control.value;

    if (value) {
      return CustomValidators.userService.checkEmailAvailable(value)
      .pipe(
        map(result => {
          console.log('Email available: ' + !!result);
          if (result) {
            return null;
          } else {
            return { available: true };
          }
        })
      );
    }

    return null;
  }
}
