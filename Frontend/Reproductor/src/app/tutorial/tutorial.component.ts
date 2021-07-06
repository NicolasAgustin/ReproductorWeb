import { Component, OnInit } from '@angular/core';
import { } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  public playing: boolean;
  public titulo: string;

  constructor() {
    this.playing = false;
    this.titulo = 'Reanuda la canción en reproducción';
  }

  ngOnInit(): void {
  }

  changeState(){
    this.playing = !this.playing;
    if(this.playing) this.titulo = "Pausa la canción en reproducción"; else this.titulo = "Reanuda la canción en reproducción";
    // if (this.playing){
    //   this.playing = false;
    // }  else {
    //   this.playing = true;
    // }
  }

}
