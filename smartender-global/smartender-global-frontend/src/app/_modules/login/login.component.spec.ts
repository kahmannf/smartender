import { AuthService } from './../../shared/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { getAuthService } from '../../../test/fake-services';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'home', children: [{ path: 'dashboard', component: LoginComponent}] }
        ])
      ],
      providers: [{
        provide: AuthService,
        useValue: getAuthService()
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    authService = debugElement.injector.get(AuthService);

    spyOn(authService, 'login').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid by default', () => {
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should set \'submitted\' to true after a submit on a invalid form', () => {

    const button = debugElement.query(By.css('[testLoginButton]')).nativeElement;
    button.click();

    expect(component.submitted).toBeTruthy();
  });

  it('should call once AuthService.login on valid submit', () => {
    component.loginForm.controls['email'].setValue('test');
    component.loginForm.controls['password'].setValue('123456');

    expect(component.loginForm.valid).toBeTruthy();

    const button = debugElement.query(By.css('[testLoginButton]')).nativeElement;
    button.click();

    expect(authService.login).toHaveBeenCalled();
    expect(authService.login).not.toHaveBeenCalledTimes(2);
  });
});
