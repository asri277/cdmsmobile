import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage,App } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ConnectionProvider } from '../../providers/connection/connection';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';



@IonicPage({
name: 'LoginPage' 
	})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	
	  unregisterBackButtonAction:any;

  loading: Loading;
  registerCredentials = { email: '', password: '' };
  //registerCredentials = { email: '', password: '' };

  isOnline : boolean = false;
  selectedProject:any;
  selectedProjectKPA:any;

  constructor(public platform: Platform,public nav: NavController, public auth: AuthService, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
		  public conn:ConnectionProvider,public http: Http,
		  private app: App
		  ) { 
	  
	 // this.platform.ready().then(() => {
	  this.conn.checkNetwork();
	  	//this.db = new Database();
	
	  //});
  }
  
  ionViewDidLoad() {
	  //this.getUserAccount();
		  //this.isOnline = this.conn.isOnline();	
	  		if(this.auth.getUsername()!=''){
	  			this.nav.setRoot('TabsPage');
	  		}
  }
  
  ionViewDidEnter(){
	  this.initializeBackButtonCustomHandler();
  }
  
  ionViewDidLeave() {
	    this.unregisterBackButtonAction && this.unregisterBackButtonAction();

	}

    
    initializeBackButtonCustomHandler() {
        this.unregisterBackButtonAction = this.platform.registerBackButtonAction(()=>{
      	  this.platform.exitApp();
        }, 2); 
    }     
 
  public createAccount() {
    this.nav.push('RegisterPage');
  }
  
  public getUserAccount(){
	  
  }
 
  public login() {
    //this.showLoading()
    //alert(this.registerCredentials.email);
    this.auth.login(this.registerCredentials).then((allowed) => {
      if (allowed) {  
    	  //this.loading.dismiss();
        this.nav.setRoot('TabsPage');
      } else {
        //this.showError("Wrong Username Or Password.");
        this.logout();
      }
    },
      error => {
        this.showError("Wrong Username Or Password.");
        this.logout();
      });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    //this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  
  
  
  presentAlert() {
	  let alert = this.alertCtrl.create({
	    title: 'Error',
	    subTitle: 'Wrong Username / Password !, Please make sure you enter the correct account',
	    buttons: ['Close']
	  });
	  alert.present();
	}
  
  
  public logout() {
	    this.auth.logout().then((succ) => {
	    	this.app.getRootNav().setRoot('LoginPage')
	    });
	  }
  
  
  

	
  
}