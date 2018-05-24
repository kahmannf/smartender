import { ServerOperationResult } from './server-operation-result';
import { ConnectorService } from './../service-client/connector.service';
import { PageResult } from './page-result';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from './ingredient';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  constructor(
    private connector: ConnectorService
  ) { }

  searchForIngredient(limit: number, offset: number, searchString?: string): Observable<PageResult<Ingredient>> {
    return this.connector.secureIngretiensSearchGET(limit, offset, searchString);
  }

  addIngredient(ingredient: Ingredient): Observable<ServerOperationResult> {
    return this.connector.secureIngretiensAddPOST(ingredient);
  }
}
