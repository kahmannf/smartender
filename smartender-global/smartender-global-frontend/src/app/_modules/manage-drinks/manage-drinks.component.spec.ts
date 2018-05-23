import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDrinksComponent } from './manage-drinks.component';

describe('ManageDrinksComponent', () => {
  let component: ManageDrinksComponent;
  let fixture: ComponentFixture<ManageDrinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDrinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
