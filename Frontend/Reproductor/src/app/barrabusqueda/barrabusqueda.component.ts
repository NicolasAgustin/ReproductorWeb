import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Cancion } from '../cancion';
import { ReqCancionesService } from '../req-canciones.service';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-barrabusqueda',
  templateUrl: './barrabusqueda.component.html',
  styleUrls: ['./barrabusqueda.component.css']
})
export class BarrabusquedaComponent implements OnInit {

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

  ngOnInit(): void {}

  /**
   * Descipcion: Este metodo se va a llamar cada vez que se introduzca una letra en la barra de busqueda
   */
  buscar(){
    let titulo: string = this.searchbar.value;
    console.log('Valor de la busqueda: ' + titulo);
    if(titulo != ''){
      // si el titulo no esta vacio entonces obtengo las canciones que hacen match
      // la data que obtengo con el observable implementa la interfaz Cancion, por lo que se asigna al arreglo de canciones
      this.rcservice.obtenerCancionLike(titulo).subscribe( (data: any) => { this.cancionesBuscadas = data } );
    }
  }

  /**
   * Descipcion: Emite un evento al componente padre
   * evento: contendra la cancion que se selecciono (el id)
   * barra: referencia al elemento input de html para poder vaciarlo
   */
  emitir(evento: MatAutocompleteSelectedEvent, barra: HTMLInputElement){
    console.log('Barra de busqueda, opcion: ' + evento.option.value)
    this.idSelected = Number(evento.option.value);
    // el componente padre recibira el id de la cancion
    this.cancionSeleccionada.emit(this.idSelected);
    barra.value = '';
  }

}
