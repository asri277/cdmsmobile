import { Injectable } from '@angular/core';
import { Http,URLSearchParams } from '@angular/http';
import { LoadingController,AlertController } from '@ionic-angular';
import {Database} from "../database/database";
import { ConnectionProvider } from '../connection/connection';
import { AuthService } from '../auth-service/auth-service';


import 'rxjs/add/operator/map';


/*
  Generated class for the ConnectionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
//declare var navigator: any;
//declare var Connection: any;

@Injectable({
  providedIn: 'root',
})
export class PostdataProvider {

	account:any;
	isLoading:boolean = true;


  constructor(
		  public conn:ConnectionProvider,
		  public db:Database,
		  public loadingCtrl: LoadingController,
		  public alertCtrl: AlertController,
		  public auth: AuthService,
		  public http: Http)
		  {
  }



  public getAccount(){
	  return new Promise((resolve, reject) => {

		  let url = this.conn.getServerURL()+'json.jsp';
		  let loading:any;
		   if(this.isLoading){
		    loading = this.loadingCtrl.create({content : "Please wait...",
				  dismissOnPageChange:true});
		    loading.present();
		   }


		   let params = new URLSearchParams();
		   params.set('cmd', '3');
		   params.set('uid', this.auth.getUsername());


		   this.http.post(url,params
				   ).map(res => res.json())
			  .subscribe(
					  data => {

						  //let str = JSON.stringify(data);
						  //alert('from server:'+str);

						   	   if(this.isLoading)
							  loading.dismissAll();

							  resolve(data);

				      }, (error) => {
					   	   if(this.isLoading)
						  loading.dismissAll();
						  	resolve(false);
						  	console.log("ERROR: "+error);
				      });


			    }

			  );


  }


 public trackCN(cnNumber:any){
	  return new Promise((resolve, reject) => {

		  let url = this.conn.getServerURL()+'json.jsp';
		  let loading:any;
		   if(this.isLoading){
		  loading = this.loadingCtrl.create({content : "Please wait...",
			  dismissOnPageChange:true});
		    loading.present();
		   }


		   let params = new URLSearchParams();
		   params.set('cmd', '4');
		   params.set('cnNumber', cnNumber);


		   this.http.post(url,params
				   ).map(res => res.json())
			  .subscribe(
					  data => {

						  //let str = JSON.stringify(data);
						  //alert('from server:'+str);

						   	   if(this.isLoading)
							  loading.dismissAll();

							  resolve(data);

				      }, (error) => {
					   	   if(this.isLoading)
						  loading.dismissAll();
						  	resolve(false);
				          console.log("ERROR: "+error);
				      });


			    }

			  );


  }

 public checkCN(cnNumber:any):any{

	  return new Promise((resolve, reject) => {

		  let url = this.conn.getServerURL()+'json.jsp';
		  let loading:any;
		   if(this.isLoading){
		    loading = this.loadingCtrl.create({content : "Please wait...",
				  dismissOnPageChange:true});
		    loading.present();
		   }


		   let params = new URLSearchParams();
		   params.set('cmd', '5');
		   params.set('uid', this.auth.getUsername());
		   params.set('cnNumber', cnNumber);


		   this.http.post(url,params
				   ).map(res => res.json())
			  .subscribe(
					  data => {

						  //let str = JSON.stringify(data);
						  //alert('from server:'+str);

						   	   if(this.isLoading)
							  loading.dismissAll();
							  //let resp = {runsheet:data.runsheet,status:data.status};
							  resolve(data);

				      }, (error) => {
					   	   if(this.isLoading)
						  loading.dismissAll();
						  	resolve(false);
						  	console.log("ERROR: "+error);
				      });


			    }

			  );


 }


 public updateAttempt(cnNumber:any,status:any){

	  return new Promise((resolve, reject) => {

		  let url = this.conn.getServerURL()+'json.jsp';
		  let loading:any;
		   if(this.isLoading){
		    loading = this.loadingCtrl.create({content : "Please wait...",
				  dismissOnPageChange:true});
		    loading.present();
		   }


		   let params = new URLSearchParams();
		   params.set('cmd', '6');
		   params.set('uid', this.auth.getUsername());
		   params.set('cnNumber', cnNumber);
		   params.set('status', status);


		   this.http.post(url,params
				   ).map(res => res.json())
			  .subscribe(
					  data => {

						  //let str = JSON.stringify(data);
						  //alert('from server:'+str);

						   	   if(this.isLoading)
							  loading.dismissAll();

							  resolve(data);

				      }, (error) => {
					   	   if(this.isLoading)
						  loading.dismissAll();
						  	resolve(false);
						  	console.log("ERROR: "+error);
				      });


			    }

			  );


}

 public manifest(date:any){
	  return new Promise((resolve, reject) => {

		  let url = this.conn.getServerURL()+'json.jsp';
		  let loading:any;
		   if(this.isLoading){
		  loading = this.loadingCtrl.create({content : "Please wait...",
			  dismissOnPageChange:true});
		    loading.present();
		   }


		   let params = new URLSearchParams();
		   params.set('cmd', '7');
		   params.set('date', date);
		   params.set('uid', this.auth.getUsername());


		   this.http.post(url,params
				   ).map(res => res.json())
			  .subscribe(
					  data => {

						  //let str = JSON.stringify(data);
						  //alert('from server:'+str);

						   	   if(this.isLoading)
							  loading.dismissAll();

							  resolve(data);

				      }, (error) => {
					   	   if(this.isLoading)
						  loading.dismissAll();
						  	resolve(false);
				          console.log("ERROR: "+error);
				      });


			    }

			  );


 }

 public detailmanifest(manifestid:any){
	  return new Promise((resolve, reject) => {

		  let url = this.conn.getServerURL()+'json.jsp';
		  let loading:any;
		   if(this.isLoading){
		  loading = this.loadingCtrl.create({content : "Please wait...",
			  dismissOnPageChange:true});
		    loading.present();
		   }


		   let params = new URLSearchParams();
		   params.set('cmd', '8');
		   params.set('manifestid', manifestid);


		   this.http.post(url,params
				   ).map(res => res.json())
			  .subscribe(
					  data => {

						  //let str = JSON.stringify(data);
						  //alert('from server:'+str);

						   	   if(this.isLoading)
							  loading.dismissAll();

							  resolve(data);

				      }, (error) => {
					   	   if(this.isLoading)
						  loading.dismissAll();
						  	resolve(false);
				          console.log("ERROR: "+error);
				      });


			    }

			  );


}

 public runsheet(date:any){
	  return new Promise((resolve, reject) => {

		  let url = this.conn.getServerURL()+'json.jsp';
		  let loading:any;
		   if(this.isLoading){
		  loading = this.loadingCtrl.create({content : "Please wait...",
			  dismissOnPageChange:true});
		    loading.present();
		   }


		   let params = new URLSearchParams();
		   params.set('cmd', '9');
		   params.set('date', date);
		   params.set('uid', this.auth.getUsername());


		   this.http.post(url,params
				   ).map(res => res.json())
			  .subscribe(
					  data => {

						  //let str = JSON.stringify(data);
						  //alert('from server:'+str);

						   	   if(this.isLoading)
							  loading.dismissAll();

							  resolve(data);

				      }, (error) => {
					   	   if(this.isLoading)
						  loading.dismissAll();
						  	resolve(false);
				          console.log("ERROR: "+error);
				      });


			    }

			  );


}

public detailrunsheet(runsheetid:any){
	  return new Promise((resolve, reject) => {

		  let url = this.conn.getServerURL()+'json.jsp';
		  let loading:any;
		   if(this.isLoading){
		  loading = this.loadingCtrl.create({content : "Please wait...",
			  dismissOnPageChange:true});
		    loading.present();
		   }


		   let params = new URLSearchParams();
		   params.set('cmd', '10');
		   params.set('runsheetid', runsheetid);


		   this.http.post(url,params
				   ).map(res => res.json())
			  .subscribe(
					  data => {

						  //let str = JSON.stringify(data);
						  //alert('from server:'+str);

						   	   if(this.isLoading)
							  loading.dismissAll();

							  resolve(data);

				      }, (error) => {
					   	   if(this.isLoading)
						  loading.dismissAll();
						  	resolve(false);
				          console.log("ERROR: "+error);
				      });


			    }

			  );


}


public updateSuccess(cnNumber:any,status:any,name:any,nric:any,signature:any){

	  return new Promise((resolve, reject) => {

		  let url = this.conn.getServerURL()+'json.jsp';
		  let loading:any;
		   if(this.isLoading){
		    loading = this.loadingCtrl.create({content : "Please wait...",
				  dismissOnPageChange:true});
		    loading.present();
		   }


		   let params = new URLSearchParams();
		   params.set('cmd', '11');
		   params.set('uid', this.auth.getUsername());
		   params.set('cnNumber', cnNumber);
		   params.set('status', status);
		   params.set('name', name);
		   params.set('nric', nric);
		   params.set('signature', encodeURIComponent(signature));


		   this.http.post(url,params
				   ).map(res => res.json())
			  .subscribe(
					  data => {

						  //let str = JSON.stringify(data);
						  //alert('from server:'+str);

						   	   if(this.isLoading)
							  loading.dismissAll();

							  resolve(data);

				      }, (error) => {
					   	   if(this.isLoading)
						  loading.dismissAll();
						  	resolve(false);
						  	console.log("ERROR: "+error);
				      });


			    }

			  );


}


public updateFail(cnNumber:any,status:any,reason:any,lat:any,lon:any){

	  return new Promise((resolve, reject) => {

		  let url = this.conn.getServerURL()+'json.jsp';
		  let loading:any;
		   if(this.isLoading){
		    loading = this.loadingCtrl.create({content : "Please wait...",
				  dismissOnPageChange:true});
		    loading.present();
		   }


		   let params = new URLSearchParams();
		   params.set('cmd', '12');
		   params.set('uid', this.auth.getUsername());
		   params.set('cnNumber', cnNumber);
		   params.set('status', status);
		   params.set('reason', reason);
		   params.set('lat', lat);
		   params.set('lon', lon);


		   this.http.post(url,params
				   ).map(res => res.json())
			  .subscribe(
					  data => {

						  //let str = JSON.stringify(data);
						  //alert('from server:'+str);

						   	   if(this.isLoading)
							  loading.dismissAll();

							  resolve(data);

				      }, (error) => {
					   	   if(this.isLoading)
						  loading.dismissAll();
						  	resolve(false);
						  	console.log("ERROR: "+error);
				      });


			    }

			  );


}

public reasons(){
	  return new Promise((resolve, reject) => {

		  let url = this.conn.getServerURL()+'json.jsp';
		  let loading:any;
		   if(this.isLoading){
		  loading = this.loadingCtrl.create({content : "Please wait...",
			  dismissOnPageChange:true});
		    loading.present();
		   }


		   let params = new URLSearchParams();
		   params.set('cmd', '13');


		   this.http.post(url,params
				   ).map(res => res.json())
			  .subscribe(
					  data => {

						  //let str = JSON.stringify(data);
						  //alert('from server:'+str);

						   	   if(this.isLoading)
							  loading.dismissAll();

							  resolve(data);

				      }, (error) => {
					   	   if(this.isLoading)
						  loading.dismissAll();
						  	resolve(false);
				          console.log("ERROR: "+error);
				      });


			    }

			  );


 }






}
