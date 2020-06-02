import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { EmittersService } from 'src/app/_services/emitter.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  emailPattern = new RegExp('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}');
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    surname: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    age: new FormControl('', [Validators.required]),
    password:  new FormControl('', [Validators.required]),
    confirmPassword:  new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService,
              private router: Router,
              private emitterService: EmittersService) { }

  ngOnInit(): void {
    this.emitterService.loggedIn.emit(true);
  }

  registerUser() {
    const body = {...this.registerForm.getRawValue()};
    delete body.confirmPassword;
    console.log(body);
    this.authService.signIn(body).subscribe(resp => {
      console.log(resp);
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
