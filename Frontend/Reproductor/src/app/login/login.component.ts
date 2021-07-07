import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private url: string;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.url = '';
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const emailLogin = this.form.get('email')?.value;
        const pass = this.form.get('password')?.value;

        this.auth.loginUser({email: emailLogin, password: pass}).subscribe((response) => {
          console.log(response);
          if(typeof response.token != 'undefined'){
            sessionStorage.setItem('token', response.token);
            this.router.navigate(['principal']);
          }
        }, (error) => {
          console.log(error);
          this.loginInvalid = true;
        });
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
