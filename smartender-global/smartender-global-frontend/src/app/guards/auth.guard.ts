import { LoadCurrentUser } from './../store/actions/user.actions';
import { AuthService } from './../shared/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, first, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { State } from '../store/reducers';
import { getCurrentUser } from '../store/selectors/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {

    return this.store.pipe(
      select(getCurrentUser),
      map(user => {
        if (user && user.id) {
          return true;
        } else {
          this.store.dispatch(new LoadCurrentUser());
          return false;
        }
      })
    );
  }
}
