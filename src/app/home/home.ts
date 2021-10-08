import { Component } from '@angular/core';
import { NavController,AlertController,Platform } from 'ionic-angular';


@IonicPage({
	name: 'HomePage' 
		})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	  unregisterBackButtonAction:any;


  constructor(public navCtrl: NavController,
		  private atrCtrl: AlertController,
		  public platform:Platform) {

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
      	  this.platform.exitApp();
        }, 2); 
    }     
    
  
  public showReport(){
	  
	  this.navCtrl.parent.select(2);
	  
  }
  
  public updateCNStatus(){
	  this.navCtrl.parent.select(1);
  }
  
  public myaccount(){
	  this.navCtrl.parent.select(3);
  }
  
  public trackcn(){
	  this.navCtrl.push("TrackPage");
  }
  
  
 
}
