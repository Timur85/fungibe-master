import {Routes} from '@angular/router';
import {LoginGuard} from './core/guards/login.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module')
      .then(m => m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module')
      .then(m => m.RegisterModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'reset',
    loadChildren: () => import('./modules/reset/reset.module')
      .then(m => m.ResetModule),
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

