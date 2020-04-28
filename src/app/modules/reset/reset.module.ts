import {NgModule} from '@angular/core';
import {ResetComponent} from './reset.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {RESET_ROUTES} from './reset-routes';

@NgModule({
  declarations: [
    ResetComponent
  ],
  imports: [
    RouterModule.forChild(RESET_ROUTES),
    SharedModule,
  ]
})
export class ResetModule {
}
