import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin-user-plan',
  templateUrl: './admin-user-plan.component.html',
  styleUrls: ['./admin-user-plan.component.scss']
})
export class AdminUserPlanComponent implements OnInit {

  userId!: string;
  private sub!: Subscription;
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {

  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.userId = (params['id']);
      this.adminService.findUser(this.userId).pipe(
        map((user: User) => this.user = user)
      ).subscribe()
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}