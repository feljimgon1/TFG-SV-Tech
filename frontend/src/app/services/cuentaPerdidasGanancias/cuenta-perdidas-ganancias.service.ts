import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CuentaPerdidasGananciasService {

  header:any;

  constructor(
    private authService: AuthService,
    private http: HttpClient) { }

  createAuthHeaders(){
    this.header = {
      headers: new HttpHeaders({ authorization: "Bearer " + this.authService.loadToken()})
    }
  }

  getCuentasPerdidasGanancias():any{
    this.createAuthHeaders();
    return this.http.get<any>("api/cuenta-perdidas-ganancias/my-cuenta-perdidas-ganancias", this.header);
  }

  editCuentasPerdidasGanancias(cuentaPerdidasGanancias:any):any{
    this.createAuthHeaders();
    return this.http.put<any>("api/cuenta-perdidas-ganancias/my-cuenta-perdidas-ganancias", cuentaPerdidasGanancias, this.header);
  }

}