import { getSession } from './../utils/local';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITema } from '../models/carrera.interface';

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

  getTemaByIdCarreraNoSeleccionado(id: number): Observable<any> {
    let direccion = this.url + `/temas?carrera_id.id=${id}&seleccionado=false`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  getAllTemasNoSeleccionado(): Observable<any> {
    let direccion = this.url + '/temas?seleccionado=false';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  getTemaById(id: number): Observable<any> {
    let direccion = this.url + `/temas/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  createTema(tema: ITema): Observable<any> {
    let direccion = this.url + '/temas';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.post(direccion, { ...tema }, { headers });
  }

  editTema(tema: ITema, id: number): Observable<any> {
    let direccion = this.url + `/temas/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.put(direccion, { ...tema }, { headers });
  }

  deleteTemaById(id: number): Observable<any> {
    let direccion = this.url + `/temas/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.delete(direccion, { headers });
  }

  getLineaByIdCarrera(id: number): Observable<any> {
    let direccion = this.url + `/linea-investigacions?carrera_id.id=${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  getAllRoles(): Observable<any> {
    let direccion = this.url + '/users-permissions/roles';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  getMyHistorial(userId: string): Observable<any> {
    let direccion =
      this.url + `/historials?solicitudes_tema.usuario_id.id=${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  getMyHistorialRequest(userId: any): Observable<any> {
    let direccion =
      this.url + `/historials?solicitudes_tema.id=${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  getAllTemaByCarrera(id: number){
    let direccion = this.url + `/temas?carrera_id.id=${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }
}
