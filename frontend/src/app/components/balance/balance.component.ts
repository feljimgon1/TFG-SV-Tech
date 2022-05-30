import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BalanceService } from 'src/app/services/balance/balance.service';
@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  message:any;
  messageClass:any;
  processing = false;
  form!: FormGroup;

  pasivo: any;
  activo: any;

  balance: any = [];

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
    },
  ]

  constructor(
    private balanceService: BalanceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { this.createForm() }

  ngOnInit(): void {
    this.balanceService.getBalance().subscribe((balance: { balance: any; }) => {
      this.balance = balance.balance;
      this.pasivo = this.balance.capitalSuscrito + this.balance.otrosFondosPropios + this.balance.acreedoresLP + this.balance.otrosPasivosFijos + this.balance.provisiones + this.balance.deudasFinancieras + this.balance.acreedoresComerciales + this.balance.otrosPasivosLiquidos
      this.activo = this.balance.existencias + this.balance.deudores + this.balance.otrosActivosLiquidos + this.balance.inmovilizadoInmaterial+this.balance.inmovilizadoMaterial + this.balance.otrosActivosFijos
      /*
      balance.capitalSuscrito + balance.otrosFondosPropios + balance.acreedoresLP + balance.otrosPasivosFijos + balance.provisiones + balance.deudasFinancieras + balance.acreedoresComerciales + balance.otrosPasivosLiquidos
      balance.existencias + balance.deudores + balance.otrosActivosLiquidos + balance.inmovilizadoInmaterial+balance.inmovilizadoMaterial + balance.otrosActivosFijos
      * */
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      inmovilizadoInmaterial: [''],
      inmovilizadoMaterial: [''],
      otrosActivosFijos: [''],
      existencias: [''],
      deudores: [''],
      otrosActivosLiquidos: [''],
      capitalSuscrito: [''],
      otrosFondosPropios: [''],
      acreedoresLP: [''],
      otrosPasivosFijos: [''],
      provisiones: [''],
      deudasFinancieras: [''],
      acreedoresComerciales: [''],
      otrosPasivosLiquidos: ['']
    })
  }

  onSubmit() {

    const balance:any = {}

    for(const i in this.form.controls){
      let res = this.form.get(i)?.value
      if(res != ''){
        balance[i] = res
      }
      var type = typeof res
      if(res == 0 && type=='number'){
        balance[i] = 0
      }
    }

    this.balanceService.editBalance(balance).subscribe((data: {data:any}) => {
      window.location.reload();
    })
  }

  redirect(path:String){
    this.router.navigate([path]);
  }

}