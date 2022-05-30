import { TestBed } from '@angular/core/testing';

import { PlanPersonalizadoService } from './plan-personalizado.service';

describe('PlanPersonalizadoService', () => {
  let service: PlanPersonalizadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanPersonalizadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
