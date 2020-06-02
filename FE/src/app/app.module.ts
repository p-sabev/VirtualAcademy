import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HeaderComponent } from './ui/header/header.component';
import { UsersComponent } from './modules/users/users.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { AuthService } from './_services/auth.service';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_interceptors/auth-interceptor.service';
import { HomeComponent } from './home/home.component';

import { SharedModule } from './shared/shared.module';
import { EmittersService } from './_services/emitter.service';
import {AuthGuard} from "./_guards/auth.guard";
import {MyProfileComponent} from "./modules/my-profile/my-profile.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    UsersComponent,
    CoursesComponent,
    HomeComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    EmittersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
