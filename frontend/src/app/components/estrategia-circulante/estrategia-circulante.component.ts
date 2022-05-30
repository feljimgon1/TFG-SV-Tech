import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BalanceService } from 'src/app/services/balance/balance.service';
import { EstrategiaCirculanteService } from 'src/app/services/estrategiaCirculante/estrategia-circulante.service';

@Component({
  selector: 'app-estrategia-circulante',
  templateUrl: './estrategia-circulante.component.html',
  styleUrls: ['./estrategia-circulante.component.scss']
})
export class EstrategiaCirculanteComponent implements OnInit {

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

  estrategiaCirculante: any = [];

  balance: any = [];
  pasivo: any;
  activo: any;


  constructor(
    private balanceService: BalanceService,
    private estrategiaCirculanteService: EstrategiaCirculanteService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { this.createForm() }

  ngOnInit(): void {
    this.estrategiaCirculanteService.getEstrategiaCirculante().subscribe((estrategiaCirculante: { estrategiaCirculante: any }) => {
      this.estrategiaCirculante = estrategiaCirculante.estrategiaCirculante;
    });
    this.balanceService.getBalance().subscribe((balance: { balance: any; }) => {
      this.balance = balance.balance;
      this.pasivo = this.balance.capitalSuscrito + this.balance.otrosFondosPropios + this.balance.acreedoresLP + this.balance.otrosPasivosFijos + this.balance.provisiones + this.balance.deudasFinancieras + this.balance.acreedoresComerciales + this.balance.otrosPasivosLiquidos
      this.activo = this.balance.existencias + this.balance.deudores + this.balance.otrosActivosLiquidos + this.balance.inmovilizadoInmaterial + this.balance.inmovilizadoMaterial + this.balance.otrosActivosFijos
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      periodoMedioCobroUno: [''],
      periodoMedioCobroDos: [''],
      periodoMedioCobroTres: [''],
      periodoMedioCobroCuatro: [''],
      periodoMedioCobroCinco: [''],
      periodoMedioExistenciaUno: [''],
      periodoMedioExistenciaDos: [''],
      periodoMedioExistenciaTres: [''],
      periodoMedioExistenciaCuatro: [''],
      periodoMedioExistenciaCinco: [''],
      periodoMedioPagoUno: [''],
      periodoMedioPagoDos: [''],
      periodoMedioPagoTres: [''],
      periodoMedioPagoCuatro: [''],
      periodoMedioPagoCinco: [''],
      otUno: [''],
      otDos: [''],
      otTres: [''],
      otCuatro: [''],
      otCinco: [''],
      interesPolizaCreditoUno: [''],
      interesPolizaCreditoDos: [''],
      interesPolizaCreditoTres: [''],
      interesPolizaCreditoCuatro: [''],
      interesPolizaCreditoCinco: [''],
      polizaCreditoUno: [''],
      polizaCreditoDos: [''],
      polizaCreditoTres: [''],
      polizaCreditoCuatro: [''],
      polizaCreditoCinco: [''],
      tasaImpositiva: ['']
    })
  }

  onSubmit() {

    const estrategiaCirculante: any = {}

    for (const i in this.form.controls) {
      let res = this.form.get(i)?.value
      if (res != '') {
        estrategiaCirculante[i] = res
      }
      var type = typeof res
      if (res == 0 && type == 'number') {
        estrategiaCirculante[i] = 0
      }
    }

    this.estrategiaCirculanteService.editEstrategiaCirculante(estrategiaCirculante).subscribe((data: { data: any }) => {
      window.location.reload();
    })
  }

  redirect(path: String) {
    this.router.navigate([path]);
  }


}