import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstrategiaCirculanteComponent } from './estrategia-circulante.component';

describe('EstrategiaCirculanteComponent', () => {
  let component: EstrategiaCirculanteComponent;
  let fixture: ComponentFixture<EstrategiaCirculanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstrategiaCirculanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstrategiaCirculanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
