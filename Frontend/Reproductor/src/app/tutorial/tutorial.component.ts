import { Component, OnInit } from '@angular/core';
import { } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  public playing: boolean;
  public titulo: string;

  constructor(private router: Router) {
    this.playing = false;
    this.titulo = 'Reanuda la canción en reproducción';
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if(token === null) this.router.navigate(['badrequest']);
  }

  goBack(){
    this.router.navigate(['principal']);
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
