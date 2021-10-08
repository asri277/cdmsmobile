import { Component } from '@angular/core';
import { NavController,AlertController,Platform } from '@ionic-angular';


@IonicPage({
	name: 'ReportPage'
		})
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {

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
    	  this.navCtrl.parent.select(0);
      }, 2);
  }

  manifest(){
		 this.navCtrl.push("ManifestPage");
  }

  runsheet(){
		this.navCtrl.push("RunsheetPage");
  }


}
