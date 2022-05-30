import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  header:any;

  constructor(
    private authService: AuthService,
    private http: HttpClient) { }

  //Perfil

  createAuthHeaders() {
    let token = this.authService.loadToken();
    this.header = {
      headers: new HttpHeaders({ authorization: "Bearer " + token })
    }
  }

  getCuentaPerdidasGananciasPrevisionales(): any {
    this.createAuthHeaders();
    return this.http.get<any>("api/cuenta-perdidas-ganancias-previsionales", this.header);
  }


  getBalancesPrevisionales(): any {
    this.createAuthHeaders();
    return this.http.get<any>("api/balances-previsionales", this.header);
  }

}
