import { Component,ViewChild } from '@angular/core';
import { NavController,NavParams,Tabs,AlertController,Platform} from 'ionic-angular';



import { AuthService } from '../../services/auth-service/auth-service';


@IonicPage({
name: 'TabsPage'
	})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = "HomePage";
  tab2Root = "AboutPage";
  tab4Root = "AccountPage";
  tab3Root = "ReportPage";

  public navCtl:any;
  cnObject:any;
  tabIndex:any;

  @ViewChild('myTabs') tabRef: Tabs;

  constructor(private auth: AuthService,public nav: NavController,
		  public navParams: NavParams,
		  private atrCtrl: AlertController,
		  public platform:Platform) {

	  this.navCtl = this.nav;
	  this.cnObject = this.navParams.get('cnObject');
	  this.tabIndex = this.navParams.get('tabIndex');

  }

  ngAfterViewInit() {
	  if(this.tabIndex=="1"){
		  this.tabRef.select(this.tabIndex);
	  }
  }

public showReport(){

	  let alert = this.atrCtrl.create();
	    alert.setTitle('Select Report');

	    alert.addInput({
	      type: 'radio',
	      label: 'Manifest',
	      value: 'Manifest',
	      checked: true
	    });
	     alert.addInput({
	      type: 'radio',
	      label: 'Runsheet',
	      value: 'Runsheet',
	      checked: false
	    });

	    alert.addButton('Cancel');
	    alert.addButton({
	      text: 'OK',
	      handler: data => {
	    	  	if(data=='Manifest'){
	    	  		 this.nav.push("ManifestPage");
	    	  	}else if(data=='Runsheet'){
	    	  		this.nav.push("RunsheetPage");
	    	  	}
	      }
	    });
	    alert.present();

  }

  public logout() {
    this.auth.logout().then((succ) => {
      this.nav.setRoot('LoginPage')
    });
  }

}
