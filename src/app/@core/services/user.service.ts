import { getSession, resetSession } from './../utils/local';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISession } from '../models/session.interfaces';
import { IUser } from '../models/user.interface';

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
  getAllRoles(): Observable<any> {
    let direccion = this.url + '/users-permissions/roles';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }
  getAllCareers(): Observable<any> {
    let direccion = this.url + '/carreras';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  getUserById(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getSession().jwt}`,
    });
    let direccion = this.url + '/users/' + id;
    return this.http.get(direccion, { headers });
  }

  putUser(form: IUser, id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getSession().jwt}`,
    });
    let direccion = this.url + '/users/'+ id;
    return this.http.put(direccion, form ,{ headers });
  }

  deleteUser(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getSession().jwt}`,
    });
    let direccion = this.url + '/users/'+ id;
    return this.http.delete(direccion, { headers });
  }
  postUser(form:IUser): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getSession().jwt}`,
    });
    let direccion = this.url + '/auth/local/register';
    return this.http.post(direccion, form, { headers });
  }

  getSession(): ISession {
    return getSession();
  }

  resetSession() {
    resetSession();
  }
}
