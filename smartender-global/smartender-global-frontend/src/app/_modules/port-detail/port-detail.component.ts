import { MachineService } from './../../shared/machine.service';
import { PortData } from './../../shared/port-data';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Machine } from '../../shared/machine';

@Component({
  selector: 'sm-port-detail',
  templateUrl: './port-detail.component.html',
  styleUrls: ['./port-detail.component.scss']
})
export class PortDetailComponent implements OnInit {

  constructor(
    public machineService: MachineService
  ) { }

  @Input()
  port: PortData;

  @Input()
  machine: Machine;

  @Output()
  requestMaintenance = new EventEmitter<number>();

  @Output()
  requestCleaning = new EventEmitter<number>();

  ngOnInit() {

  }

  machineAvailable() {
    return this.machine.isAvailable && !this.port.blockReasons;
  }

  machineOperating() {
    return this.machine.isAvailable && (this.port.blockReasons && this.port.blockReasons.length);
  }

  machineUnavailable() {
    return !this.machine.isAvailable;
  }

  getDisplayText() {
    if (this.machineAvailable()) {
      return 'Available';
    } else if (this.machineOperating()) {
      return 'Operating';
    } else {
      return 'Unavailable';
    }
  }

}
