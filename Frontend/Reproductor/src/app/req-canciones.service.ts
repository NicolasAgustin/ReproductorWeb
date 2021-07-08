import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cancion } from './cancion';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReqCancionesService {

  // Observable para actualizar la lista de canciones cuando se agrega una nueva
  public refresh$: Subject<void> = new Subject<void>();
  // Url principal hacia donde se haran las peticiones HTTP
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.base + 'canciones';
  }

  /**
   * Descripcion: Envia una peticion HTTP hacia el backend con el verbo GET, para obtener las canciones
   */
  public obtenerCanciones(): Observable<Cancion> {
    return this.http.get<Cancion>(this.url);
  }

  /**
   * Descripcion: ---
   */
  public updateList(){
    this.refresh$.next();
  }

  /**
   * Descripcion: Envia una peticion HTTP hacia el backend con el verbo GET, para obtener el cover de la cancion
   */
  public obtenerImagen(id: number){
    return this.http.get(this.url + '/getFile/meta/' + id, {responseType: 'blob'});
  }

  /**
   * Descripcion: Envia una peticion HTTP hacia el backend con el verbo GET, para obtener canciones que hagan match con la buscada
   */
  public obtenerCancionLike(titulo: string){
    return this.http.get<Cancion>(this.url + '/buscar/' + titulo);
  }

  /**
   * Descripcion: Envia una peticion HTTP hacia el backend con el verbo GET, para obtener una cancion especifica
   */
  public obtenerCancion(id: number){
    return this.http.get(this.url + '/getFile/' + id, { responseType: "blob" });
  }

  /**
   * Descripcion: Envia una peticion HTTP hacia el backend con el verbo GET, para obtener metadatos de la cancion
   */
  public obtenerDatosCancion(id: number){
    return this.http.get<Cancion>(this.url + '/getSong/' + id);
  }

}
