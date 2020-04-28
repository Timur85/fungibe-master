import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {DASHBOARD_ROUTES} from './dashboard-routes';
import {RepliesPipe} from './replies.pipe';
import {SpamDialogComponent} from './dialogs/spam-dialog/spam-dialog.component';
import {DeleteDialogComponent} from './dialogs/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    RepliesPipe,
    SpamDialogComponent,
    DeleteDialogComponent
  ],
  entryComponents: [
    SpamDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    RouterModule.forChild(DASHBOARD_ROUTES),
    SharedModule,
  ]
})
export class DashboardModule {
}
