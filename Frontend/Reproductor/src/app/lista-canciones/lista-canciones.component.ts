import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cancion } from '../cancion';
import { ReqCancionesService } from '../req-canciones.service';

@Component({
  selector: 'app-lista-canciones',
  templateUrl: './lista-canciones.component.html',
  styleUrls: ['./lista-canciones.component.css']
})
export class ListaCancionesComponent implements OnInit {

  @Output()
  clickedSong: EventEmitter<number> = new EventEmitter<number>();

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

  update(){
    this.rcservice.updateList();
  }

  onSelect(id: string){
    console.log('En metodo cancionClickeada');
    this.clickedSong.emit(Number(id));
  }

  obtenerLista() {
    this.rcservice.obtenerCanciones().subscribe( (datos: any) => {
      this.canciones = datos;
      console.log('Updated list');      
    });
  }

}
