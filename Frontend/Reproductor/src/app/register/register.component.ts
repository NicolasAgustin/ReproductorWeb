import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public registerInvalid = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    // Instancio el formulario con sus correspondientes validadores
    this.form = new FormGroup({
      username: new FormControl('', Validators.minLength(5)),
      password: new FormControl('', Validators.minLength(5)),
      email: new FormControl('', Validators.email)
    })
  }

  ngOnInit(): void {}

  /**
   * Descripcion: Metodo invocado cuando se envia el formulario
   */
  onSubmit(){
    // Obtengo los valores del formulario
    const newUserName = this.form.get('username')?.value;
    const newPassword = this.form.get('password')?.value;
    const newEmail = this.form.get('email')?.value;

    // Envio el registro al backend y obtengo el token para su autenticacion
    this.auth.registerUser({username: newUserName, password: newPassword, email: newEmail, id: ''}).subscribe((response) => {
      // Si el token no es null
      if(typeof response.token != 'undefined') {
        console.log('token obtenida: ' + response.token);
        // Guardo el token en la cache del navegador
        sessionStorage.setItem('token', response.token);
        // Se carga el componente principal
        this.router.navigate(['principal']);
      }
    });
  }
}
