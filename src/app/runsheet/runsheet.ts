import { Component } from '@angular/core';
import { NavController,AlertController,Platform } from 'ionic-angular';
import { AuthService } from '../../services/auth-service/auth-service';
import { PostdataProvider } from '../../services/postdata/postdata';
import { ConnectionProvider } from '../../services/connection/connection';
import { FormBuilder, FormGroup } from '@angular/forms';


@IonicPage({
	name: 'RunsheetPage'
		})
@Component({
  selector: 'page-runsheet',
  templateUrl: 'runsheet.html'
})
export class RunsheetPage {

	form: FormGroup;
cnSearch:any;
	reportdata:any;
	isSearch:any;
unregisterBackButtonAction: any;

  constructor(public navCtrl: NavController,
		  private atrCtrl: AlertController,
		  private auth: AuthService,
		  public post:PostdataProvider,
		  public conn:ConnectionProvider,
		  public formBuilder: FormBuilder,
		  public platform:Platform) {



	  //03/08/2016
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
	  this.navCtrl.push("DetailRunsheetPage",{detail:data});
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
	  this.post.runsheet(this.cnSearch.date).then((data)=>{
		  if(data==false){
	  		  this.conn.presentAlert("Error","Cannot Fetch Data From Server");
	  	  }else{
		  this.reportdata = data;
		  if(this.reportdata.length==0){
			  this.conn.presentAlert("Attention","No Runsheet Found");
		  }else{
			  if(this.reportdata[0].rs_no==null){this.reportdata=[];
			  this.conn.presentAlert("Attention","No Runsheet Found");
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
