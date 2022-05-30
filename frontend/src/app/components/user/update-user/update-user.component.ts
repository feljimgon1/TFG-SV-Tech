import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  userId!: string;
  rolList = [
    'USER',
    'BASICO',
    'MEDIUM',
    'PREMIUM',
    'ADMIN'
  ]
  form!: FormGroup;
  selectedRol: any;

  user!: { user: any }
  processing: boolean = false;
  success: any;

  messageClass: any
  message: any

  constructor(
    private formBuilder: FormBuilder,
    public adminService: AdminService
  ) {
    this.createForm()
  }

  createForm() {
    this.form = this.formBuilder.group({
      // name:[''],
      // surname: [''],
      // email:[''],
      rol: ['']
    })
  }

  ngOnInit(): void {
    let url = window.location.href.split('/');
    this.userId = url[url.length - 1];

    this.adminService.getUserById(this.userId).subscribe((user: { user: any }) => {
      this.user = user
    });

  }

  onSubmit() {
    let res = this.form.controls["rol"].value;
    this.success = this.user.user.rol != res;

    if (res == '') {
      this.messageClass = 'alert alert-danger';
      this.message = 'No se ha proporcionado información'
    } else {
      this.adminService.updateUser(this.userId, res).subscribe((data: any) => { })
      if (this.success) {
        this.processing = true;
        this.messageClass = 'alert alert-success';
        this.message = 'Usuario editado con éxito'
        setTimeout(() => {
          window.location.reload();
        }, 1500)
      } else {
        this.messageClass = 'alert alert-danger';
        this.message = 'Los datos del usuario no han cambiado'
      }
    }
  }

}
