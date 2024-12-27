import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Route, RouterModule, Routes, provideRouter } from '@angular/router';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { UserListComponent } from './app/components/user-list/user-list.component';
import { AuthGuard } from './app/guards/auth.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <router-outlet></router-outlet>
  `
})
export class App {}

const routes:Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
});