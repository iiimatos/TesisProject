import { getSession } from './../utils/local';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarreraService {
  constructor(private http: HttpClient) {}
  url = environment.urlApi;

  getAllCarreras(): Observable<any> {
    let direccion = this.url + '/carreras';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  getTemaByIdCarrera(id: number): Observable<any> {
    let direccion = this.url + `/temas?carrera_id.id=${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  getLineaByIdCarrera(id: number): Observable<any> {
    let direccion = this.url + `/linea-investigacions?carrera_id.id=${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }
}
