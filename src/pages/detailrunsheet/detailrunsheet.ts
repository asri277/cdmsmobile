import { Component } from '@angular/core';
import { NavController,AlertController,NavParams,Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { PostdataProvider } from '../../providers/postdata/postdata';
import { ConnectionProvider } from '../../providers/connection/connection';




@IonicPage({
	name: 'DetailRunsheetPage' 
		})
@Component({
  selector: 'page-detailrunsheet',
  templateUrl: 'detailrunsheet.html'
})
export class DetailRunsheetPage {

	reportdata:any;
	runsheet:any;
unregisterBackButtonAction:any;

  constructor(public navCtrl: NavController,
		  private atrCtrl: AlertController,
		  private auth: AuthService,
		  public post:PostdataProvider,
		  public conn:ConnectionProvider,
		  public navParams: NavParams,
		  public platform:Platform) {
	  	

	  	this.runsheet = {rs_no:"",ID:""};
	  	this.runsheet = this.navParams.get('detail');

  }
  
  ionViewDidLoad(){
	  

	  
  }
  
  ionViewDidEnter(){
	  this.searchCode();
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
  
  
  
  searchCode(){
	  this.post.detailrunsheet(this.runsheet.ID).then((data)=>{
		  if(data==false){
	  		  this.conn.presentAlert("Error","Cannot Fetch Data From Server");
	  	  }else{
		  this.reportdata = data;
		  if(this.reportdata.length==0){
			  this.conn.presentAlert("Attention","No Runsheet Found");
		  }
	  	  }
	  });
  }
  

 
}
