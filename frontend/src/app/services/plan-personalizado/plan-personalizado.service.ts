import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlanPersonalizadoService {

  header: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createAuthHeaders(){
    this.header = {
      headers: new HttpHeaders({ authorization: "Bearer " + this.authService.loadToken()})
    }
  }

  getPlanPersonalizado():any{
    this.createAuthHeaders();
    return this.http.get<any>("api/planPersonalizado/get", this.header);
  }
}
