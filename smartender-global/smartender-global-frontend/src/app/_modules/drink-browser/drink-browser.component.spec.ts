import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkBrowserComponent } from './drink-browser.component';

describe('DrinkBrowserComponent', () => {
  let component: DrinkBrowserComponent;
  let fixture: ComponentFixture<DrinkBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
