import { GetUserByRegisterKey } from './../store/actions/complete-register.actions';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { State } from '../store/reducers';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class RegisterkeyResolver implements Resolve<void> {

  constructor(private store: Store<State>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new GetUserByRegisterKey(route.params['registerkey']));
  }
}
