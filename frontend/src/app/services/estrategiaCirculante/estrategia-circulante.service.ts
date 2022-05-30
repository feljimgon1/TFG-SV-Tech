import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EstrategiaCirculanteService {

  header:any;

  constructor(
    private authService: AuthService,
    private http: HttpClient) { }

  createAuthHeaders(){
    this.header = {
      headers: new HttpHeaders({ authorization: "Bearer " + this.authService.loadToken()})
    }
  }

  getEstrategiaCirculante():any{
    this.createAuthHeaders();
    return this.http.get<any>("api/estrategia-circulante/my-estrategia-circulante", this.header);
  }

  editEstrategiaCirculante(estrategiaCirculante:any):any{
    this.createAuthHeaders();
    return this.http.put<any>("api/estrategia-circulante/my-estrategia-circulante", estrategiaCirculante, this.header);
  }
}