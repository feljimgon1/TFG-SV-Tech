import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaInversionComponent } from './politica-inversion.component';

describe('PoliticaInversionComponent', () => {
  let component: PoliticaInversionComponent;
  let fixture: ComponentFixture<PoliticaInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticaInversionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
