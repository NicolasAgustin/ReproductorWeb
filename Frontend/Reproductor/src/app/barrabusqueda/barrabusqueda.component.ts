import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Cancion } from '../cancion';
import { ReqCancionesService } from '../req-canciones.service';
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-barrabusqueda',
  templateUrl: './barrabusqueda.component.html',
  styleUrls: ['./barrabusqueda.component.css']
})
export class BarrabusquedaComponent implements OnInit {

  @ViewChild('formulario', {static: true}) barraBusqueda!: HTMLFormElement;

  ngAfterViewInit(){
  
  }

  public cancionesBuscadas: Cancion[];
  public open: boolean;
  public searchbar: FormControl;
  public idSelected: number;

  @Output()
  public cancionSeleccionada: EventEmitter<number> = new EventEmitter<number>();

  constructor(private rcservice: ReqCancionesService) {
    this.cancionesBuscadas = [];
    this.open = false;
    this.searchbar = new FormControl();
    this.idSelected = 0;
  }

  ngOnInit(): void {
  }

  buscar(){
    let titulo: string = this.searchbar.value;
    console.log('Valor de la busqueda: ' + titulo);
    if(titulo != ''){
      this.rcservice.obtenerCancionLike(titulo).subscribe( (data: any) => {
        this.cancionesBuscadas = data;
        console.log('datos: ' + this.cancionesBuscadas);
      });
    }
  }

  seleccionar(evento: Event) {
    console.log('evento: ' + evento.target);
    // this.cancionSeleccionada.emit(Number(evento.target));
  }

  emitir(evento: MatAutocompleteSelectedEvent, barra: HTMLInputElement){
    console.log('Barra de busqueda, opcion: ' + evento.option.value)
    this.idSelected = Number(evento.option.value);
    this.cancionSeleccionada.emit(this.idSelected);
    barra.value = '';
  }

}
