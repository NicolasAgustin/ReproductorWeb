import { Component, OnInit } from '@angular/core';
import { Cancion } from '../cancion';
import { ReqCancionesService } from '../req-canciones.service';

@Component({
  selector: 'app-barrabusqueda',
  templateUrl: './barrabusqueda.component.html',
  styleUrls: ['./barrabusqueda.component.css']
})
export class BarrabusquedaComponent implements OnInit {

  public cancionesBuscadas: Cancion[];

  constructor(private rcservice: ReqCancionesService) {
    this.cancionesBuscadas = [];
  }

  ngOnInit(): void {
  }

  buscar(valor: HTMLInputElement){
    let titulo: string = valor.value;
    this.rcservice.obtenerCancionLike(titulo).subscribe( (data: any) => {
      this.cancionesBuscadas = data;
    });
  }

}
