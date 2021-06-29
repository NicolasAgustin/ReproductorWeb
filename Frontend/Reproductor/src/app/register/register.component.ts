import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from '../registro.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  public registerInvalid = false;

  constructor(private fb: FormBuilder, private regService: RegistroService, private router: Router) {
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

    this.regService.registerNewUser({username: newUserName, password: newPassword, email: newEmail, id: ''}).subscribe((data) => {
      console.log(data);
      this.router.navigate(['player']);
    });


  }
  

}
