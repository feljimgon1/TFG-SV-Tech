import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResultsService } from 'src/app/services/results/results.service';
import * as XLSX from 'xlsx';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AdminService } from 'src/app/services/admin/admin.service';
import { PlanPersonalizadoService } from 'src/app/services/plan-personalizado/plan-personalizado.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  //Tables

  message: any;
  messageClass: any;
  processing = false;
  form!: FormGroup;

  balancesPrevisionales: any = [];
  cuentaPerdidasGananciasPrevisionales: any = [];

  headersCuentaPerdidasGanancias: any = [
    "Importe neto cifra de ventas",
    "Consumo de mercaderías y de materias",
    "Gasto de personal",
    "Otros gastos de explotación",
    "EBITDA",
    "CAT",
    "BAIT",
    "Gastos financieros",
    "Resultados financieros",
    "Resultados ordinarios antes de impuestos",
    "Impuestos sobre Sociedades",
    "Resultado del ejercicio",
    "Autofinanciación"
  ]

  headersBalance: any = [
    "Inmovilizado inmaterial",
    "Inmovilizado material",
    "Otros activos fijos",
    "Existencias",
    "Deudores",
    "Otros activos líquidos",
    "Capital suscrito",
    "Otros fondos propios",
    "Deuda nueva",
    "Deuda antigua",
    "Provisiones",
    "Deudas financieras",
    "Acreedores comerciales",
    "Otros pasivos líquidos",
  ]

  constructor(
    private resultadosService: ResultsService,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.getPlan();
    this.resultadosService.getCuentaPerdidasGananciasPrevisionales().subscribe((cuentaPerdidasGananciasPrevisionales: { cuentaPerdidasGananciasPrevisionales: any }) => {
      for (let i = 0; i < cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales.length; i++) {
        for (let j = 0; j < cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales[i].length; j++) {
          if (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales[i][j] === null) {
            cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales[i][j] = 0
          }
        }
      }
      this.cuentaPerdidasGananciasPrevisionales = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales

      this.ebitdaData = [{
        data: this.EBITDAExperto,
        label: 'Experto'
      },
      {
        data: this.cuentaPerdidasGananciasPrevisionales[4],
        label: 'Usuario'
      }
      ]

      this.ventasData = [{
        data: this.ventasExperto,
        label: 'Experto'
      },
      {
        data: this.cuentaPerdidasGananciasPrevisionales[0],
        label: 'Usuario'
      }
      ]
    });

    this.resultadosService.getBalancesPrevisionales().subscribe((balancesPrevisionales: any) => {
      for (let i = 0; i < balancesPrevisionales.balancesPrevisionales.length; i++) {
        for (let j = 0; j < balancesPrevisionales.balancesPrevisionales[i].length; j++) {
          if (balancesPrevisionales.balancesPrevisionales[i][j] === null) {
            balancesPrevisionales.balancesPrevisionales[i][j] = 0
          }
        }
      }
      this.balancesPrevisionales = balancesPrevisionales.balancesPrevisionales
      console.log(balancesPrevisionales)
    });
  }

  //Exportación del excel

  exportCuentaPerdidasGananciasExcel(): void {
    let element = document.getElementById('cuentaPerdidasGananciasPrevisionales');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, { raw: false });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'CuentaPérdidasGanancias.xlsx');
  }
  exportBalancesExcel(): void {
    let element = document.getElementById('balancesPrevisionales');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Balances.xlsx');
  }

  //Experto

  ventasExperto: any;
  EBITDAExperto: any[] = [];
  fondosPropiosExperto: any;
  resultadoEjercicioExperto: any;

  balance: any;
  cuentaPerdidasGanancias: any;
  estrategiaMercado: any;
  politicaInversion: any;
  politicaFinanciacion: any;
  estrategiaCirculante: any;
  load!: boolean;

  getPlan() {
    this.adminService.getPlanAdmin().subscribe((data: any) => {
      this.balance = data['balance']
      this.cuentaPerdidasGanancias = data['cuentaPerdidasGanancias']
      this.estrategiaMercado = data['estrategiaMercado']
      this.politicaInversion = data['politicaInversion']
      this.politicaFinanciacion = data['politicaFinanciacion']
      this.estrategiaCirculante = data['estrategiaCirculante']
      this.load = true;

      let totalVentasEsperadas = this.estrategiaMercado.objetivoVentasAnyoCinco;

      //Importe neto cifra de ventas

      let importeNetoCifraVentas = [
        totalVentasEsperadas * (this.estrategiaMercado.ventasAlcanzadasUno / 100),
        totalVentasEsperadas * (this.estrategiaMercado.ventasAlcanzadasDos / 100),
        totalVentasEsperadas * (this.estrategiaMercado.ventasAlcanzadasTres / 100),
        totalVentasEsperadas * (this.estrategiaMercado.ventasAlcanzadasCuatro / 100),
        totalVentasEsperadas * (this.estrategiaMercado.ventasAlcanzadasCinco / 100)
      ]

      //Ebitda
      let consumoMercaderiasMaterias = [
        importeNetoCifraVentas[0] * (this.estrategiaMercado.aprovisionamientoPorVentasUno / 100),
        importeNetoCifraVentas[1] * (this.estrategiaMercado.aprovisionamientoPorVentasDos / 100),
        importeNetoCifraVentas[2] * (this.estrategiaMercado.aprovisionamientoPorVentasTres / 100),
        importeNetoCifraVentas[3] * (this.estrategiaMercado.aprovisionamientoPorVentasCuatro / 100),
        importeNetoCifraVentas[4] * (this.estrategiaMercado.aprovisionamientoPorVentasCinco / 100)
      ]

      let gastoPersonal = [
        this.estrategiaMercado.gastoEmpleadoUno * this.estrategiaMercado.numeroEmpleadosUno,
        this.estrategiaMercado.gastoEmpleadoDos * this.estrategiaMercado.numeroEmpleadosDos,
        this.estrategiaMercado.gastoEmpleadoTres * this.estrategiaMercado.numeroEmpleadosTres,
        this.estrategiaMercado.gastoEmpleadoCuatro * this.estrategiaMercado.numeroEmpleadosCuatro,
        this.estrategiaMercado.gastoEmpleadoCinco * this.estrategiaMercado.numeroEmpleadosCinco
      ]

      let otrosGastosExplotacion = [
        (this.estrategiaMercado.otrosGastosExplotacionPorVentasUno / 100) * importeNetoCifraVentas[0],
        (this.estrategiaMercado.otrosGastosExplotacionPorVentasDos / 100) * importeNetoCifraVentas[1],
        (this.estrategiaMercado.otrosGastosExplotacionPorVentasTres / 100) * importeNetoCifraVentas[2],
        (this.estrategiaMercado.otrosGastosExplotacionPorVentasCuatro / 100) * importeNetoCifraVentas[3],
        (this.estrategiaMercado.otrosGastosExplotacionPorVentasCinco / 100) * importeNetoCifraVentas[4]
      ]

      for (let i = 0; i < 5; i++) {
        this.EBITDAExperto.push(importeNetoCifraVentas[i] - otrosGastosExplotacion[i] - gastoPersonal[i] - consumoMercaderiasMaterias[i])
      }

      this.ventasExperto = importeNetoCifraVentas;

    });

  }

  //Charts

  //Ventas

  public ventasData: ChartDataSets[] = [];
  public ventasLabels: Label[] = ['1', '2', '3', '4', '5'];
  public ventasOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true
  };
  public ventasLegend = true;
  public lineChartType: ChartType = 'line';
  public ventasPlugins = [];

  //Ebitda

  public ebitdaData: ChartDataSets[] = [];
  public ebitdaLabels: Label[] = ['1', '2', '3', '4', '5'];
  public ebitdaOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true
  };
  public ebitdaLegend = true;
  public ebitdaPlugins = [];


}
