import { SessionService } from './../../shared/session.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSessionComponent } from './create-session.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { getSessionService, getUserService, dummyMachine } from '../../../test/fake-services';
import { UserService } from '../../shared/user.service';

describe('CreateSessionComponent', () => {
  let component: CreateSessionComponent;
  let fixture: ComponentFixture<CreateSessionComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSessionComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [{
        provide: SessionService,
        useValue: getSessionService()
      },
      {
        provide: UserService,
        useValue: getUserService()
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSessionComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should display an error message with a button without machines', () => {
  //   const button = debugElement.query(By.css('[testButtonSwitch]'));

  //   expect(button).toBeTruthy();
  //   expect(button.nativeElement).toBeTruthy();
  // });

  // it('should not display the form without machines', () => {
  //   const form = debugElement.query(By.css('[testCreateSessionForm]'));

  //   expect(form).toBeFalsy();
  // });

  it('should display the form with machines', () => {
    component.machines = [dummyMachine];

    fixture.detectChanges();

    const form = debugElement.query(By.css('[testCreateSessionForm]'));

    expect(form).toBeTruthy();
    expect(form.nativeElement).toBeTruthy();
  });
});
