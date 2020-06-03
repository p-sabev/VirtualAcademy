import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { EmittersService } from 'src/app/_services/emitter.service';
import {NotificationsEmitterService} from "../../_services/notifications.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password:  new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService,
              private router: Router,
              private msgService: NotificationsEmitterService,
              private emitterService: EmittersService) { }

  ngOnInit(): void {
  }

  logIn() {
    const body = {...this.loginForm.getRawValue()};
    this.authService.login(body).subscribe(resp => {
      if (resp.token) {
        localStorage.setItem('token', resp.token);
      }
      if (resp.user) {
        this.saveUserValues(resp.user);
      }
      this.router.navigate(['../home']);
      this.emitterService.loggedIn.emit(true);
    }, error => {
      console.error(error);
      if (error.error && typeof error.error === 'string') {
        this.msgService.Error.emit(error.error);
      } else if (error.statusText && typeof error.statusText === 'string') {
        this.msgService.Error.emit(error.statusText);
      }
    });
  }

  saveUserValues(user) {
    const permissions = {};
    localStorage.setItem('name', user.name);
    localStorage.setItem('id', user._id);
    localStorage.setItem('roles', user.roles);
    user.roles.forEach(role => {
      permissions[role] = true;
    });
    localStorage.setItem('permissionsFlat', JSON.stringify(permissions));
  }

}
