import { MachineService } from './../../shared/machine.service';
import { map, switchMap, subscribeOn, merge } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Machine } from '../../shared/machine';

@Component({
  selector: 'sm-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.scss']
})
export class MachineDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private machineService: MachineService) { }

  id$: Observable<number>;

  machine$: Observable<Machine>;

  machine: Machine = {
    id: 0,
    owner_id: 0,
    name: '',
    ports: [],
    isAvailable: false
  };

  ngOnInit() {
    this.id$ = this.route.params.pipe(map(params => params['id']));

    const getById = this.id$.pipe(switchMap(id => this.machineService.getMachineById(id)));
    const bySocket = this.id$.pipe(switchMap(id => this.machineService.subscribeMachineById(id)));

    this.machine$ = bySocket.pipe(merge(getById));

    this.machine$.subscribe(machine => {
      this.machine = machine;
    });

  }

  requestCleaning(portId: number) {
    this.machineService.clean(this.machine.id, portId).subscribe();
  }

  requestMaintenance(portId: number) {
    this.machineService.maintenance(this.machine.id, portId).subscribe();
  }
}
