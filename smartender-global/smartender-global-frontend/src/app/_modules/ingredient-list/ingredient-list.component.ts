import { FormGroup, FormControl } from '@angular/forms';
import { DrinkService } from './../../shared/drink.service';
import { PageResult } from './../../shared/page-result';
import { Ingredient } from './../../shared/ingredient';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'sm-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss']
})
export class IngredientListComponent implements OnInit {

  searchResult: PageResult<Ingredient>;

  lastSearch: string;

  searchForm: FormGroup;

  constructor(
    private drinkService: DrinkService
  ) { }

  @Output() ingredientSelected = new EventEmitter<Ingredient>();

  @Input() showNewButton: boolean;

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchValue: new FormControl('')
    });

    this.searchForm.valueChanges.subscribe(() => this.search());

    this.search(true);
  }

  search(override?: boolean) {
    if (this.lastSearch !== this.searchForm.value.searchValue || override) {
      this.lastSearch = this.searchForm.value.searchValue;
      this.drinkService.searchForIngredient(20, 0, this.searchForm.value.searchValue)
      .subscribe(result => this.searchResult = result);
    }
  }
  canGetNext() {
    return this.searchResult
    && (this.searchResult.limit * (this.searchResult.offset + 1)) < this.searchResult.total;
  }

  canGetPrevious() {
    return this.searchResult && this.searchResult.offset > 0;
  }

  getNext() {
    this.drinkService.searchForIngredient(20, this.searchResult.offset + 1, this.searchForm.value.searchValue)
    .subscribe(page => {
      this.searchResult = page;
    });
  }

  getPrevious() {
    this.drinkService.searchForIngredient(20, this.searchResult.offset - 1, this.searchForm.value.searchValue)
    .subscribe(page => {
      this.searchResult = page;
    });
  }

  reload() {
    if (this.searchResult) {
      this.drinkService.searchForIngredient(
        this.searchResult.limit,
        this.searchResult.offset,
        this.searchForm.value.searchValue)
        .subscribe(result => this.searchResult = result);
    } else {
      this.search();
    }
  }

  getResultText() {
    let result = 'Results ' + ((this.searchResult.offset * this.searchResult.limit) + 1);
    result += ' - ';
    if ((this.searchResult.offset + 1) * this.searchResult.limit > this.searchResult.total) {
      result += this.searchResult.total;
    } else {
      result += ((this.searchResult.offset + 1) * this.searchResult.limit);
    }

    result += ' of ' + this.searchResult.total;
    return result;
  }

}
