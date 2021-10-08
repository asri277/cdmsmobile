import { Component } from '@angular/core';
import { NavController,App,Platform } from '@ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { PostdataProvider } from '../../services/postdata/postdata';
import { ConnectionProvider } from '../../services/connection/connection';





@IonicPage({
	name: 'TrackPage'
		})
@Component({
  selector: 'page-track',
  templateUrl: 'track.html'
})
export class TrackPage {

	form: FormGroup;
  cnSearch:any;
	reportdata:any;
	isSearch:any;
unregisterBackButtonAction:any;

  constructor(public nav: NavController,
		  public formBuilder: FormBuilder,
		  private auth: AuthService,
		  private app: App,
		  private barcodeScanner: BarcodeScanner,
		  public post:PostdataProvider,
		  public conn:ConnectionProvider,
		  public platform:Platform) {
	  //201700170699
	  this.cnSearch = {cnNumber:""};
	  this.isSearch = false;

	  this.form = formBuilder.group({
		  cnNumber:this.cnSearch.cnNumber
	  });

	 /*this.reportdata = [
		  {dates:"02/01/2018 13:00",process:"Preparing For Delivery",office:"Courier Pasir Gudang"},
		  {dates:"02/01/2018 16:00",process:"Attempt Delivery",office:"Courier Pasir Gudang"},
		  {dates:"02/01/2018 18:00",process:"Arrive At Desitination Branch",office:"Courier Pasir Gudang"},
		  {dates:"02/01/2018 23:00",process:"Delivery Successful",office:"Courier Pasir Gudang"}
		  ];*/
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
    	  this.nav.parent.select(0);
      }, 2);
  }

  scanBarcode(){
		 this.barcodeScanner.scan().then(barcodeData => {
			 console.log('Barcode data', barcodeData);
			 this.cnSearch.cnNumber=barcodeData.text;
			 this.search();
			}).catch(err => {
			    console.log('Error', err);
			});
	 }


  search(){
	  if(this.cnSearch.cnNumber==""){
		  this.conn.presentAlert("Attention","Please enter/scan CN Number");
	  }else{
		  this.searchCode();
	  }

  }

  searchCode(){
	  this.isSearch = true;
	  this.post.trackCN(this.cnSearch.cnNumber).then((data)=>{
		  if(data==false){
	  		  this.conn.presentAlert("Error","Cannot Fetch Data From Server");
	  	  }else{
		  this.reportdata = data;
		  if(this.reportdata.length==0){
			  this.conn.presentAlert("Attention","No CN History Found");
		  }else{
			  if(this.reportdata[0].dates==null){
				  this.reportdata=[];
				  this.conn.presentAlert("Attention","No CN History Found");
			  }
		  }
	  	  }
	  });
  }

  reset(){
	  this.cnSearch.cnNumber="";
	  this.isSearch = false;
  }


}
