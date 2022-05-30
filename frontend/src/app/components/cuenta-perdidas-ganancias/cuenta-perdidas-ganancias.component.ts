import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BalanceService } from 'src/app/services/balance/balance.service';
import { CuentaPerdidasGananciasService } from 'src/app/services/cuentaPerdidasGanancias/cuenta-perdidas-ganancias.service';

@Component({
  selector: 'app-cuenta-perdidas-ganancias',
  templateUrl: './cuenta-perdidas-ganancias.component.html',
  styleUrls: ['./cuenta-perdidas-ganancias.component.scss']
})
export class CuentaPerdidasGananciasComponent implements OnInit {

  message: any;
  messageClass: any;
  processing = false;
  form!: FormGroup;

  cuentaPerdidasGanancias: any = [];

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

  balance: any = [];
  pasivo:any;
  activo:any;

  constructor(
    private balanceService: BalanceService,
    private cuentaPerdidasGananciasService: CuentaPerdidasGananciasService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { this.createForm() }

  ngOnInit(): void {
    this.cuentaPerdidasGananciasService.getCuentasPerdidasGanancias().subscribe((cuentaPerdidasGanancias: { cuentaPerdidasGanancias: any; }) => {
      this.cuentaPerdidasGanancias = cuentaPerdidasGanancias.cuentaPerdidasGanancias;
    });
    this.balanceService.getBalance().subscribe((balance: { balance: any; }) => {
      this.balance = balance.balance;
      this.pasivo = this.balance.capitalSuscrito + this.balance.otrosFondosPropios + this.balance.acreedoresLP + this.balance.otrosPasivosFijos + this.balance.provisiones + this.balance.deudasFinancieras + this.balance.acreedoresComerciales + this.balance.otrosPasivosLiquidos
      this.activo = this.balance.existencias + this.balance.deudores + this.balance.otrosActivosLiquidos + this.balance.inmovilizadoInmaterial+this.balance.inmovilizadoMaterial + this.balance.otrosActivosFijos
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      importeNetoCifraVentas: [''],
      otrosIngresosExplotacion: [''],
      trppi: [''],
      consumoMercaderiasMaterias: [''],
      gastoPersonal: [''],
      otrosGastosExplotacion: [''],
      cat: [''],
      ingresosFinancieros: [''],
      gastosFinancieros: ['']
    })
  }

  onSubmit() {

    const cuentaPerdidasGanancias:any = {}

    for (const i in this.form.controls) {
      let res = this.form.get(i)?.value
      if (res != '') {
        cuentaPerdidasGanancias[i] = res
      }
      var type = typeof res
      if (res == 0 && type == 'number') {
        cuentaPerdidasGanancias[i] = 0
      }
    }

    this.cuentaPerdidasGananciasService.editCuentasPerdidasGanancias(cuentaPerdidasGanancias).subscribe((data: {data:any}) => {
      window.location.reload();
    })
  }

  redirect(path:String){
    this.router.navigate([path]);
  }

}