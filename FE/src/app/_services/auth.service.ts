import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { EmittersService } from './emitter.service';

@Injectable()
export class AuthService {

  constructor(private router: Router,
              private http: HttpClient,
              private emitterService: EmittersService) {
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return (token !== 'null' && token !== null);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  login(data): Observable<any> {
    return this.http.post('/api/users/login', data);
  }

  signIn(data): Observable<any> {
    return this.http.post('/api/users', data);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
    this.emitterService.loggedIn.emit(false);
  }

  isTokenValid() {
    return !!localStorage.getItem('token');
  }
}
