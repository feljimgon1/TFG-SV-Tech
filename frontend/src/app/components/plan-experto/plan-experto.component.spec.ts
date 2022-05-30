import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanExpertoComponent } from './plan-experto.component';

describe('PlanExpertoComponent', () => {
  let component: PlanExpertoComponent;
  let fixture: ComponentFixture<PlanExpertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanExpertoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
