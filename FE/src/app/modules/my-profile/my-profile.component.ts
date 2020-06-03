import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/_services/user.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NotificationsEmitterService} from "../../_services/notifications.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  providers: [UsersService]
})
export class MyProfileComponent implements OnInit {
  editForm: any;

  constructor(private userService: UsersService,
              private router: Router,
              private msgService: NotificationsEmitterService) {
  }

  ngOnInit() {
    this.getMyUserDetails();
  }

  getMyUserDetails() {
    this.userService.getMyUserInfo().subscribe(resp => {
      console.log(resp);
      this.editForm =  new FormGroup({
        name: new FormControl(resp.name, [Validators.required, Validators.maxLength(50)]),
        surname: new FormControl(resp.surname, [Validators.required, Validators.maxLength(50)]),
        email: new FormControl({value: resp.email, disabled: true}, [Validators.required]),
        age: new FormControl(resp.age, [Validators.required])
      });
    }, error => {
      console.error(error);
      if (error.error && typeof error.error === 'string') {
        this.msgService.Error.emit(error.error);
      } else if (error.statusText && typeof error.statusText === 'string') {
        this.msgService.Error.emit(error.statusText);
      }
    });
  }

  editMyAccount() {
    const data = this.editForm.getRawValue();
    const body = {
      age: data.age,
      name: data.name,
      surname: data.surname
    };
    this.userService.editMyUser(body).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['home']);
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
