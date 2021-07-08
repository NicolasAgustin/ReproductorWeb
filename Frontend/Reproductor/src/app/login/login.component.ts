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

  // Formulario principal
  public form: FormGroup;
  // Login erroneo
  public loginInvalid = false;
  private formSubmitAttempt = false;
  // private url: string;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    // this.url = '';
    
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  /**
   * Descripcion: Metodo que se va a invocar cuando se hace un submit del formulario
   */
  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        // Obtengo los valores del formulario
        const emailLogin = this.form.get('email')?.value;
        const pass = this.form.get('password')?.value;

        // Intento autenticar al usuario
        this.auth.loginUser({email: emailLogin, password: pass}).subscribe((response) => {
          console.log(response);
          // Chequeo si el token no es null
          if(typeof response.token != 'undefined'){
            // Guardo el token en la cache del navegador
            sessionStorage.setItem('token', response.token);
            // Como el logeo fue exitoso cambio al componente principal
            this.router.navigate(['principal']);
          }
        }, (error) => {
            // En caso de error
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
