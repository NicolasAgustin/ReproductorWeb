import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private urlPost: string;

  constructor(private http: HttpClient) {
    // this.urlPost = "http://localhost:8080/users/register"
    this.urlPost = "http://192.168.0.110:8080/users/register"
  }

  public registerNewUser(newUser: Usuario) {
    return this.http.post<Usuario>(this.urlPost, newUser);
  }

}
