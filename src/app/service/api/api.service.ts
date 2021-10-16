import { Injectable } from '@angular/core';
import { ListaUsuariosI } from '../../models/users.interface'
import { HttpClient , HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  url:string = "http://localhost:1337/";

  getAllUsers(){
    let direccion = this.url + "users"
    return this.http.get(direccion);
  }
}
