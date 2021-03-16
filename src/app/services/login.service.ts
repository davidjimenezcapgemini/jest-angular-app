import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logged: boolean;

  constructor() {
    this.logged = false;
  }

  login(user: string, pass: string): Observable<any> {
    return new Observable(observer => {
      if (user && pass) {
        setTimeout(() => {
          observer.next({data: { jwt: 'eY65kxV40p11Z'}});
        }, 2500);
      } else {
        observer.error('Las credenciales no son correctas');
      }
    });
  }

  setLogged(jwt: string): void {
    this.logged = true;
    sessionStorage.setItem('jwt', jwt);
  }
}
