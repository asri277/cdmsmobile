import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthService } from 'services/auth-service/auth-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  //constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
  constructor(platform: Platform, public auth:AuthService, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      //this.database = new Database();

      setTimeout(() => {
        statusBar.styleDefault();
          splashScreen.hide();

              this.rootPage = 'LoginPage';


        }, 100);



    });
  }
}
