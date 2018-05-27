import { RegisterMachine } from './../../store/actions/machine.actions';
import { getCreateMachineForm, getCreateMachineErrorMessage } from './../../store/selectors/machine.selectors';
import { FormGroupState, ValidationErrors } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { UserService } from './../../shared/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CreateMachineFormValue } from '../../store/reducers/machine.reducers';
import { Store, select } from '@ngrx/store';
import { State } from '../../store/reducers';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'sm-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.scss']
})
export class CreateMachineComponent implements OnInit {

  createMachineForm$: Observable<FormGroupState<CreateMachineFormValue>>;
  errorMessage$: Observable<string>;
  machineKeyErrors$: Observable<ValidationErrors>;
  nameErrors$: Observable<ValidationErrors>;

  constructor(
    private userService: UserService,
    private store: Store<State>
  ) { }

  createNewForm: FormGroup;

  errorMessage: string;

  submitted: boolean;

  ngOnInit() {
    this.createMachineForm$ = this.store.pipe(
      select(getCreateMachineForm)
    );

    this.errorMessage$ = this.store.pipe(
      select(getCreateMachineErrorMessage)
    );

    this.machineKeyErrors$ = this.createMachineForm$.pipe(
      filter(form => !!form),
      map(form => form.controls.machinekey),
      filter(machinekey => machinekey.isTouched),
      map(machinekey => machinekey.errors)
    );

    this.nameErrors$ = this.createMachineForm$.pipe(
      filter(form => !!form),
      map(form => form.controls.name),
      filter(name => name.isTouched),
      map(name => name.errors)
    );
  }

  onRegister() {
    this.store.dispatch(new RegisterMachine());
  }

}
