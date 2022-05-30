import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  messageClass:any;
  message:any;
  processing = false;
  emailValid=false;
  emailMessage:any;
  confirmPass:any;
  error:any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      confirmPass: ['', [Validators.required]]
    });
  }

  validatePassword(controls:any) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatePassword': true }
    }
  }

  matchingPasswords(password:any, confirm:any) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true } // Return as error: do not match
      }
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    let email = this.registerForm.get('email')?.value
    let name = this.registerForm.get('name')?.value
    let surname = this.registerForm.get('surname')?.value
    let password = this.registerForm.get('password')?.value
    let confirmPass = this.registerForm.get('confirmPass')?.value

    if(confirmPass == password){
      const user = {
        email: email,
        name: name,
        surname: surname,
        password: password
      }
      this.authService.registerUser(user).subscribe(
        data => {
          console.log(data);
        if(!data.success){
          this.processing = false;
          this.messageClass = 'alert alert-danger'; // Set an error class
          this.message = data.message;
        }else{
          this.processing = true;
          this.registerForm.controls['name'].disable();
          this.registerForm.controls['surname'].disable();
          this.registerForm.controls['email'].disable();
          this.registerForm.controls['password'].disable();
          this.messageClass = 'alert alert-success'; // Set bootstrap success class
          this.message = data.message; // Set success message
          setTimeout(() => {
            this.router.navigate(['/login']); // Redirect to login view
          }, 2000);
        }
        }
      )
    }
    else{
      this.error = true
      this.processing=false;
      this.messageClass = 'alert alert-danger'
      this.message="Las contraseñas deben coincidir"
    }
  }
}
