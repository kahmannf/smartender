import { DrinkIngredient } from './drink-ingredient';

export interface Drink {
  name: string;
  id: number;
  user_id: number;
  ingredients: DrinkIngredient[];
}
