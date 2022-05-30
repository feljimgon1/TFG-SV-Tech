import { TestBed } from '@angular/core/testing';

import { RegistroInformacionServiceService } from './registro-informacion-service.service';

describe('RegistroInformacionServiceService', () => {
  let service: RegistroInformacionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroInformacionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
