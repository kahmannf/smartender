import { AuthService } from './../../shared/auth.service';
import { SessionService } from './../../shared/session.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { getSessionService, getAuthService, getUserService } from '../../../test/fake-services';
import { UserService } from '../../shared/user.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [{
        provide: SessionService,
        useValue: getSessionService()
      },
      {
        provide: AuthService,
        useValue: getAuthService()
      },
      {
        provide: UserService,
        useValue: getUserService()
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
