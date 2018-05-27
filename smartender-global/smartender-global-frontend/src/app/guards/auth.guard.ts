import { LoadCurrentUser, UserActionTypes } from './../store/actions/user.actions';
import { AuthService } from './../shared/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, first, switchMap, merge } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { State } from '../store/reducers';
import { getCurrentUser } from '../store/selectors/user.selectors';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public actions$: Actions,
    private router: Router,
    private store: Store<State>
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {

    return this.store.pipe(
      select(getCurrentUser),
      switchMap(user => {
        if (user && user.id) {
          return of(true);
        } else {
          this.store.dispatch(new LoadCurrentUser());
          return (
            this.actions$.pipe(ofType(UserActionTypes.LoadCurrentUserSuccessful), map(() => true),
            merge(
              this.actions$.pipe(ofType(UserActionTypes.LoadCurrentUserFailure), map(() => false)))
            )
          );
        }
      })
    );
  }
}
