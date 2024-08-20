import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  public loginStatusSubjec = new Subject<boolean>();

  generateToken(loginData: any) {
    return this.httpClient.post(`${environment.apiLogin}`, loginData);
  }

  getCurrentUser() {
    return this.httpClient.get(`${environment.apiActualUser}`);
  }
  
  loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //cerranis sesion y eliminamos el token del localStorage
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtenemos el token
  getToken() {
    return localStorage.getItem('token');
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }


}
