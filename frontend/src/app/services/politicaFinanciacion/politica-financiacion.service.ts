import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PoliticaFinanciacionService {

  header:any;

  constructor(
    private authService: AuthService,
    private http: HttpClient) { }

  createAuthHeaders(){
    this.header = {
      headers: new HttpHeaders({ authorization: "Bearer " + this.authService.loadToken()})
    }
  }

  getPoliticaFinanciacion():any{
    this.createAuthHeaders();
    return this.http.get<any>("api/politica-financiacion/my-politica-financiacion", this.header);
  }

  editPoliticaFinanciacion(politicaFinanciacion:any):any{
    this.createAuthHeaders();
    return this.http.put<any>("api/politica-financiacion/my-politica-financiacion", politicaFinanciacion, this.header);
  }
}