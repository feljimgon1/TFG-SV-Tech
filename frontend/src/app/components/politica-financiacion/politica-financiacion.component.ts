import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BalanceService } from 'src/app/services/balance/balance.service';
import { PoliticaFinanciacionService } from 'src/app/services/politicaFinanciacion/politica-financiacion.service';

@Component({
  selector: 'app-politica-financiacion',
  templateUrl: './politica-financiacion.component.html',
  styleUrls: ['./politica-financiacion.component.scss']
})
export class PoliticaFinanciacionComponent implements OnInit {

  planFinanciero = [
    {
      name: 'Balance',
      path: '/balance'
    },
    {
      name: 'Cuenta de pérdidas y ganancias',
      path: '/cuenta-perdidas-ganancias'
    },
    {
      name: 'Estrategia de mercado',
      path: '/estrategia-mercado'
    },
    {
      name: 'Política de inversión',
      path: '/politica-inversion'
    },
    {
      name: 'Política de financiación',
      path: '/politica-financiacion'
    },
    {
      name: 'Estrategia de circulante',
      path: '/estrategia-circulante'
    }
  ]

  message: any;
  messageClass: any;
  processing = false;
  form!: FormGroup;

  politicaFinanciacion: any = [];

  balance: any = [];
  pasivo: any;
  activo: any;


  constructor(
    private balanceService: BalanceService,
    private politicaFinanciacionService: PoliticaFinanciacionService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { this.createForm() }

  ngOnInit(): void {
    this.politicaFinanciacionService.getPoliticaFinanciacion().subscribe((politicaFinanciacion: { politicaFinanciacion: any }) => {
      this.politicaFinanciacion = politicaFinanciacion.politicaFinanciacion;
    });
    this.balanceService.getBalance().subscribe((balance: { balance: any; }) => {
      this.balance = balance.balance;
      this.pasivo = this.balance.capitalSuscrito + this.balance.otrosFondosPropios + this.balance.acreedoresLP + this.balance.otrosPasivosFijos + this.balance.provisiones + this.balance.deudasFinancieras + this.balance.acreedoresComerciales + this.balance.otrosPasivosLiquidos
      this.activo = this.balance.existencias + this.balance.deudores + this.balance.otrosActivosLiquidos + this.balance.inmovilizadoInmaterial + this.balance.inmovilizadoMaterial + this.balance.otrosActivosFijos
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      vencimientoDeudaAntiguaUno: [''],
      vencimientoDeudaAntiguaDos: [''],
      vencimientoDeudaAntiguaTres: [''],
      vencimientoDeudaAntiguaCuatro: [''],
      vencimientoDeudaAntiguaCinco: [''],
      interesDeudaAntiguaUno: [''],
      interesDeudaAntiguaDos: [''],
      interesDeudaAntiguaTres: [''],
      interesDeudaAntiguaCuatro: [''],
      interesDeudaAntiguaCinco: [''],
      deudaNuevaUno: [''],
      deudaNuevaDos: [''],
      deudaNuevaTres: [''],
      deudaNuevaCuatro: [''],
      deudaNuevaCinco: [''],
      vencimientoDeudaNuevaUno: [''],
      vencimientoDeudaNuevaDos: [''],
      vencimientoDeudaNuevaTres: [''],
      vencimientoDeudaNuevaCuatro: [''],
      vencimientoDeudaNuevaCinco: [''],
      interesDeudaNuevaUno: [''],
      interesDeudaNuevaDos: [''],
      interesDeudaNuevaTres: [''],
      interesDeudaNuevaCuatro: [''],
      interesDeudaNuevaCinco: [''],
      ampliacionCapital: [''],
      primaEmision: [''],
    })
  }

  onSubmit() {

    const politicaFinanciacion: any = {}

    for (const i in this.form.controls) {
      let res = this.form.get(i)?.value
      if (res != '') {
        politicaFinanciacion[i] = res
      }
      var type = typeof res
      if (res == 0 && type == 'number') {
        politicaFinanciacion[i] = 0
      }
    }

    this.politicaFinanciacionService.editPoliticaFinanciacion(politicaFinanciacion).subscribe((data: { data: any }) => {
      window.location.reload();
    })
  }

  redirect(path: String) {
    this.router.navigate([path]);
  }

}