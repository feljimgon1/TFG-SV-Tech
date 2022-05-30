import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  submitted:any;
  messageClass:any;
  message:any;
  processing = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm()
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get fields() { return this.form?.controls; }

  onSubmit() {
    const user = {
      email: this.form?.get('email')?.value,
      password: this.form?.get('password')?.value
    }
    this.authService.login(user).subscribe(data => {
      if (!data.success) {
        this.processing = false;
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.form?.controls['email'].disable();
        this.form?.controls['password'].disable();
        this.processing = true;
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/home']);
          this.authService.storeData(data.token, data.user)
        }, 2000);
      }
    })
  }

}
