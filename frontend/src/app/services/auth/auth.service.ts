import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocketioService } from '../socketio/socketio.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain = "http://localhost:3000"
  authToken: any;
  user: any;
  header: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private socketioService: SocketioService
  ) {

  }

  //Registro

  registerUser(user:any){
    return this.http.post<any>("api/register", user);
  }

  //Login

  login(user: any){
    return this.http.post<any>("api/login", user);
  }

  storeData(token: any, user: any){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  //Funciones auxiliares de tratamiento del token

  logout() { 
    // this.socketioService.disconnect();
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  loadToken(){
    return localStorage.getItem('token')
  }

  getRole(){
    let user = JSON.parse(localStorage.getItem('user')  || '{}')
    let role = user["rol"]    
    return role

  }

}
