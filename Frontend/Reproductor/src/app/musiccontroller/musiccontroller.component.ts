import { Component, EventEmitter, OnInit } from '@angular/core';
import { Cancion } from '../cancion';
import { ReqCancionesService } from '../req-canciones.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSliderChange } from '@angular/material/slider';

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



  constructor(private rcservice: ReqCancionesService) {
    this.archivoUrl = '';
    this.audio = new Audio();
    this.titulo = '';
    this.currentSong = {titulo: '', rawTitulo: '', path: '', id: ''};
    this.nextId = 1;
    this.currentT = 0;
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
      this.audio.volume = Number((document.getElementById("volumeController") as HTMLInputElement).value);
      this.audio.play();
      this.addEventListeners();
      this.nextId = this.nextId + 1;
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

  changeVolume(e: Event){
    let volume = (e.target as HTMLInputElement).value;
    // let volume = e.value;
    console.log('volumen: ' + volume);
    this.audio.volume = Number(volume);
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


  getAudioTime(): number {
    return this.audio.currentTime;
  }

  stop(){
    this.audio.currentTime = 0;
    this.audio.pause();
  }

  seleccionarCancion(valor: number){
    this.load2(valor);
  }

}