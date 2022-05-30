import { TestBed } from '@angular/core/testing';

import { EstrategiaCirculanteService } from './estrategia-circulante.service';

describe('EstrategiaCirculanteService', () => {
  let service: EstrategiaCirculanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstrategiaCirculanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
