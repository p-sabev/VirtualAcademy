import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class CoursesService {
  constructor(private http: HttpClient) {
  }

  fetchCourses(): Observable<any> {
      return this.http.get('api/courses');
  }

  setCourseRate(body): Observable<any> {
    return this.http.post('api/courses/addRate', body);
  }

}