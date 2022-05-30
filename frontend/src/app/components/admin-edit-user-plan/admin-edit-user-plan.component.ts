import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin-edit-user-plan',
  templateUrl: './admin-edit-user-plan.component.html',
  styleUrls: ['./admin-edit-user-plan.component.scss']
})
export class AdminEditUserPlanComponent implements OnInit {

  userId!: string;
  private sub!: Subscription;
  user: any;
  formBalance!: FormGroup;
  formCuentaPerdidasGanancias!: FormGroup;
  formEstrategiaMercado!: FormGroup;
  formPoliticaInversion!: FormGroup;
  formPoliticaFinanciacion!: FormGroup;
  formEstrategiaCirculante!: FormGroup;

  message:any;
  messageClass:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    this.createFormBalance()
    this.createFormCuentaPerdidasGanancias()
    this.createFormEstrategiaMercado()
    this.createFormPoliticaInversion()
    this.createFormPoliticaFinanciacion()
    this.createFormEstrategiaCirculante()
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.userId = (params['id']);
    })
  }

  createFormBalance() {
    this.formBalance = this.formBuilder.group({
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

  createFormCuentaPerdidasGanancias() {
    this.formCuentaPerdidasGanancias = this.formBuilder.group({
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

  createFormEstrategiaMercado() {
    this.formEstrategiaMercado = this.formBuilder.group({
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

  createFormPoliticaInversion(){
    this.formPoliticaInversion = this.formBuilder.group({
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

  createFormPoliticaFinanciacion(){
    this.formPoliticaFinanciacion = this.formBuilder.group({
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

  createFormEstrategiaCirculante(){
    this.formEstrategiaCirculante = this.formBuilder.group({
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

  onSubmitBalance() {

    const balance:any = {}

    for (const i in this.formBalance?.controls) {
      let res = this.formBalance?.get(i)?.value
      if (res != '') {
        balance[i] = res
      }
      var type = typeof res
      if (res == 0 && type == 'number') {
        balance[i] = 0
      }
    }


    this.adminService.editBalance(this.userId, balance).subscribe((data:any) => {
      if (data['success'] == false) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
      }

    })
  }

  onSubmitCuentaPerdidasGanancias() {

    const cuentaPerdidasGanancias:any = {}

    for (const i in this.formCuentaPerdidasGanancias?.controls) {
      let res = this.formCuentaPerdidasGanancias?.get(i)?.value
      if (res != '') {
        cuentaPerdidasGanancias[i] = res
      }
      var type = typeof res
      if (res == 0 && type == 'number') {
        cuentaPerdidasGanancias[i] = 0
      }
    }

    this.sub = this.activatedRoute.params.subscribe((params:any) => {
      this.userId = (params['id']);
      this.adminService.editCuentaPerdidasGanancias(this.userId, cuentaPerdidasGanancias).subscribe((data:any) => {
        if (data['success'] == false) {
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
        } else {
          this.messageClass = 'alert alert-success';
          this.message = data.message;
        }

      })
    })
  }

  onSubmitEstrategiaMercado() {

    const estrategiaMercado:any = {}

    for (const i in this.formEstrategiaMercado?.controls) {
      let res = this.formEstrategiaMercado?.get(i)?.value
      if (res != '') {
        estrategiaMercado[i] = res
      }
      var type = typeof res
      if (res == 0 && type == 'number') {
        estrategiaMercado[i] = 0
      }
    }

    this.sub = this.activatedRoute.params.subscribe((params:any) => {
      this.userId = (params['id']);
      this.adminService.editEstrategiaMercado(this.userId, estrategiaMercado).subscribe((data:any) => {
        if (data['success'] == false) {
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
        } else {
          this.messageClass = 'alert alert-success';
          this.message = data.message;
        }

      })
    })
  }

  onSubmitPoliticaInversion() {

    const politicaInversion:any = {}

    for (const i in this.formPoliticaInversion?.controls) {
      let res = this.formPoliticaInversion?.get(i)?.value
      if (res != '') {
        politicaInversion[i] = res
      }
      var type = typeof res
      if (res == 0 && type == 'number') {
        politicaInversion[i] = 0
      }
    }

    this.sub = this.activatedRoute.params.subscribe((params:any) => {
      this.userId = (params['id']);
      this.adminService.editPoliticaInversion(this.userId, politicaInversion).subscribe((data:any) => {
        if (data['success'] == false) {
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
        } else {
          this.messageClass = 'alert alert-success';
          this.message = data.message;
        }

      })
    })
  }
  
  onSubmitPoliticaFinanciacion() {

    const politicaFinanciacion:any = {}

    for (const i in this.formPoliticaFinanciacion?.controls) {
      let res = this.formPoliticaFinanciacion?.get(i)?.value
      if (res != '') {
        politicaFinanciacion[i] = res
      }
      var type = typeof res
      if (res == 0 && type == 'number') {
        politicaFinanciacion[i] = 0
      }
    }

    this.sub = this.activatedRoute.params.subscribe((params:any) => {
      this.userId = (params['id']);
      this.adminService.editPoliticaFinanciacion(this.userId, politicaFinanciacion).subscribe((data:any) => {
        if (data['success'] == false) {
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
        } else {
          this.messageClass = 'alert alert-success';
          this.message = data.message;
        }

      })
    })
  }

  onSubmitEstrategiaCirculante() {

    const estrategiaCirculante:any = {}

    for (const i in this.formEstrategiaCirculante?.controls) {
      let res = this.formEstrategiaCirculante?.get(i)?.value
      if (res != '') {
        estrategiaCirculante[i] = res
      }
      var type = typeof res
      if (res == 0 && type == 'number') {
        estrategiaCirculante[i] = 0
      }
    }

    this.sub = this.activatedRoute.params.subscribe((params:any) => {
      this.userId = (params['id']);
      this.adminService.editEstrategiaCirculante(this.userId, estrategiaCirculante).subscribe((data:any) => {
        if (data['success'] == false) {
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
        } else {
          this.messageClass = 'alert alert-success';
          this.message = data.message;
        }

      })
    })
  }
}