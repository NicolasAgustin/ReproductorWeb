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

  @ViewChild('cancionesLista', { static: true }) seleccion!: MatSelectionList;

  ngAfterViewInit(){}

  @Output()
  clickedSong: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  listaOpciones: EventEmitter<QueryList<MatListOption>>;
  public evento: EventEmitter<MatSelectionListChange> = new EventEmitter<MatSelectionListChange>();

  canciones: Cancion[];
  mostrado = false;
  @Input()
  public focusOnSelect$: Subject<number>;
  obs$: Subscription;

  constructor(private rcservice: ReqCancionesService) {
    this.canciones = [];
    this.obs$ = new Subscription();
    this.focusOnSelect$ = new Subject();
    this.listaOpciones = new EventEmitter<QueryList<MatListOption>>();
  }

  ngOnInit(): void {
    this.obtenerLista();
    this.obs$ = this.rcservice.refresh$.subscribe( () => {
      this.obtenerLista();
    });

    this.focusOnSelect$.subscribe((option: number, ) => {
      let qOptList = this.seleccion.options.get(option);
      if(typeof qOptList != 'undefined') this.seleccion.selectedOptions.select(qOptList);
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

  mouseHover(marquee: HTMLMarqueeElement){
    marquee.setAttribute('scrollamount', '5');
  }

  mouseOut(marquee: HTMLMarqueeElement){
    // console.log('hola');
    // marquee.loop = 1;
    // marquee.onfinish((elemento, evento) => {
    //   elemento.stop();
    // });
    // marquee.setAttribute('scrollamount', '0');
    // marquee.start();
  }


}
