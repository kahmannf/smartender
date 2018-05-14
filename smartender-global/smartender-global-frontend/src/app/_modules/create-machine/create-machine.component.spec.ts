import { UserService } from './../../shared/user.service';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMachineComponent } from './create-machine.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CreateMachineComponent', () => {
  let component: CreateMachineComponent;
  let fixture: ComponentFixture<CreateMachineComponent>;
  let debugElement: DebugElement;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMachineComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMachineComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    userService = debugElement.injector.get(UserService);

    spyOn(userService, 'registerMachine');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call UserSevice.registerMachine with correct values', () => {
    component.createNewForm.controls['machinekey'].setValue('1234567890');
    component.createNewForm.controls['name'].setValue('Test Machine');

    debugElement.query(By.css('[testRegisterMachineButton]')).nativeElement.click();

    expect(userService.registerMachine).toHaveBeenCalledWith('1234567890', 'Test Machine');
  });
});
