import { IAsesor, ISolitud } from './../models/carrera.interface';
import { getSession } from './../utils/local';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(private http: HttpClient) {}
  url = environment.urlApi;

  getAllByUsers(userId: number): Observable<any> {
    let direccion = this.url + `/solicitudes-temas?usuario_id.id=${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  getAllByIdAndUsers(solicitudId: number): Observable<any> {
    let direccion = this.url + `/solicitudes-temas/${solicitudId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  createSolicitud(solicitud: ISolitud): Observable<any> {
    let direccion = this.url + `/solicitudes-temas`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.post(direccion, { ...solicitud }, { headers });
  }

  createAsesor(asesor: IAsesor): Observable<any> {
    let direccion = this.url + `/asesors`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.post(direccion, { ...asesor }, { headers });
  }
}
