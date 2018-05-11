import { map, switchMap } from 'rxjs/operators';
import { Machine } from './../../shared/machine';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'sm-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {

  constructor(private userService: UserService) { }

  machines: Machine[];

  ngOnInit() {
    this.userService.getMyMachines()
    .subscribe(
      result => {
        this.machines = result;
      });

    this.userService.machineRegistered
    .pipe(
      switchMap(result => {
        return this.userService.getMyMachines();
      })
    ).subscribe(
      result => {
        this.machines = result;
      });
  }

}
