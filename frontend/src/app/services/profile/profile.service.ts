import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  header: any;

  constructor(
    private authService: AuthService,
    private http: HttpClient) { }

  //Perfil

createAuthHeaders(){
  this.header = {
    headers: new HttpHeaders({ authorization: "Bearer " + this.authService.loadToken()})
  }
}

getProfile():any{
  this.createAuthHeaders();
  return this.http.get<any>("api/profile", this.header);
}

}
