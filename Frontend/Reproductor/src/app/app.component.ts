import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Reproductor';
  public error: boolean;
  constructor(){
    this.error = false;
    // Se limpia la cache del navegador
    sessionStorage.clear();
  }

  badReqHandler(){
    this.error = true;
  }

}


