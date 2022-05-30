import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaFinanciacionComponent } from './politica-financiacion.component';

describe('PoliticaFinanciacionComponent', () => {
  let component: PoliticaFinanciacionComponent;
  let fixture: ComponentFixture<PoliticaFinanciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticaFinanciacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaFinanciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
