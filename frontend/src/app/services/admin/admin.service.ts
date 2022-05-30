import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/app/models/User';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  header: any;
  selectedUser: User = {
    _id: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    rol: '',
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createAuthHeaders() {

    this.header = {
      headers: new HttpHeaders({ authorization: "Bearer " + this.authService.loadToken() })
    }

  }

  getUserById(id: any):any{
    return this.http.get('api/admin/user/' + id);
  }

  getUsers(): any {
    if (this.authService.getRole() == 'ADMIN') {
      return this.http.get('api/users');
    } else {
      return null
    }
  }

  updateUser(id: string, user: string): any {
    let userUpdated = {rol: user}
    return this.http.put('api/users/' + id, userUpdated);
  }

  deleteUser(id:string): any{
    return this.http.delete('api/admin/users/' + id, { responseType: 'text' });
  }

  getMedPrem() {
    return this.http.get<User[]>("api/users/getPreMed");
  }

  getPrem(){
    return this.http.get<User[]>("api/users/getPrem");
  }

  getAdmin(){
    return this.http.get<User[]>("api/users/getAdmin");
  }

  getMessages(src:any,dst:any){
    return this.http.get<User[]>("api/messages/" + src + "/" + dst);
  }

  /*Plan del usuario */

  findUser(id: string): Observable<any> {
    return this.http.get('api/admin/plan/' + id).pipe(map((user: any) => user)
    )
  }

  /*Editar plan del usuario*/

  editBalance(id: string, balance: any): any {
    this.createAuthHeaders();
    console.log(balance)
    return this.http.put<any>("api/admin/plan/balance/" + id, balance, this.header);
  }

  editCuentaPerdidasGanancias(id: string, cuentaPerdidasGanancias: any): any {
    this.createAuthHeaders();
    return this.http.put<any>("api/admin/plan/cuentaPerdidasGanancias/" + id, cuentaPerdidasGanancias, this.header);
  }

  editEstrategiaMercado(id: string, estrategiaMercado: any): any {
    this.createAuthHeaders();
    return this.http.put<any>("api/admin/plan/estrategiaMercado/" + id, estrategiaMercado, this.header);
  }

  editPoliticaInversion(id: string, politicaInversion: any): any {
    this.createAuthHeaders();
    return this.http.put<any>("api/admin/plan/politicaInversion/" + id, politicaInversion, this.header);
  }

  editPoliticaFinanciacion(id: string, politicaFinanciacion: any): any {
    this.createAuthHeaders();
    return this.http.put<any>("api/admin/plan/politicaFinanciacion/" + id, politicaFinanciacion, this.header);
  }

  editEstrategiaCirculante(id: string, estrategiaCirculante: any): any {
    this.createAuthHeaders();
    return this.http.put<any>("api/admin/plan/estrategiaCirculante/" + id, estrategiaCirculante, this.header);
  }

  /*Plan del experto */

  getPlanAdmin(): any {
    this.createAuthHeaders();
    console.log('Llamamos bien a api/admin/plan-user')
    return this.http.get<any>("api/admin/plan-user", this.header);
  }

}
