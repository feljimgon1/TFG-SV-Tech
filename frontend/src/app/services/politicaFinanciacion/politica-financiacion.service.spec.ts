import { TestBed } from '@angular/core/testing';

import { PoliticaFinanciacionService } from './politica-financiacion.service';

describe('PoliticaFinanciacionService', () => {
  let service: PoliticaFinanciacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliticaFinanciacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
