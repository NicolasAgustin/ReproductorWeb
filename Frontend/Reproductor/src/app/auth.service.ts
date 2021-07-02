import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl: string;
  private registerUrl: string;
  private token: string;

  constructor(private http: HttpClient) {
    this.loginUrl = environment.base + "auth/login";
    this.registerUrl = environment.base + "auth/register";
    this.token = '';
  }

  public setToken(token: string){
    this.token = token;
  }

  public registerUser(newUser: Usuario): Observable<any> {
    return this.http.post<any>(this.registerUrl, newUser);
  }

  public loginUser(user: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }

}
