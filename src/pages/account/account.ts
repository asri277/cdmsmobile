import { Component } from '@angular/core';
import { NavController,App,Platform } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';
import { PostdataProvider } from '../../providers/postdata/postdata';
import { ConnectionProvider } from '../../providers/connection/connection';




@IonicPage({
	name: 'AccountPage' 
		})
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

	form: FormGroup;
  account:any;
unregisterBackButtonAction:any;

  constructor(public nav: NavController,
		  public formBuilder: FormBuilder,
		  private auth: AuthService,
		  private app: App,
		  public post:PostdataProvider,
		  public conn:ConnectionProvider,
		  public platform:Platform,
		  ) {
	  
	  this.account = {username:"",fullname:"",costcentre:"",costcentreid:"0"};
	  
	  this.form = formBuilder.group({
		  username:this.account.username,
		  fullname : this.account.fullname,
		  costcentre:this.account.costcentre
	  });
  }
  
  ionViewDidLoad(){
	  this.post.getAccount().then((data)=>{
		  	  if(data==false){
		  		  this.conn.presentAlert("Error","Cannot Fetch Data From Server");
		  	  }else{
			  this.account = {username:data[0].UID,fullname:data[0].fullname,costcentre:data[0].costcentre,costcentreid:data[0].costcentreid};
		  	  }
	  });

  }
  
  ionViewDidEnter(){
	  this.initializeBackButtonCustomHandler();
  }
  
  
  ionViewDidLeave() {
	    this.unregisterBackButtonAction && this.unregisterBackButtonAction();

	}

  
  initializeBackButtonCustomHandler() {
      this.unregisterBackButtonAction = this.platform.registerBackButtonAction(()=>{
    	  this.nav.parent.select(0);
      }, 2); 
  }     
  
  public logout() {
	    this.auth.logout().then((succ) => {
	    	this.app.getRootNav().setRoot('LoginPage')
	    });
	  }
  
 
}
