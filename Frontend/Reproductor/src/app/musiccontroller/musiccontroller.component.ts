import { AfterViewInit, Component, EventEmitter, OnInit, Output, QueryList } from '@angular/core';
import { Cancion } from '../cancion';
import { ReqCancionesService } from '../req-canciones.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSliderChange, MatSlider } from '@angular/material/slider';
import { Observable, Subject } from 'rxjs';
import { MatListOption } from '@angular/material/list';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-musiccontroller',
  templateUrl: './musiccontroller.component.html',
  styleUrls: ['./musiccontroller.component.css']
})
export class MusicControllerComponent implements OnInit {

  @Output()
  public selected$: Subject<number>;

  public audio: HTMLAudioElement;
  public imageUrl: SafeUrl;
  private archivoUrl;
  public titulo: string;
  public currentT: number;
  private currentSong: Cancion;
  private nextId: number;
  private previousId: number;
  public playing: boolean;
  private volumen: number;
  private cantidadCanciones: number;
  public timeStatus: string;
  public totalTime: string;
  public listaOpciones: QueryList<MatListOption>;

  constructor(private rcservice: ReqCancionesService, private sanitizer: DomSanitizer) {
    this.archivoUrl = '';
    this.audio = new Audio();
    this.imageUrl = '';
    this.titulo = '';
    this.currentSong = {titulo: '', rawTitulo: '', path: '', id: ''};
    this.previousId = 0;
    this.nextId = 1;
    this.currentT = 0;
    this.playing = false;
    this.volumen = 0.50;
    this.cantidadCanciones = 0;
    this.timeStatus = '00:00';
    this.totalTime = '00:00'; 

    this.listaOpciones = new QueryList<MatListOption>();
    this.selected$ = new Subject();

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

  loadImage(){
    this.rcservice.obtenerImagen(this.nextId).subscribe((data) => {
      let imagen = new Blob([data], {type: 'image/jpeg'});
      // this.imageUrl = URL.createObjectURL(imagen);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(imagen));
    });
  }

  cargarCancion(){
    console.log('ID ACTUAL EN CARGAR ',this.nextId);
    this.rcservice.obtenerCancion(this.nextId).subscribe( (data: any) => {
      let archivo = new Blob([data], {type:'application/mp3'});
      this.archivoUrl = URL.createObjectURL(archivo);
      this.audio = new Audio(this.archivoUrl);
      this.audio.load();
      this.rcservice.obtenerDatosCancion(this.nextId).subscribe( (data: Cancion) => {
        console.log(data);
        this.currentSong = data;
        this.titulo = this.currentSong['rawTitulo'].split('.')[0];
      });
      this.audio.volume = this.volumen;
      this.playing = false;
      this.changeState();
      this.addEventListeners();
      this.loadImage();
      this.selected$.next(this.nextId-1);
      

      this.previousId = this.nextId - 1;
      if(this.nextId < this.cantidadCanciones) this.nextId = this.nextId + 1; else this.nextId = 1;
      if(this.previousId <= 0) this.previousId = this.cantidadCanciones; else this.previousId - 1;
      
      console.log('cancion siguiente: ' + this.nextId);
      console.log('cancion previa: ' + this.previousId);
    });
  }

  addEventListeners(){
    this.audio.onended = this.cargarCancion.bind(this);
    this.audio.onplaying = this.setTime.bind(this);
    this.audio.ontimeupdate = this.updateProgress.bind(this);
  }

  changeVolume(e: MatSliderChange){
    let newVolume = e.value;
    if(typeof newVolume === 'number') this.volumen = newVolume;
    this.audio.volume = this.volumen;
  }

  updateProgress(){
    this.timeStatus = this.formatTime(this.audio.currentTime);
    this.currentT = (this.audio.currentTime / this.audio.duration) * 100;
  }

  formatTime(time: number): string {
    let seconds: number | string = time;
    let minutes: number | string = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

  setTime(){
    this.totalTime = this.formatTime(this.audio.duration);
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
  }

  getAudioTime(): number {
    return this.audio.currentTime;
  }

  updateTime(evento: MatSliderChange){
    this.audio.currentTime = Number(evento.value);
  }

  stop(){
    this.audio.currentTime = 0;
    this.audio.pause();
    this.changeState();
  }

  seleccionarCancion(valor: number){
    this.load2(valor);
  }

  nextSong(){
    this.load2(this.nextId);
  }

  previousSong(){
    this.load2(this.previousId);
  }

}
