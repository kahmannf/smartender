import { MockService } from './../service-client/mock.service';
import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, MockService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should not be logged in by default', inject([AuthService], (service: AuthService) => {
    service.isLoggedIn().subscribe(result => {
      expect(result).toBeFalsy();
    });
  }));

  it('should be able to log in and out', inject([AuthService], (service: AuthService) => {
    service.login('Admin', 'Admin');

    service.isLoggedIn().subscribe(result => {
      expect(result).toBeTruthy();

      service.logout();

      service.isLoggedIn().subscribe(result2 => {
        expect(result2).toBeFalsy();
      });
    });

  }));

});
