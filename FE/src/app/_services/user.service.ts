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

  deleteUser(id) {
    return this.http.delete('api/users/' + id);
  }

  changeUserRoles(body) {
    return this.http.post('api/users/grantPermission', body);
  }

  getMyUserInfo(): Observable<any> {
    return this.http.get('api/users/me');
  }

  editMyUser(body) {
    return this.http.post('api/users/edit', body);
  }
}
