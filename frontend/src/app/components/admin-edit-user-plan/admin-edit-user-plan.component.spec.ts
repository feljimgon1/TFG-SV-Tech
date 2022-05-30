import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditUserPlanComponent } from './admin-edit-user-plan.component';

describe('AdminEditUserPlanComponent', () => {
  let component: AdminEditUserPlanComponent;
  let fixture: ComponentFixture<AdminEditUserPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditUserPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditUserPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
