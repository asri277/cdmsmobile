import { Component } from '@angular/core';
import { NavController,NavParams,Platform } from 'ionic-angular';





@IonicPage({
	name: 'SignaturePage' 
		})
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html'
})
export class SignaturePage { 
	
  cnObject:any;
unregisterBackButtonAction:any;

  constructor(public navCtrl: NavController,public navParams: NavParams,
		  public platform:Platform) {
	  this.cnObject = this.navParams.get('cnObject');
	  //alert(this.cnObject.selectStatus);
  }
  
  ionViewDidLoad(){
	 
  }
  
  ionViewDidEnter(){
	  this.initializeBackButtonCustomHandler();
  }
  
  
  ionViewDidLeave() {
	    this.unregisterBackButtonAction && this.unregisterBackButtonAction();

	}
  
  initializeBackButtonCustomHandler() {
      this.unregisterBackButtonAction = this.platform.registerBackButtonAction(()=>{
    	  this.navCtrl.pop();
      }, 2); 
  }     
  
 
  
 

}
