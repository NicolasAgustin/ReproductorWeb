import { Component, OnInit } from '@angular/core';
import { ReqCancionesService } from '../req-canciones.service';

@Component({
  selector: 'app-musiccontroller',
  templateUrl: './musiccontroller.component.html',
  styleUrls: ['./musiccontroller.component.css']
})
export class MusicControllerComponent implements OnInit {

  private audio: HTMLAudioElement;
  private archivoUrl;

  constructor(private rcservice: ReqCancionesService) {
    this.archivoUrl = '';
    this.audio = new Audio();
  }

  ngOnInit(): void {
  }

  cargar(id: HTMLInputElement){
    this.audio.src = '';
    this.rcservice.obtenerCancion(Number(id.value)).subscribe( (data: any) => {
      let archivo = new Blob([data], {type:'application/mp3'});
      this.archivoUrl = URL.createObjectURL(archivo);
      this.audio = new Audio(this.archivoUrl);
      this.audio.load();
      this.audio.play();
    });
  }

  parar(){
    this.audio.pause();
  }

  play(){
    this.audio.play();
  }

  reset(){
    this.audio.currentTime = 0;
  }

}
