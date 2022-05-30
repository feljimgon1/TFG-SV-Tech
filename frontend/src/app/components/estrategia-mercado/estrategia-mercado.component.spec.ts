import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstrategiaMercadoComponent } from './estrategia-mercado.component';

describe('EstrategiaMercadoComponent', () => {
  let component: EstrategiaMercadoComponent;
  let fixture: ComponentFixture<EstrategiaMercadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstrategiaMercadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstrategiaMercadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
