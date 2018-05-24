import { Ingredient } from './../../shared/ingredient';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sm-manage-ingredients',
  templateUrl: './manage-ingredients.component.html',
  styleUrls: ['./manage-ingredients.component.scss']
})
export class ManageIngredientsComponent implements OnInit {

  constructor() { }

  seletedIngredient: Ingredient;

  ngOnInit() {
  }

  ingredientSelected(ingredient: Ingredient) {
    this.seletedIngredient = ingredient;
  }

}
