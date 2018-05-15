import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { SessionDetailComponent } from './session-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionService } from '../../shared/session.service';
import { getUserService, getSessionService } from '../../../test/fake-services';
import { UserService } from '../../shared/user.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SessionDetailComponent', () => {
  let component: SessionDetailComponent;
  let fixture: ComponentFixture<SessionDetailComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionDetailComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: SessionService,
          useValue: getSessionService()
        },
        {
          provide: UserService,
          useValue: getUserService()
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SessionDetailComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should not render edit-emlements by default', () => {
    // const controlButtons = debugElement.query(By.css('[testControlButtons]'));
    // const membersRow = debugElement.query(By.css('[testMembersRow]'));
    // const inviteRow = debugElement.query(By.css('[testInviteRow]'));

    // expect(controlButtons).toBeFalsy();
    // expect(membersRow).toBeFalsy();
    // expect(inviteRow).toBeFalsy();
  // });
});
