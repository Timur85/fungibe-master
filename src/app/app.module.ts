import {BrowserModule} from '@angular/platform-browser';
import {ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from './app-routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPermissionsService} from 'ngx-permissions';
import {AuthService} from './core/services/auth.service';
import {first} from 'rxjs/operators';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES),
  ],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule implements DoBootstrap {

  constructor(
    private _auth: AuthService,
    private _permissions: NgxPermissionsService) {
  }

  async ngDoBootstrap(appRef: ApplicationRef): Promise<void> {
    await this._auth.getCurrentUser().pipe(first()).toPromise();
    appRef.bootstrap(AppComponent);
  }

}
