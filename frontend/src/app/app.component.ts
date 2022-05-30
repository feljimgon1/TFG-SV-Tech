import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SV-Tech';

  expired!: Boolean;

  constructor(private jwtHelper: JwtHelperService, private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token) {
      console.log(token)
      if (this.jwtHelper.isTokenExpired(token)) {
        this.expired = true;
        console.log('expirado')
        setTimeout(()=>{
          this.authService.logout();
          this.router.navigate(['/home']);
          window.location.reload();
        },3000);
        // token expired 
      } else {
        this.expired = false;
        console.log('todo bien')
        // token valid
      }
    }
  }

}
