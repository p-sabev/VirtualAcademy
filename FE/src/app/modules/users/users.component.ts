import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/_services/user.service';
import { User } from './users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  constructor(private userService: UsersService) {
    console.log('In constructor');
   }

   users: User[];

  ngOnInit(): void {
    console.log('INIT');
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
    });
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe(resp => {
      console.log(resp);
      this.fetchUsers();
    }, error => {
      console.error(error);
    });
  }

  changeUserRole(user) {
    const body = {
      id: user._id,
      admin: !(user.roles.length > 1)
    };

    this.userService.changeUserRoles(body).subscribe(resp => {
      this.fetchUsers();
    }, error => {
      console.error(error);
    });
  }
}
