import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor() { }

  // Metodo para interceptar todas las peticiones HTTP que se realicen y setearles el token para validarse en el backend
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Obtengo el token de la cache
    const token = sessionStorage.getItem('token');
    // Si el token no es nulo, clono la peticion y seteo el header de authorization con el token precedido de la palabra Bearer
    if(token !== null){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      })
    }
    return next.handle(request);
  }
}
