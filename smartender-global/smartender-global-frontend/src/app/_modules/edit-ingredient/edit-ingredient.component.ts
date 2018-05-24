import { Component, OnInit } from '@angular/core';
import { FormCanDeactivate } from '../form-can-deactivate';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sm-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.scss']
})
export class EditIngredientComponent extends FormCanDeactivate implements OnInit {

  form: FormGroup;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
