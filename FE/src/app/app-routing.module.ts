import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './modules/users/users.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import {AuthGuard} from "./_guards/auth.guard";
import {MyProfileComponent} from "./modules/my-profile/my-profile.component";
import {AddCourseComponent} from "./modules/courses/add-course/add-course.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'my-profile',
    component: MyProfileComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    data: { permission: 'ViewUsers' },
    canActivate: [AuthGuard]
  },
  {
    path: 'courses',
    component: CoursesComponent,
    data: { permission: 'ViewCourses' },
    canActivate: [AuthGuard]
  },
  {
    path: 'courses/add',
    component: AddCourseComponent,
    data: { permission: 'EditCourses' },
    canActivate: [AuthGuard]
  },
  {
    path: 'log-in',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
