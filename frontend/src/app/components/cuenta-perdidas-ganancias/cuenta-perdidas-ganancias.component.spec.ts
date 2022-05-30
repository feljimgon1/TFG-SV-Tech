import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaPerdidasGananciasComponent } from './cuenta-perdidas-ganancias.component';

describe('CuentaPerdidasGananciasComponent', () => {
  let component: CuentaPerdidasGananciasComponent;
  let fixture: ComponentFixture<CuentaPerdidasGananciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaPerdidasGananciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaPerdidasGananciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
