import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getSession } from './../utils/local';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
  url = environment.urlApi;

  getAll() : Observable<any>{
    let direccion = this.url + '/solicitudes-temas';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }
  getStatus() : Observable<any>{
    let direccion = this.url + '/historials?_sort=estatus:desc&_limit=1';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }
}
