import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BalanceService } from 'src/app/services/balance/balance.service';
import { EstrategiaMercadoService } from 'src/app/services/estrategiaMercado/estrategia-mercado.service';

@Component({
  selector: 'app-estrategia-mercado',
  templateUrl: './estrategia-mercado.component.html',
  styleUrls: ['./estrategia-mercado.component.scss']
})
export class EstrategiaMercadoComponent implements OnInit {

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

  estrategiaMercado: any = [];

  balance: any = [];
  pasivo: any;
  activo: any;


  constructor(
    private balanceService: BalanceService,
    private estrategiaMercadoService: EstrategiaMercadoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { this.createForm() }

  ngOnInit(): void {
    this.estrategiaMercadoService.getEstrategiaMercado().subscribe((estrategiaMercado: { estrategiaMercado: any }) => {
      this.estrategiaMercado = estrategiaMercado.estrategiaMercado;
    });
    this.balanceService.getBalance().subscribe((balance: { balance: any; }) => {
      this.balance = balance.balance;
      this.pasivo = this.balance.capitalSuscrito + this.balance.otrosFondosPropios + this.balance.acreedoresLP + this.balance.otrosPasivosFijos + this.balance.provisiones + this.balance.deudasFinancieras + this.balance.acreedoresComerciales + this.balance.otrosPasivosLiquidos
      this.activo = this.balance.existencias + this.balance.deudores + this.balance.otrosActivosLiquidos + this.balance.inmovilizadoInmaterial + this.balance.inmovilizadoMaterial + this.balance.otrosActivosFijos
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      objetivoVentasAnyoCinco: [''],
      ventasAlcanzadasUno: [''],
      ventasAlcanzadasDos: [''],
      ventasAlcanzadasTres: [''],
      ventasAlcanzadasCuatro: [''],
      ventasAlcanzadasCinco: [''],
      numeroEmpleadosUno: [''],
      numeroEmpleadosDos: [''],
      numeroEmpleadosTres: [''],
      numeroEmpleadosCuatro: [''],
      numeroEmpleadosCinco: [''],
      gastoEmpleadoUno: [''],
      gastoEmpleadoDos: [''],
      gastoEmpleadoTres: [''],
      gastoEmpleadoCuatro: [''],
      gastoEmpleadoCinco: [''],
      aprovisionamientoPorVentasUno: [''],
      aprovisionamientoPorVentasDos: [''],
      aprovisionamientoPorVentasTres: [''],
      aprovisionamientoPorVentasCuatro: [''],
      aprovisionamientoPorVentasCinco: [''],
      otrosGastosExplotacionPorVentasUno: [''],
      otrosGastosExplotacionPorVentasDos: [''],
      otrosGastosExplotacionPorVentasTres: [''],
      otrosGastosExplotacionPorVentasCuatro: [''],
      otrosGastosExplotacionPorVentasCinco: ['']
    })
  }

  onSubmit() {

    const estrategiaMercado: any = {}

    for (const i in this.form.controls) {
      let res = this.form.get(i)?.value
      if (res != '') {
        estrategiaMercado[i] = res
      }
      var type = typeof res
      if (res == 0 && type == 'number') {
        estrategiaMercado[i] = 0
      }
    }

    this.estrategiaMercadoService.editEstrategiaMercado(estrategiaMercado).subscribe((data: { data: any }) => {
      window.location.reload();
    })
  }

  redirect(path: String) {
    this.router.navigate([path]);
  }

}