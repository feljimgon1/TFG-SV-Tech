import { TestBed } from '@angular/core/testing';

import { CuentaPerdidasGananciasService } from './cuenta-perdidas-ganancias.service';

describe('CuentaPerdidasGananciasService', () => {
  let service: CuentaPerdidasGananciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentaPerdidasGananciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
