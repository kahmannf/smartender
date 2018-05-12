import { UserService } from './../../shared/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sm-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.scss']
})
export class CreateMachineComponent implements OnInit {

  constructor(private userService: UserService) { }

  createNewForm: FormGroup;

  errorMessage: string;

  submitted: boolean;

  ngOnInit() {
    this.createNewForm = new FormGroup({
      machinekey: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      name: new FormControl('', Validators.required)
    });
  }

  hasError(name: string) {
    const control = this.createNewForm.get(name);
    return control.invalid && (control.dirty || this.submitted);
  }

  onRegister() {
    if (this.createNewForm.invalid) {
      this.submitted = true;
    } else {
      this.userService.registerMachine(
        this.createNewForm.value.machinekey,
        this.createNewForm.value.name)
      .subscribe(result => {
        if (result && result.success) {
          this.createNewForm.reset();
        } else if (result) {
          this.errorMessage = result.message;
        } else {
          this.errorMessage = 'Oops, something went wrong! Please try again later.';
        }
      }, err => {
        this.errorMessage = 'Oops, something went wrong! Please try again later.';
      });
      this.submitted = false;
      this.errorMessage = '';
    }
  }

}
