import {NgModule} from '@angular/core';
import {RegisterComponent} from './register.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {REGISTER_ROUTES} from './register-routes';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(REGISTER_ROUTES),
    SharedModule,
  ]
})
export class RegisterModule {
}
