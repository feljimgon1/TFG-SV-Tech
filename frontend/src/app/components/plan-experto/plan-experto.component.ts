import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-plan-experto',
  templateUrl: './plan-experto.component.html',
  styleUrls: ['./plan-experto.component.scss']
})
export class PlanExpertoComponent implements OnInit {

  balance:any = [];
  cuentaPerdidasGanancias:any= [];
  estrategiaMercado:any= [];
  politicaInversion:any= [];
  politicaFinanciacion:any= [];
  estrategiaCirculante:any= [];
  load!: boolean;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getPlan()
  }

  getPlan() {
    this.adminService.getPlanAdmin().subscribe((data:any) => {
      this.balance = data['balance']
      this.cuentaPerdidasGanancias = data['cuentaPerdidasGanancias']
      this.estrategiaMercado = data['estrategiaMercado']
      this.politicaInversion = data['politicaInversion']
      this.politicaFinanciacion = data['politicaFinanciacion']
      this.estrategiaCirculante = data['estrategiaCirculante']
      this.load = true;
    });
  }


}
