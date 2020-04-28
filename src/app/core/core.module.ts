import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {NgxPermissionsModule} from 'ngx-permissions';
import {environment} from '../../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    NgxPermissionsModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'angular8Coding'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only!');
    }
  }
}
