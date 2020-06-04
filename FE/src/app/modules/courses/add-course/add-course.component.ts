import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/_services/courses.service';
import {NotificationsEmitterService} from "../../../_services/notifications.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  providers: [CoursesService]
})
export class AddCourseComponent implements OnInit {
  addForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(250)])
  });

  constructor(private coursesService: CoursesService,
              private router: Router,
              private msgService: NotificationsEmitterService) { }

  ngOnInit(): void {
  }

  addCourse() {
    const body = this.addForm.getRawValue();
    this.coursesService.addNewCourse(body).subscribe(resp => {
      this.msgService.Success.emit('Successfully added course');
      this.router.navigate(['courses']);
    }, error => {
      console.error(error);
      if (error.error && typeof error.error === 'string') {
        this.msgService.Error.emit(error.error);
      } else if (error.statusText && typeof error.statusText === 'string') {
        this.msgService.Error.emit(error.statusText);
      }
    });
  }
}
