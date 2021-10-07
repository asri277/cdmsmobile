import { Component } from '@angular/core';
import { NavController,AlertController,Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { PostdataProvider } from '../../providers/postdata/postdata';
import { ConnectionProvider } from '../../providers/connection/connection';
import { FormBuilder, FormGroup } from '@angular/forms';


@IonicPage({
	name: 'ManifestPage' 
		})
@Component({
  selector: 'page-manifest',
  templateUrl: 'manifest.html'
})
export class ManifestPage {

	form: FormGroup;
cnSearch:any;
	reportdata:any;
	isSearch:any;
unregisterBackButtonAction:any;

  constructor(public navCtrl: NavController,
		  private atrCtrl: AlertController,
		  private auth: AuthService,
		  public post:PostdataProvider,
		  public conn:ConnectionProvider,
		  public formBuilder: FormBuilder,
		  public platform:Platform) {
	  

	  
	  //06/05/2016
	  this.cnSearch = {date:""};
	  this.isSearch = false;
	  
	  this.form = formBuilder.group({
		  date:this.cnSearch.date
	  });

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
  
  detail(data:any){
	  this.navCtrl.push("DetailManifestPage",{detail:data});
  }
  
  search(){
	  if(this.cnSearch.date==""){
		  this.conn.presentAlert("Attention","Please enter date");
	  }else{
		  this.searchCode();
	  }
	  
  }
  
  searchCode(){
	  this.isSearch = true;
	  this.post.manifest(this.cnSearch.date).then((data)=>{
		  if(data==false){
	  		  this.conn.presentAlert("Error","Cannot Fetch Data From Server");
	  	  }else{
		  this.reportdata = data;
		  if(this.reportdata.length==0){
			  this.conn.presentAlert("Attention","No Manifest Found");
		  }else{
			  if(this.reportdata[0].manifest_no==null){this.reportdata=[];
			  this.conn.presentAlert("Attention","No Manifest Found");
			  }
		  }
	  	  }
	  });
  }
  
  reset(){
	  this.cnSearch.date="";
	  this.isSearch = false;
  }
  
 
}
