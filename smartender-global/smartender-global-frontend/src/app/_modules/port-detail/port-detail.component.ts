import { PortData } from './../../shared/port-data';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sm-port-detail',
  templateUrl: './port-detail.component.html',
  styleUrls: ['./port-detail.component.scss']
})
export class PortDetailComponent implements OnInit {

  constructor() { }

  @Input()
  port: PortData;



  ngOnInit() {
  }

}
