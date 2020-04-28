import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {RouterModule} from '@angular/router';
import {LOGIN_ROUTES} from './login-routes';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild(LOGIN_ROUTES),
    SharedModule,
  ]
})
export class LoginModule {
}
