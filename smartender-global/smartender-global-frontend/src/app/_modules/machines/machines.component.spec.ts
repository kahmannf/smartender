import { UserService } from './../../shared/user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesComponent } from './machines.component';
import { RouterTestingModule } from '@angular/router/testing';
import { getUserService } from '../../../test/fake-services';

describe('MachinesComponent', () => {
  let component: MachinesComponent;
  let fixture: ComponentFixture<MachinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachinesComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [{
        provide: UserService,
        useValue: getUserService()
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
