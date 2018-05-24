import { Component, OnInit, Input } from '@angular/core';
import { FormCanDeactivate } from '../form-can-deactivate';
import { FormGroup } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient';

@Component({
  selector: 'sm-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.scss']
})
export class EditIngredientComponent extends FormCanDeactivate implements OnInit {

  form: FormGroup;

  @Input() ingredient: Ingredient;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
