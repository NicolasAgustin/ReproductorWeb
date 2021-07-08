import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private router:Router) {}

  ngOnInit(): void {
    // Al inicio de la aplicacion, chequeo si el token en la cache el null
    // Si no hay token presente, se muestra el componente badrequest
    const token = sessionStorage.getItem('token');
    if(token === null) this.router.navigate(['badrequest']);
  }

  goToTutorial(){
    this.router.navigate(['tutorial']);
  }

  goToPlayer(){
    this.router.navigate(['player']);
  }

}
