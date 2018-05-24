import { Component, OnInit } from '@angular/core';
import { FormCanDeactivate } from '../form-can-deactivate';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sm-edit-drink',
  templateUrl: './edit-drink.component.html',
  styleUrls: ['./edit-drink.component.scss']
})
export class EditDrinkComponent extends FormCanDeactivate implements OnInit {

  form: FormGroup;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
