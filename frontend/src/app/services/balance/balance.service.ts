import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  header: any;

  constructor(
    private authService: AuthService,
    private http: HttpClient) { }

  createAuthHeaders(){
    this.header = {
      headers: new HttpHeaders({ authorization: "Bearer " + this.authService.loadToken()})
    }
  }

  getBalance():any{
    this.createAuthHeaders();
    return this.http.get<any>("api/balance/my-balance", this.header);
  }

  editBalance(balance:any):any{
    this.createAuthHeaders();
    return this.http.put<any>("api/balance/my-balance", balance, this.header);
  }

}