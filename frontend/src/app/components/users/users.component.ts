import { Component, OnInit } from '@angular/core';

import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any;

  name: any;
  surname: any;
  email: any;
  rol: any;

  displayedColumns: string[] = [
    'Nº',
    'Nombre',
    'Apellidos',
    'Email',
    'Rol',
    'Acciones'
  ];

  deleteMsg: any
  deleteMsgClass: any
  processing = false;

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((data: any) => {
      this.users = data;
      this.name = data.name
      this.surname = data.surname
      this.email = data.email
      this.rol = data.rol
    });
  }

  deleteUser(userId: any) {
    var result = confirm('¿Está seguro de que quiere eliminar el usuario?');
    if (result) {
      this.adminService.deleteUser(userId).subscribe(
        (data:any) => {
          let dataJson = JSON.parse(data)
          if (dataJson.success) {
            this.processing = true;
            this.deleteMsg = dataJson.msg
            this.deleteMsgClass = 'alert alert-success'
            setTimeout(() => {
              window.location.reload();
            }, 1500)
          } else {
            this.processing = false
            this.deleteMsg = dataJson.msg
            this.deleteMsgClass = 'alert alert-danger'
          }
        }
      );
    }
  }

}