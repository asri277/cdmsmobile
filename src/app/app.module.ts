import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {Camera} from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


import { AuthService } from 'services/auth-service/auth-service';
import { Database } from 'services/database/database';
import { ConnectionProvider } from 'services/connection/connection';
import { PostdataProvider } from 'services/postdata/postdata';


@NgModule({
  declarations: [
    MyApp
    ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    BarcodeScanner,
    Camera,
    InAppBrowser,
    FileTransfer,
    FileTransferObject,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    Database,
    ConnectionProvider,
    PostdataProvider
  ]
})
export class AppModule {}
