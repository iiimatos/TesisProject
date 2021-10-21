import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  url = environment.urlApi;

  getAllUsers(): Observable<any>{
    let direccion = this.url + "/users"
    return this.http.get(direccion);
  }


}
