import { SessionService } from './../../shared/session.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Machine } from '../../shared/machine';

@Component({
  selector: 'sm-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss']
})
export class CreateSessionComponent implements OnInit {

  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) { }

  createSessionForm: FormGroup;

  machines: Machine[];

  submitted = false;

  errorMessage: string;

  ngOnInit() {
    this.userService.getMyMachines().subscribe(result => this.machines = result);

    this.createSessionForm = new FormGroup({
      machineid: new FormControl(0, Validators.min(1)),
      name: new FormControl('', Validators.required)
    });
  }

  onCreate() {
    if (this.createSessionForm.invalid) {
      this.submitted = true;
      console.log(this.createSessionForm.get('name').errors);
    } else {
      this.sessionService
      .createSession(
        this.createSessionForm.value.name,
        this.createSessionForm.value.machineid
      ).subscribe(result => {
        if (result.success) {
          this.createSessionForm.reset();
          this.sessionService.navigateToActiveSession();
        } else {
          this.errorMessage = result.message;
        }
      }, err => {
        this.errorMessage = 'Oops, something went wrong! Please try again later.';
      });

      this.submitted = false;
      this.errorMessage = '';
    }
  }

  hasError(name: string, error: string) {
    const control = this.createSessionForm.get(name);
    return control.hasError(error) && (control.dirty || this.submitted);
  }

}
