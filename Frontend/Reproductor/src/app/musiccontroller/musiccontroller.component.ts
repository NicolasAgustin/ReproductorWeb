import { Component, OnInit, Output } from '@angular/core';
import { Cancion } from '../cancion';
import { ReqCancionesService } from '../req-canciones.service';
import { MatSliderChange } from '@angular/material/slider';
import { Subject } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-musiccontroller',
  templateUrl: './musiccontroller.component.html',
  styleUrls: ['./musiccontroller.component.css']
})
export class MusicControllerComponent implements OnInit {

  // Observable para enviarle al componente hijo, lista canciones
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

  constructor(private rcservice: ReqCancionesService, private sanitizer: DomSanitizer, private router: Router) {
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
    this.selected$ = new Subject();

    // Obtengo la cantidad de canciones
    this.rcservice.obtenerCanciones().subscribe((data: any) => {
      this.cantidadCanciones = data.length;
      console.log('cantidad de canciones: ' + this.cantidadCanciones);
    });
  }

  ngOnInit(): void {
    // Al inicio de la aplicacion, chequeo si el token en la cache el null
    // Si no hay token presente, se muestra el componente badrequest
    const token = sessionStorage.getItem('token');
    if(token === null) this.router.navigate(['badrequest']);
  }

  /**
   * Descripcion: cargar la cancion
   * id: identificador de la cancion a cargar
   */
   load(id: number){
    this.nextId = id;
    // Limpio la fuente del audio
    this.audio.src = '';
    // Cargo la cancion
    this.cargarCancion();
  }

  /**
   * Descripcion: cargo el cover art de la cancion
   */
  loadImage(){
    this.rcservice.obtenerImagen(this.nextId).subscribe((data) => {
      // Creo un nuevo blob a partir de los datos binarios obtenidos del backend
      let imagen = new Blob([data], {type: 'image/jpeg'});
      // Sanitizo la url del recurso para poder renderizar la imagen
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(imagen));
    });
  }

  /**
   * Descripcion: cargar la cancion y actualizar siguiente, previo, definir listeners, etc
   */
  cargarCancion(){
    this.rcservice.obtenerCancion(this.nextId).subscribe( (data: any) => {
      // Creo un blob a partir de los datos binarios del backend
      let archivo = new Blob([data], {type:'application/mp3'});
      // Creo una url para el recurso obtenido
      this.archivoUrl = URL.createObjectURL(archivo);
      // Instancio un objeto audio a partir de la url antes obtenida
      this.audio = new Audio(this.archivoUrl);
      this.audio.load();
      // Obtengo los datos de la cancion, titulo
      this.rcservice.obtenerDatosCancion(this.nextId).subscribe( (data: Cancion) => {
        this.currentSong = data;
        this.titulo = this.currentSong['rawTitulo'].split('.')[0];
      });
      // El nuevo audio debe tener el mismo volumen del anterior
      this.audio.volume = this.volumen;
      this.playing = false;
      this.changeState();
      this.addEventListeners();
      this.loadImage();

      // Le envio una actualizacion al componente hijo (listaCanciones) para que se pinte la cancion actual
      this.selected$.next(this.nextId-1);
    
      // Determino el id anterior, siguiente
      this.previousId = this.nextId - 1;
      if(this.nextId < this.cantidadCanciones) this.nextId = this.nextId + 1; else this.nextId = 1;
      if(this.previousId <= 0) this.previousId = this.cantidadCanciones; else this.previousId - 1;
    });
  }

  /**
   * Descripcion: agrego listeners para el audio
   */
  addEventListeners(){
    // Cuando se setea cada eventListener, se especifica que el scope de la funcion sera el objeto actual (this)
    // Cuando se termina de reproducir el audio, se carga la siguiente cancion
    this.audio.onended = this.cargarCancion.bind(this);
    // Seteo el tiempo total de la cancion
    this.audio.onplaying = this.setTime.bind(this);
    // Actualizo el tiempo actual
    this.audio.ontimeupdate = this.updateProgress.bind(this);
  }

  /**
   * Descripcion: cambio el valor del volumen
   * e: evento
   */
  changeVolume(e: MatSliderChange){
    let newVolume = e.value;
    if(typeof newVolume === 'number') this.volumen = newVolume;
    this.audio.volume = this.volumen;
  }

  /**
   * Descripcion: actualiza constantemente el tiempo actual
   */
  updateProgress(){
    this.timeStatus = this.formatTime(this.audio.currentTime);
  }

  /**
   * Descripcion: formatea el tiempo obtenido del HTMLAudioElement para mostrarlo con el formato 00:00 
   * time: tiempo actual del audio
   */
  formatTime(time: number): string {
    let seconds: number | string = time;
    let minutes: number | string = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

  /**
   * Descripcion: Seteo el tiempo total del audio
   */
  setTime(){
    this.totalTime = this.formatTime(this.audio.duration);
    this.currentT = this.audio.currentTime;
  }

  /**
   * Descripcion: pausa el audio
   */
  pause(){
    this.audio.pause();
  }

  /**
   * Descripcion: comienza a reproducir el audio
   */
  play(){
    this.audio.play();
  }

  /**
   * Descripcion: cambia el estado del reproductor, play/pausa
   */
  changeState(){
    if (this.playing){
      this.audio.pause();
      this.playing = false;
    }  else {
      this.audio.play();
      this.playing = true;
    }
  }

  /**
   * Descripcion: Obtener el tiempo actual del audio
   */
  getAudioTime(): number {
    return this.audio.currentTime;
  }

  /**
   * Descripcion: metodo para soportar el arrastre de la barra de progreso
   */
  updateTime(evento: MatSliderChange){
    // seteo el tiempo actual del audio
    this.audio.currentTime = Number(evento.value);
  }

  /**
   * Descripcion: parar la reproduccion
   */
  stop(){
    this.audio.currentTime = 0;
    this.audio.pause();
    this.changeState();
  }

  /**
   * Descripcion: metodo para cargar la cancion seleccionada desde la lista de canciones o desde la barra de busqueda
   */
  seleccionarCancion(valor: number){
    this.load(valor);
  }

  /**
   * Descripcion: siguiente cancion
   */
  nextSong(){
    this.load(this.nextId);
  }

  /**
   * Descripcion: cancion anterior
   */
  previousSong(){
    this.load(this.previousId);
  }

  goBack(){
    this.router.navigate(['principal']);
    this.stop();
    this.audio.src = '';
  }

}
