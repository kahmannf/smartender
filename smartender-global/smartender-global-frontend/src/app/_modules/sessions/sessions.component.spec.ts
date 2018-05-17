import { SessionService } from './../../shared/session.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsComponent } from './sessions.component';
import { getSessionService } from '../../../test/fake-services';

describe('SessionsComponent', () => {
  let component: SessionsComponent;
  let fixture: ComponentFixture<SessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionsComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: SessionService,
          useValue: getSessionService()
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
