import { MachineService } from './shared/machine.service';
import { LoadUserSessionsSuccessful } from './store/actions/session.actions';
import { SessionService } from './shared/session.service';
import { Store, select } from '@ngrx/store';
import { State } from './store/reducers';
import { getUserSessions, getActiveSession, getActiveSessionMachine } from './store/selectors/session.selectors';
import { switchMap, merge, map, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserSession } from './shared/user-session';
import { Session } from './shared/session';
import { getCurrentUser } from './store/selectors/user.selectors';
import * as machineActions from './store/actions/machine.actions';


export class UpdateHandler {



  constructor(
    private store: Store<State>,
    private sessionService: SessionService,
    private ma: MachineService
  ) {

    // sessions updates
    this.store.pipe(
      select(getCurrentUser),
      switchMap(user =>
        this.sessionService.getSessionsUpdates(user.id).pipe(
          map(sessions => this.store.dispatch(new LoadUserSessionsSuccessful(sessions)))
        )
      )
    ).subscribe();

    // machine updates (active session only)
    this.store.pipe(
      select(getActiveSessionMachine),
      switchMap(machine => {
        if (machine && machine.id) {
          return this.ma.subscribeMachineById(machine.id).pipe(
            map(updatedMachine => this.store.dispatch(new machineActions.UpdateMachine(updatedMachine))
          ));
        } else {
          return of();
        }
    })).subscribe();
  }
}
