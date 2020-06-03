import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/_services/user.service';
import { User } from './users.model';
import {NotificationsEmitterService} from "../../_services/notifications.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  constructor(private userService: UsersService, private msgService: NotificationsEmitterService) { }

   users: User[];

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(resp => {
      console.log(resp);
      resp.forEach(user => {
        user.isAdmin = user.roles.length > 1;
      });
      this.users = resp;
    }, error => {
      console.error(error);
      if (error.error && typeof error.error === 'string') {
        this.msgService.Error.emit(error.error);
      } else if (error.statusText && typeof error.statusText === 'string') {
        this.msgService.Error.emit(error.statusText);
      }
    });
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe(resp => {
      console.log(resp);
      this.fetchUsers();
      this.msgService.Success.emit('Successfully deleted user');
    }, error => {
      console.error(error);
      if (error.error && typeof error.error === 'string') {
        this.msgService.Error.emit(error.error);
      } else if (error.statusText && typeof error.statusText === 'string') {
        this.msgService.Error.emit(error.statusText);
      }
    });
  }

  changeUserRole(user) {
    const body = {
      id: user._id,
      admin: !(user.roles.length > 1)
    };

    this.userService.changeUserRoles(body).subscribe(resp => {
      this.fetchUsers();
      this.msgService.Success.emit('Successfully changed role');
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
