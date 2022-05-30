import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-consultancy',
  templateUrl: './consultancy.component.html',
  styleUrls: ['./consultancy.component.scss']
})
export class ConsultancyComponent implements OnInit {

  users:any = [];
  processing: any;
  displayedColumns = ['Nº', 'Nombre y apellidos', 'Email', 'Plan del usuario', 'Plan personalizado'];

  constructor(
    private adminService: AdminService,
    private router: Router
    ) { }

  ngOnInit(): void {
    let users:any;
    this.adminService.getUsers().subscribe( (data:any) => {
      users = data
      users.filter((user:any)=>{
        if((user.rol == 'PREMIUM') || (user.rol == 'MEDIUM')){
          this.users.push(user)
        }
      })
      
    } )
  }

  planUsuario(id:any){
    let urlDestino = '/consultancy/' + id;
    this.router.navigate([urlDestino]);
  }

  editarPlanUsuario(id:any){
    let urlDestino = '/consultancy/edit/' + id;
    this.router.navigate([urlDestino]);
  }

}
