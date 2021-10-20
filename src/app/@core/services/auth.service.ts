import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  url = environment.urlApi;

  login(identifier: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/auth/local`, {identifier, password});
  }


}
