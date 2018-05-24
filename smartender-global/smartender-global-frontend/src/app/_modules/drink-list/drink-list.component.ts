import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Drink } from '../../shared/drink';

@Component({
  selector: 'sm-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.scss']
})
export class DrinkListComponent implements OnInit {

  constructor() { }

  @Output() drinkSelected = new EventEmitter<Drink>();

  ngOnInit() {
  }

}
