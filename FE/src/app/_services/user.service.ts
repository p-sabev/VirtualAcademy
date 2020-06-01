import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, forkJoin} from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any> {
      return this.http.get('api/users');
  }

}