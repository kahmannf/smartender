import { UserService } from './shared/user.service';
import { TestBed, inject, async } from '@angular/core/testing';
import { CustomValidators } from './custom-validators';
import { getUserService } from '../test/fake-services';

describe('CustomValidators', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomValidators,
        {
          provide: UserService,
          useValue: getUserService()
        }
      ]
    });
  });

  it('should be created', inject([CustomValidators], (service: CustomValidators) => {
    expect(service).toBeTruthy();
  }));


  it('should have tests', inject([CustomValidators], (service: CustomValidators) => {
    // test later
    expect(false).toBeTruthy();
  }));
});
