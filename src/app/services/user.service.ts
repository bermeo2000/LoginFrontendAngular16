import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private httpClient: HttpClient) { }

/*   public añadirUsuario(user:any){
    return this.httpClient.post(`${environment.apiUsuarios}/`,user);
  } */

  añadirUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${environment.apiUsuarios}/`, usuario);
  }
}
