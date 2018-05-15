import { TestBed, inject } from '@angular/core/testing';
import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomValidators]
    });
  });

  it('should be created', inject([CustomValidators], (service: CustomValidators) => {
    expect(service).toBeTruthy();
  }));

  it('should have tests', inject([CustomValidators], (service: CustomValidators) => {
    //test later
    expect(false).toBeTruthy();
  }));
});
