import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Cancion } from './cancion';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReqCancionesService {

  public refresh$: Subject<void> = new Subject<void>();
  private url: string;

  constructor(private http: HttpClient) {
    //this.url = 'http://localhost:8080/canciones';
    this.url = 'http://192.168.0.110:8080/canciones';
  }

  public obtenerCanciones(): Observable<Cancion>{
    return this.http.get<Cancion>(this.url)
      .pipe(
        tap( () => {
          //this.refresh$.next();
        })
      )
  }

  public updateList(){
    this.refresh$.next();
  }

  public obtenerCancionLike(titulo: string){
    return this.http.get<Cancion>(this.url + '/buscar/' + titulo);
  }

  public obtenerCancion(id: number){
    return this.http.get(this.url + '/getFile/' + id, { responseType: "blob" });
  }

  public obtenerDatosCancion(id: number){
    return this.http.get<Cancion>(this.url + '/getSong/' + id);
  }

}
