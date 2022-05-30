import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanFinancieroComponent } from './plan-financiero.component';

describe('PlanFinancieroComponent', () => {
  let component: PlanFinancieroComponent;
  let fixture: ComponentFixture<PlanFinancieroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanFinancieroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
