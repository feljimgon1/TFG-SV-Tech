import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BalanceService } from 'src/app/services/balance/balance.service';
import { PoliticaInversionService } from 'src/app/services/politicaInversion/politica-inversion.service';

@Component({
  selector: 'app-politica-inversion',
  templateUrl: './politica-inversion.component.html',
  styleUrls: ['./politica-inversion.component.scss']
})
export class PoliticaInversionComponent implements OnInit {

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

  politicaInversion: any = [];

  balance: any = [];
  pasivo: any;
  activo: any;


  constructor(
    private balanceService: BalanceService,
    private politicaInversionService: PoliticaInversionService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { this.createForm() }

  ngOnInit(): void {
    this.politicaInversionService.getPoliticaInversion().subscribe((politicaInversion: { politicaInversion: any }) => {
      this.politicaInversion = politicaInversion.politicaInversion;
    });
    this.balanceService.getBalance().subscribe((balance: { balance: any; }) => {
      this.balance = balance.balance;
      this.pasivo = this.balance.capitalSuscrito + this.balance.otrosFondosPropios + this.balance.acreedoresLP + this.balance.otrosPasivosFijos + this.balance.provisiones + this.balance.deudasFinancieras + this.balance.acreedoresComerciales + this.balance.otrosPasivosLiquidos
      this.activo = this.balance.existencias + this.balance.deudores + this.balance.otrosActivosLiquidos + this.balance.inmovilizadoInmaterial + this.balance.inmovilizadoMaterial + this.balance.otrosActivosFijos
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      inversionInmovilizadoInmaterialUno: [''],
      inversionInmovilizadoInmaterialDos: [''],
      inversionInmovilizadoInmaterialTres: [''],
      inversionInmovilizadoInmaterialCuatro: [''],
      inversionInmovilizadoInmaterialCinco: [''],

      inversionInmovilizadoMaterialUno: [''],
      inversionInmovilizadoMaterialDos: [''],
      inversionInmovilizadoMaterialTres: [''],
      inversionInmovilizadoMaterialCuatro: [''],
      inversionInmovilizadoMaterialCinco: [''],

      vidaInmMaterialUno: [''],
      vidaInmMaterialDos: [''],
      vidaInmMaterialTres: [''],
      vidaInmMaterialCuatro: [''],
      vidaInmMaterialCinco: [''],

      vidaInmInmaterialUno: [''],
      vidaInmInmaterialDos: [''],
      vidaInmInmaterialTres: [''],
      vidaInmInmaterialCuatro: [''],
      vidaInmInmaterialCinco: [''],
    })
  }

  onSubmit() {

    const politicaInversion: any = {}

    for (const i in this.form.controls) {
      let res = this.form.get(i)?.value
      if (res != '') {
        politicaInversion[i] = res
      }
      var type = typeof res
      if (res == 0 && type == 'number') {
        politicaInversion[i] = 0
      }
    }

    this.politicaInversionService.editPoliticaInversion(politicaInversion).subscribe((data: { data: any }) => {
      window.location.reload();
    })
  }

  redirect(path: String) {
    this.router.navigate([path]);
  }

}