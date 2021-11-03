import { getSession } from './../utils/local';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}
  url = `${environment.urlApi}/upload`;

  getAllFiles() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(`${this.url}/files`, { headers });
  }

  getSearchFiles(file: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.get(`${this.url}/files?_q=${file}`, { headers });
  }

  uploadFiles(formData) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.post(this.url, formData, { headers });
  }

  deleteFiles(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getSession().jwt}`,
    });
    return this.http.delete(`${this.url}/files/${id}`, { headers });
  }
}
