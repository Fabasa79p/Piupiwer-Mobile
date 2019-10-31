import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule, IonicPage } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../../src/pages/cadastro/cadastro';
import { RestProvider } from '../providers/rest/rest';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { CadastroServiceProvider } from '../providers/cadastro-service/cadastro-service';

import { IonicStorageModule } from '@ionic/storage';
import { FeedPage } from '../pages/feed/feed';
import { FeedServiceProvider } from '../providers/feed-service/feed-service';


@NgModule({
  declarations: [
    MyApp,
    CadastroPage,
    LoginPage,
    FeedPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(LoginPage),
    IonicStorageModule.forRoot({
      name: 'Piupiwer',
      storeName: 'token',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CadastroPage,
    FeedPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    LoginServiceProvider,
    CadastroServiceProvider,
    FeedServiceProvider
  ]
})
export class AppModule {}
