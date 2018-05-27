import { map, switchMap } from 'rxjs/operators';
import { Machine } from './../../shared/machine';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../../store/reducers';
import { getUserMachines } from '../../store/selectors/machine.selectors';
import { SelectMachine } from '../../store/actions/machine.actions';

@Component({
  selector: 'sm-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {

  machines$: Observable<Machine[]>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {

    this.machines$ = this.store.pipe(
      select(getUserMachines)
    );
  }

  selectMachine(machine: Machine) {
    this.store.dispatch(new SelectMachine(machine));
  }

}
