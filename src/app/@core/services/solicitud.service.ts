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

  getAllByIdAndUsers(solicitudId: any): Observable<any> {
    let direccion = this.url + `/solicitudes-temas/${solicitudId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }
  getMySolicitudPendiente(myId: string, statusId: string): Observable<any> {
    let direccion =
      this.url +
      `/solicitudes-temas?estatus_id.id=${statusId}&usuario_id.id=${myId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  getSolicitudNotCulminadas(): Observable<any> {
    let direccion = this.url + `/solicitudes-temas?estatus_id.id_ne=6`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  getSolicitudCulminadas(): Observable<any> {
    let direccion = this.url + `/solicitudes-temas?estatus_id=6`;
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

  editSolicitud(solicitud: ISolitud, id: number): Observable<any> {
    let direccion = this.url + `/solicitudes-temas/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.put(direccion, { ...solicitud }, { headers });
  }

  deleteSolicitudes(id: number): Observable<any> {
    let direccion = this.url + `/solicitudes-temas/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.delete(direccion, { headers });
  }

  createAsesor(asesor: IAsesor): Observable<any> {
    let direccion = this.url + `/asesors`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.post(direccion, { ...asesor }, { headers });
  }

  editAsesor(asesor: IAsesor, id: number): Observable<any> {
    let direccion = this.url + `/asesors/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.put(direccion, { ...asesor }, { headers });
  }

  deleteAsesor(id: number): Observable<any> {
    let direccion = this.url + `/asesors/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.delete(direccion, { headers });
  }

  getAllAsesors(): Observable<any>{
    let direccion = this.url + '/asesors';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }
  
  getAllRequest() : Observable<any>{
    let direccion = this.url + '/solicitudes-temas?status=false';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  getAllOnProject() : Observable<any>{
    let direccion = this.url + '/solicitudes-temas?status=true&estatus_id.id_ne=6';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  getAllStatus():Observable<any>{
    let direccion = this.url + '/estatuses';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(direccion, { headers });
  }

  editTopicRequest(id: any, temaId: any):Observable<any>{
    let direccion = this.url + `/solicitudes-temas/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.put(direccion, temaId ,{ headers });
  }
  editLineRequest(id: any, lineaId: any):Observable<any>{
    let direccion = this.url + `/solicitudes-temas/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.put(direccion, lineaId ,{ headers });
  }

  editUsersRequest(id: any, usersId: any):Observable<any>{
    let direccion = this.url + `/solicitudes-temas/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.put(direccion, usersId ,{ headers });
  }

  addObsRequest(obs: any):Observable<any>{
    let direccion = this.url + `/historials`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.post(direccion, obs ,{ headers });
  }

  editStatusRequest(id: any, statusId: any):Observable<any>{
    let direccion = this.url + `/solicitudes-temas/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.put(direccion, statusId ,{ headers });
  }

  acceptRequest(id: number):Observable<any>{
    let direccion = this.url + `/solicitudes-temas/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.put(direccion, {status:true} ,{ headers });
  }
}
