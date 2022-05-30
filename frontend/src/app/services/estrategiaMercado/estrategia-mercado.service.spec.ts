import { TestBed } from '@angular/core/testing';

import { EstrategiaMercadoService } from './estrategia-mercado.service';

describe('EstrategiaMercadoService', () => {
  let service: EstrategiaMercadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstrategiaMercadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
