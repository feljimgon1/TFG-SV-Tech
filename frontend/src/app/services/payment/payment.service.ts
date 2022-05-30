import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  header:any;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  createAuthHeaders(){
    this.header = {
      headers: new HttpHeaders({ authorization: "Bearer " + this.authService.loadToken()})
    }
  }

chargeB(amount:any, tokenId:any){
  this.createAuthHeaders();
  return this.http.post('api/payment/basico', {
    tokenId, amount
  }, this.header).toPromise()

}

chargeM(amount:any, tokenId:any){
  this.createAuthHeaders();
  return this.http.post('api/payment/medium', {
    tokenId, amount
  }, this.header).toPromise()

}

chargeP(amount:any, tokenId:any){
  this.createAuthHeaders();
  return this.http.post('api/payment/premium', {
    tokenId, amount
  }, this.header).toPromise()

}

}