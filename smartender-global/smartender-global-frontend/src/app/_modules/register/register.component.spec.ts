import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomValidators } from '../../custom-validators';
import { AuthService } from '../../shared/auth.service';
import { getAuthService, getCustomValidators } from '../../../test/fake-services';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let debugElement: DebugElement;
  let validators: CustomValidators;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: CustomValidators,
          useValue: getCustomValidators()
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  
    authService = debugElement.injector.get(AuthService);
    validators = debugElement.injector.get(CustomValidators);

    spyOn(authService, 'register').and.callThrough();
    spyOn(validators, 'emailformat').and.callThrough();
    spyOn(validators, 'alphanumricwhitespace').and.callThrough();
    spyOn(validators, 'emailavailable').and.callThrough();
    spyOn(validators, 'aliasavailable').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid by default', () => {
    expect(component.registerForm.invalid).toBeTruthy();
  });

  it('should call AuthService.register on submit', () => {
    component.registerForm.controls['alias'].setValue('Test Boiii');
    component.registerForm.controls['email'].setValue('Test Boiii');

    const button = debugElement.query(By.css('[testButtonRegister]')).nativeElement;
    button.click();
    
    expect(authService.register).toHaveBeenCalled();
  });
});
