import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroInformacionServiceService } from 'src/app/services/registroInformacionService/registro-informacion-service.service';

@Component({
  selector: 'app-registro-informacion',
  templateUrl: './registro-informacion.component.html',
  styleUrls: ['./registro-informacion.component.scss']
})
export class RegistroInformacionComponent implements OnInit {

  form!: FormGroup;
  infoAdicional: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public infoAdicionalService: RegistroInformacionServiceService
    ) { this.createForm(); }

  ngOnInit(): void {
    this.getInformacionRegistrada()
  }

  createForm() {
    this.form = this.formBuilder.group({
      nombreEmpresa: [''],
      palabrasClave: [''],
      codigoCNAE: [''],
      empresasCompetidoras: [''],
      numeroEmpleadosActual: [''],
      vidaEmpresa: ['']
    })
  }

  onSubmit() {
    const infoAdicional: any = {}

    for (const i in this.form.controls) {
      let res = this.form.get(i)?.value
      if (res != '') {
        infoAdicional[i] = res
      }
      var type = typeof res
      if (res == 0 && type == 'number') {
        infoAdicional[i] = 0
      }
    }

    this.infoAdicionalService.edit(infoAdicional).subscribe((data:any) => {
      window.location.reload();
    })
    this.router.navigate(['/balance'])
  }

  getInformacionRegistrada(){
    this.infoAdicionalService.getInfoByUser().subscribe(
      (res:any)=>{
        this.infoAdicional = res
      }
    );
  }  

}
