import { DrinkService } from './../../shared/drink.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormCanDeactivate } from '../form-can-deactivate';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient';

@Component({
  selector: 'sm-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.scss']
})
export class EditIngredientComponent extends FormCanDeactivate implements OnInit {

  form: FormGroup;

  @Input() set ingredient(ingredient: Ingredient) {
    if (ingredient) {
      this.form.setValue(ingredient);
    } else {
      this.form.setValue({
        name: '',
        id: '',
        alcvol: '',
        user_id: 0
      });
    }
  }

  @Output() ingredientUpdated = new EventEmitter<any>();

  constructor(
    private drinkService: DrinkService
  ) {
    super();
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      id: new FormControl(''),
      alcvol: new FormControl('', [Validators.min(0), Validators.max(100)]),
      user_id: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.form.invalid) {

    } else {

      const ingredient: Ingredient = {
        name: this.form.value.name,
        id: this.form.value.id,
        alcvol: this.form.value.alcvol,
        user_id: this.form.value.user_id,
      };



      if (ingredient.id && ingredient.user_id) {
        // Todo: Update
      } else {
        this.drinkService.addIngredient(ingredient).subscribe(x => {

          if (this.form.value.id && this.form.value.user_id) {
            this.form.setValue(this.form.value);
          } else {
            this.form.reset();
          }
        });
      }
    }
  }
}
