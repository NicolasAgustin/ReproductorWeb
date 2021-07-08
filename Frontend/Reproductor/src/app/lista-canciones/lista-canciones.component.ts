import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { Subject, Subscription } from 'rxjs';
import { Cancion } from '../cancion';
import { ReqCancionesService } from '../req-canciones.service';

@Component({
  selector: 'app-lista-canciones',
  templateUrl: './lista-canciones.component.html',
  styleUrls: ['./lista-canciones.component.css']
})
export class ListaCancionesComponent implements OnInit, AfterViewInit {

  // Obtengo el componente hijo con id 'cancionesLista'
  @ViewChild('cancionesLista', { static: true }) seleccion!: MatSelectionList;

  ngAfterViewInit(){}

  // Evento cuando se clikea una cancion de la lista
  @Output()
  clickedSong: EventEmitter<number> = new EventEmitter<number>();

  
  // public evento: EventEmitter<MatSelectionListChange> = new EventEmitter<MatSelectionListChange>(); para revisar
  // Lista de canciones
  public canciones: Cancion[];
  // public mostrado = false;

  // Observable del componente padre para sombrear la cancion que se esta reproduciendo
  @Input()
  public focusOnSelect$: Subject<number>;

  // Observable para actualizar la lista de canciones
  public obs$: Subscription;

  constructor(private rcservice: ReqCancionesService) {
    this.canciones = [];
    this.obs$ = new Subscription();
    this.focusOnSelect$ = new Subject();
  }

  ngOnInit(): void {

    this.obtenerLista();
    this.obs$ = this.rcservice.refresh$.subscribe( () => {
      this.obtenerLista();
    });

    this.focusOnSelect$.subscribe((option: number, ) => {
      // option: id de la cancion

      // Obtengo la opcion del MatSelectionList
      let qOptList = this.seleccion.options.get(option);

      // Si la se pudo obtener las opciones, las sombreo
      if(typeof qOptList != 'undefined') this.seleccion.selectedOptions.select(qOptList);
    });

  }

  /**
   * Descripcion: metodo para seleccionar la cancion de la lista
   * id: id de la cancion seleccionada
   */
  onSelect(id: string){
    // Se emite un evento al componente padre
    this.clickedSong.emit(Number(id));
  }

  /**
   * Descripcion: Metodo para obtener la lista de canciones desde el backend
   */
  obtenerLista() {
    this.rcservice.obtenerCanciones().subscribe( (datos: any) => {
      this.canciones = datos;    
    });
  }

}
