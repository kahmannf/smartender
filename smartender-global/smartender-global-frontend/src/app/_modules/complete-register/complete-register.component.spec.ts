import { of } from 'rxjs';
import { AuthService } from './../../shared/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './../../shared/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { CompleteRegisterComponent } from './complete-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { getUserService, getAuthService } from '../../../test/fake-services';

describe('CompleteRegisterComponent', () => {
  let component: CompleteRegisterComponent;
  let fixture: ComponentFixture<CompleteRegisterComponent>;
  let debugElement: DebugElement;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteRegisterComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: CompleteRegisterComponent }
      ])
      ],
      providers: [{
          provide: UserService,
          useValue: getUserService()
        },
        {
          provide: AuthService,
          useValue: getAuthService()
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteRegisterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    authService = debugElement.injector.get(AuthService);
    userService = debugElement.injector.get(UserService);

    spyOn(userService, 'getByRegisterKey');
    spyOn(authService, 'activateAccount').and.returnValue(false);
    spyOn(component, 'passwordValidator');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid by default', () => {
    expect(component.registerForm.invalid).toBeTruthy();
  });

  it('should expect a password to be 6 characters long', () => {
    const password = component.registerForm.controls['password'];
    password.setValue('12345');

    expect(password.errors['minlength']).toBeTruthy();

    password.setValue('123456');

    expect(password.valid).toBeTruthy();
  });

  it('should deny not matching passwords', () => {
    const password = component.registerForm.controls['password'];
    const passwordRepeat = component.registerForm.controls['passwordRepeat'];

    password.setValue('123456');
    passwordRepeat.setValue('123457');


    expect(passwordRepeat.invalid).toBeTruthy();
  });

  it('should accept matching passwords', fakeAsync(() => {
    const password = component.registerForm.controls['password'];
    const passwordRepeat = component.registerForm.controls['passwordRepeat'];

    password.setValue('123456');
    passwordRepeat.setValue('123456');


    expect(passwordRepeat.valid).toBeTruthy();
  }));

  it('should call authService on register', async(() => {
    const password = component.registerForm.controls['password'];
    const passwordRepeat = component.registerForm.controls['passwordRepeat'];

    password.setValue('123456');
    passwordRepeat.setValue('123456');

    const registerButton = debugElement.query(By.css('[testRegisterSubmit]')).nativeElement;

    registerButton.click();

    expect(authService.activateAccount).toHaveBeenCalled();
  }));
});


