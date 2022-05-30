import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroInformacionServiceService {

  header:any;
  infoAdicional:any = [];

  constructor(
    private authService: AuthService,
    private http: HttpClient) { }

  createAuthHeaders() {
    this.header = {
      headers: new HttpHeaders({ authorization: "Bearer " + this.authService.loadToken() })
    }
    console.log(this.header);
    console.log(this.authService.loadToken())
    
  }

  getInfoByUser():any{
    this.createAuthHeaders();
    return this.http.get<any>("api/info-adicional/get", this.header);
  }

  edit(info:any): any {
    this.createAuthHeaders();
    return this.http.put<any>("api/info-adicional/edit", info, this.header);
  }

}
