import { MachineService } from './../../shared/machine.service';
import { map, switchMap, subscribeOn, merge } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Machine } from '../../shared/machine';
import { Store, select } from '@ngrx/store';
import { State } from '../../store/reducers';
import { getSelectedMachine } from '../../store/selectors/machine.selectors';

@Component({
  selector: 'sm-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.scss']
})
export class MachineDetailComponent implements OnInit {

  machine$: Observable<Machine>;

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit() {
    this.machine$ = this.route.params.pipe(
      switchMap(() => this.store.pipe(select(getSelectedMachine)))
    );

  }
}
