import { getSession, resetSession } from './../utils/local';
import { IMeData, IUser } from '../models/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISession } from '../models/session.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.urlApi;
  // accessVar = new Subject<IMeData>();
  // accessVar$ = this.accessVar.asObservable();

  constructor(private http: HttpClient) {}

  // updateSession(newValue: IMeData) {
  //   this.accessVar.next(newValue);
  // }

  // start() {
  //   if (this.getSession()) {
  //     this.getMe().subscribe((result: IMeData) => {
  //       if (!result.status) {
  //         this.resetSession();
  //         return;
  //       }
  //       this.updateSession(result);
  //       return;
  //     });
  //   }
  //   this.updateSession({
  //     status: false,
  //   });
  // }

  login(identifier: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/auth/local`, { identifier, password });
  }

  getMe(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getSession().jwt}`,
    });
    return this.http.get(`${this.url}/users/me`, { headers });
  }

  setSession(jwt: string, expiresTimeInHours: number = 24) {
    const date = new Date();
    date.setHours(date.getHours() + expiresTimeInHours);
    const session: ISession = {
      expiresIn: new Date(date).toISOString(),
      jwt,
    };
    localStorage.setItem('session', JSON.stringify(session));
  }

  getSession(): ISession {
    return getSession();
  }

  resetSession() {
    resetSession();
  }
}
