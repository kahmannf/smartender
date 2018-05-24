import { IngredientListComponent } from './../ingredient-list/ingredient-list.component';
import { Ingredient } from './../../shared/ingredient';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'sm-manage-ingredients',
  templateUrl: './manage-ingredients.component.html',
  styleUrls: ['./manage-ingredients.component.scss']
})
export class ManageIngredientsComponent implements OnInit {

  constructor() { }

  seletedIngredient: Ingredient;

  @ViewChild(IngredientListComponent)
  ingredientList: IngredientListComponent;

  ngOnInit() {
  }

  ingredientSelected(ingredient: Ingredient) {
    this.seletedIngredient = ingredient;
  }

  updateList() {
    this.ingredientList.reload();
  }

}
