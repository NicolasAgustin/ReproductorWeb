import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cancion } from '../cancion';
import { ReqCancionesService } from '../req-canciones.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSliderChange, MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-musiccontroller',
  templateUrl: './musiccontroller.component.html',
  styleUrls: ['./musiccontroller.component.css']
})
export class MusicControllerComponent implements OnInit {

  private audio: HTMLAudioElement;
  private archivoUrl;
  public titulo: string;
  public currentT: number;
  private currentSong: Cancion;
  private nextId: number;
  public playing: boolean;
  private volumen: number;
  private cantidadCanciones: number;

  constructor(private rcservice: ReqCancionesService) {
    this.archivoUrl = '';
    this.audio = new Audio();
    this.titulo = '';
    this.currentSong = {titulo: '', rawTitulo: '', path: '', id: ''};
    this.nextId = 1;
    this.currentT = 0;
    this.playing = false;
    this.volumen = 0.50;
    this.cantidadCanciones = 0;

    this.rcservice.obtenerCanciones().subscribe((data: any) => {
      this.cantidadCanciones = data.length;
      console.log('cantidad de canciones: ' + this.cantidadCanciones);
    });

  }

  ngOnInit(): void {
  }

  load(id: HTMLInputElement){
    this.audio.src = '';
    this.rcservice.obtenerCancion(Number(id.value)).subscribe( (data: any) => {
      let archivo = new Blob([data], {type:'application/mp3'});
      this.archivoUrl = URL.createObjectURL(archivo);
      this.audio = new Audio(this.archivoUrl);
      this.audio.load();
      this.rcservice.obtenerDatosCancion(Number(id.value)).subscribe( (data: Cancion) => {
        console.log(data);
        this.currentSong = data;
        this.titulo = 'playing ' + this.currentSong['rawTitulo'];
      });
      // this.audio.play();
    });
  }

  /**
   * Metodo duplicado, se tiene que cambiar
   */
   load2(id: number){
    this.nextId = id;
    console.log('Cancion seleccionada ', id);
    this.audio.src = '';
    this.cargarCancion();

    
    // this.audio.onended = this.cargarCancion;
    // this.audio.addEventListener('ended', this.cargarCancion);

  }

  cargarCancion(){
    // let id: number = this.nextId;
    //this.audio.src = '';
    console.log(this);

    console.log('ID ACTUAL EN CARGAR ',this.nextId);
    this.rcservice.obtenerCancion(this.nextId).subscribe( (data: any) => {
      let archivo = new Blob([data], {type:'application/mp3'});
      this.archivoUrl = URL.createObjectURL(archivo);
      this.audio = new Audio(this.archivoUrl);
      this.audio.load();
      this.rcservice.obtenerDatosCancion(this.nextId).subscribe( (data: Cancion) => {
        console.log(data);
        this.currentSong = data;
        this.titulo = 'playing ' + this.currentSong['rawTitulo'];
      });
      this.audio.volume = this.volumen;
      this.playing = false;
      this.changeState();
      this.addEventListeners();

      if(this.nextId < this.cantidadCanciones) this.nextId = this.nextId + 1; else this.nextId = 1;
      
      console.log(this.nextId);
    });
  }

  addEventListeners(){
    this.audio.onended = this.cargarCancion.bind(this);
    this.audio.onplaying = this.setTime.bind(this);
    this.audio.ontimeupdate = this.updateProgress.bind(this);
    // this.audio.on
    // this.audio.addEventListener('ended', this.cargarCancion.bind(this));
    // this.audio.addEvent
  }

  changeVolume(e: MatSliderChange){
    let newVolume = e.value;
    if(typeof newVolume === 'number') this.volumen = newVolume;
    // console.log('volumen: ' + this.volumen);
    this.audio.volume = this.volumen;
  }

  updateProgress(){
    this.currentT = (this.audio.currentTime / this.audio.duration) * 100;
  }

  setTime(){
    this.currentT = this.audio.currentTime;
  }

  pause(){
    this.audio.pause();
  }

  play(){
    this.audio.play();
  }

  changeState(){
    if (this.playing){
      this.audio.pause();
      this.playing = false;
    }  else {
      this.audio.play();
      this.playing = true;
    }
    
    // this.playing = evento;
  }

  getAudioTime(): number {
    return this.audio.currentTime;
  }

  stop(){
    this.audio.currentTime = 0;
    this.audio.pause();
  }

  seleccionarCancion(valor: number){
    this.load2(valor);
    // this.changeState()
  }

  nextSong(){
    this.load2(this.nextId);
  }

}
