import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cancion } from '../cancion';
import { ReqCancionesService } from '../req-canciones.service';

@Component({
  selector: 'app-lista-canciones',
  templateUrl: './lista-canciones.component.html',
  styleUrls: ['./lista-canciones.component.css']
})
export class ListaCancionesComponent implements OnInit {

  canciones: Cancion[];
  mostrado = false;
  obs$: Subscription;

  constructor(private rcservice: ReqCancionesService) {
    this.canciones = [];
    this.obs$ = new Subscription();
  }

  ngOnInit(): void {
    this.obtenerLista();
    this.obs$ = this.rcservice.refresh$.subscribe( () => {
      this.obtenerLista();
    });
  }

  obtenerLista() {
    this.rcservice.obtenerCanciones().subscribe( (datos: any) => {
      this.canciones = datos;      
    });
  }

}
