import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { TimeLogComponent } from './pages/time-log/time-log.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    pathMatch: 'full',
    children: [
      { path: '', component: HomeComponent },
      { path: 'time-log', component: TimeLogComponent },
    ],
  },
  {
    path: 'time-log',
    component: DashboardLayoutComponent,
    pathMatch: 'full',
    children: [{ path: '', component: TimeLogComponent }],
  },
];
