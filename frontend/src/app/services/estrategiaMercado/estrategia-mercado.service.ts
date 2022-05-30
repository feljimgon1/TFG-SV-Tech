import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EstrategiaMercadoService {

  header:any;

  constructor(
    private authService: AuthService,
    private http: HttpClient) { }

  createAuthHeaders(){
    this.header = {
      headers: new HttpHeaders({ authorization: "Bearer " + this.authService.loadToken()})
    }
  }

  getEstrategiaMercado():any{
    this.createAuthHeaders();
    return this.http.get<any>("api/estrategia-mercado/my-estrategia-mercado", this.header);
  }

  editEstrategiaMercado(estrategiaMercado:any):any{
    this.createAuthHeaders();
    return this.http.put<any>("api/estrategia-mercado/my-estrategia-mercado", estrategiaMercado, this.header);
  }

}