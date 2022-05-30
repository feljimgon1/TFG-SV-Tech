import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserPlanComponent } from './admin-user-plan.component';

describe('AdminUserPlanComponent', () => {
  let component: AdminUserPlanComponent;
  let fixture: ComponentFixture<AdminUserPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
