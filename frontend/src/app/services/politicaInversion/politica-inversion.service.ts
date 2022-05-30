import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PoliticaInversionService {

  header:any;

  constructor(
    private authService: AuthService,
    private http: HttpClient) { }

  createAuthHeaders(){
    this.header = {
      headers: new HttpHeaders({ authorization: "Bearer " + this.authService.loadToken()})
    }
  }

  getPoliticaInversion():any{
    this.createAuthHeaders();
    return this.http.get<any>("api/politica-inversion/my-politica-inversion", this.header);
  }

  editPoliticaInversion(politicaInversion:any):any{
    this.createAuthHeaders();
    return this.http.put<any>("api/politica-inversion/my-politica-inversion", politicaInversion, this.header);
  }

}