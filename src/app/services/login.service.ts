import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logged: boolean;

  constructor(private http: HttpClient) {
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

  getDataFromAPI() {
    return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(map((res: any) => {
      const data = [];
      for (const obj of res.data) {
        const value = {... obj, modify: true};
        data.push(value);
      }
      return data;
    }))
  }

  validateForm(form: any): boolean {
    const type = form.user.type;
    let valid = false;
    if (type === 'admin') {
      valid = form.user.data.value === 'GESTION' ? true : false;
    } else {
      valid = form.user.data.value === 'CONSULTAR' ? true : false;
    }
    return valid;
  }
}
