import { TestBed } from '@angular/core/testing';

import { PoliticaInversionService } from './politica-inversion.service';

describe('PoliticaInversionService', () => {
  let service: PoliticaInversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliticaInversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
