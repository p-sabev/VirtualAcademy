import { Component, OnInit } from '@angular/core';
import { Course } from './courses.model';
import { CoursesService } from 'src/app/_services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [CoursesService]
})
export class CoursesComponent implements OnInit {
  courses: Course[];
  responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];
  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses() {
    this.coursesService.fetchCourses().subscribe(resp => {
      this.courses = resp;
      console.log(this.courses);
    }, error => {
      console.error(error);
    });
  }

  handleRate(event, course) {
    console.log('You have rated ' + event.value);
    console.log(course);
    const body = {
      id: course._id,
      rating: event.value
    };

    this.coursesService.setCourseRate(body).subscribe(resp => {
      console.log(resp);
      this.courses.forEach(el => {
        if (el._id === resp._id) {
          el.usersRated = resp.usersRated;
          el.averageRating = resp.averageRating;
        }
      });
    }, error => {
      console.error(error);
    });
  }
}
