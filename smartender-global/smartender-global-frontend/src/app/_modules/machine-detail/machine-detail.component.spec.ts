import { MachineService } from './../../shared/machine.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDetailComponent } from './machine-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { getMachineService } from '../../../test/fake-services';

describe('MachineDetailComponent', () => {
  let component: MachineDetailComponent;
  let fixture: ComponentFixture<MachineDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineDetailComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [{
        provide: MachineService,
        useValue: getMachineService()
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
