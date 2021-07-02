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

  form: FormGroup;
  public registerInvalid = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = new FormGroup({
      username: new FormControl('', Validators.minLength(5)),
      password: new FormControl('', Validators.minLength(5)),
      email: new FormControl('', Validators.email)
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const newUserName = this.form.get('username')?.value;
    const newPassword = this.form.get('password')?.value;
    const newEmail = this.form.get('email')?.value;

    this.auth.registerUser({username: newUserName, password: newPassword, email: newEmail, id: ''}).subscribe((response) => {
      
      if(typeof response.token != 'undefined') {
        console.log('token obtenida: ' + response.token);
        // this.auth.setToken(response.token);
        sessionStorage.setItem('token', response.token);
        this.router.navigate(['player']);
      }
    });


  }
  

}
