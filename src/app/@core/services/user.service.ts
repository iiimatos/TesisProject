import { getSession, resetSession } from './../utils/local';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISession } from '../models/session.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  url = environment.urlApi;

  getAllUsers(): Observable<any> {
    let direccion = this.url + '/users?role.name=student';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  getUserById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getSession().jwt}`,
    });
    let direccion = this.url + '/users';
    return this.http.get(direccion, { headers });
  }

  getSession(): ISession {
    return getSession();
  }

  resetSession() {
    resetSession();
  }
}
