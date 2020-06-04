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
import {LoaderComponent} from "./ui/loader/loader.component";
import {LoaderInterceptorService} from "./_interceptors/loader-interceptor.service";

import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsEmitterService } from './_services/notifications.service';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AddCourseComponent} from "./modules/courses/add-course/add-course.component";

@NgModule({
  declarations: [
    LoaderComponent,
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    UsersComponent,
    CoursesComponent,
    HomeComponent,
    MyProfileComponent,
    AddCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AuthService,
    NotificationsEmitterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    EmittersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
