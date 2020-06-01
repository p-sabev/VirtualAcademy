import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { EmittersService } from 'src/app/_services/emitter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string;

  loggedIn: boolean;
  constructor(private authService: AuthService,
              private emitterService: EmittersService) {
    this.loggedIn = !!localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.subscribeForLogInOrOut();
  }

  subscribeForLogInOrOut() {
    console.log('SUBSCRIBED');
    this.emitterService.loggedIn.subscribe(() => {
      console.log('HERE');
      this.loggedIn = !!localStorage.getItem('token');
      this.username = localStorage.getItem('name');
    });
  }

  getUsername() {
    this.username = localStorage.getItem('name');
  }

  logOut() {
    this.authService.logout();
  }

}
