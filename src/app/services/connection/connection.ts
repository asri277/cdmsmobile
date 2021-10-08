import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';


import 'rxjs/add/operator/map';


/*
  Generated class for the ConnectionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
declare var navigator: any;
//declare var Connection: any;

@Injectable({
  providedIn: 'root',
})
export class ConnectionProvider {

	onDevice: boolean;
	//serverURL: string = 'http://192.168.43.148/rpinsys/public/mobile/mobile/mobilectl';
	//serverURL: string = 'http://192.168.0.106/rpinsys/public/mobile/mobile/mobilectl';
	//serverURL: string = 'http://test.rpsbmal.com/mobile/mobile/mobilectl';
	//serverURL: string = 'http://localhost:8080/cdms/';
	//serverURL: string = 'http://192.168.0.199:8080/cdms/';
	serverURL: string = 'http://ftssb.felda.net.my:8080/cdms/';



	connection:any;
	isOnlineServer:boolean=true;
	isCheckOnline:boolean=false;
	firstLoad:any;

  constructor(public platform: Platform,
		  public toastCtrl: ToastController,
		  private alertCtrl: AlertController,
		  private loadingCtrl: LoadingController,
		  public http: Http) {
    console.log('Hello ConnectionProvider Provider');

   // platform.ready().then(() => {
    //this.onDevice = this.platform.is('cordova');
    //});
    //alert(this.platform.platforms());

    this.connection = {
    		UNKNOWN:'unkown',
    		ETHERNET:'ethernet',
    		WIFI:'wifi',
    		CELL_2G:'2g',
    		CELL_3G:'3g',
    		CELL_4G:'4g',
    		NONE:'none',
    		CELL:'cellular'
    };

    this.firstLoad=[];
  }

  isOnDevice():boolean{
	  return false;
  }

  getServerURL():string{
	  return this.serverURL;
  }

  checkNetwork():any {

	  	  if(this.isOnDevice()){
          var networkState = navigator.connection.type;
          var states = {};
          states[this.connection.UNKNOWN]  = 'Unidentified';
          states[this.connection.ETHERNET] = 'Ethernet';
          states[this.connection.WIFI]     = 'WiFi';
          states[this.connection.CELL_2G]  = '2G';
          states[this.connection.CELL_3G]  = '3G';
          states[this.connection.CELL_4G]  = '4G';
          states[this.connection.CELL]     = 'Cell';
          states[this.connection.NONE]     = 'Unknown Network';

          if(networkState==this.connection.NONE || networkState==this.connection.UNKNOWN
        		  || networkState==this.connection.CELL ){
         /* let alert = this.alertCtrl.create({
              title: "Masalah Internet",
              subTitle: 'Tiada talian internet, Sila pastikan anda mempunyai talian internet',
              buttons: ["OK"]
          });
          this.nav.present(alert);*/

        	  //this.presentToast('Tiada Talian Internet : '+states[networkState],'toast-red');
        	    this.isOnlineServer = false;
          		return false;
  			}else{


  				//this.presentToast('Internet OK : '+states[networkState],'toast-black');
  				if(!this.isCheckOnline){
  					this.isCheckOnline = true;
  				this.checkRemoteServer().then((checkStatus)=>{
  					let rtn = <boolean>checkStatus;
  					if(rtn){
  						this.isOnlineServer = true;
  		  				//this.presentToast('Internet OK : '+states[networkState]+', dan ada talian ke server','toast-black');
  					}else{
  						this.isOnlineServer = false;
  		  				//this.presentToast('Internet OK : '+states[networkState]+', tetapi TIADA TALIAN ke server','toast-red');
  					}
  					return rtn;
  				});
  				}else{
  					if(this.isOnlineServer){
  		  				//this.presentToast('Internet OK : '+states[networkState]+', dan ada talian ke server','toast-black');
  					}else{
  		  				//this.presentToast('Internet OK : '+states[networkState]+', tetapi TIADA TALIAN ke server','toast-red');
  					}
  					return this.isOnlineServer;
  				}


  			}

	  	  }else{
	  		//this.presentToast('Internet OK','toast-black');
	  		this.isOnlineServer = true;
	  		  return true;
	  	  }

  }

  public checkBack(){
	  return new Promise((resolve, reject) => {
	  this.isCheckOnline = true;
	  		this.checkRemoteServer().then((res)=>{
	  			this.isOnlineServer = <boolean>res;
	  			resolve(this.isOnlineServer);
	  		});
	  });
  }

  public isOnline(){

	  return this.isOnlineServer;
  }

  public checkRemoteServer(){

	  return new Promise((resolve, reject) => {

		  let url = this.getServerURL()+'/status';
		  let data = {params:{test:'1'}};

	  this.http.get(url,data).map(res => res.json())
	  .subscribe(
			  data => {
				  resolve(true);
			  },
			    err => {
			        resolve(false);
			    }

			  );

	  });
  }

  public presentToast(msg:any,css:any){
	  if(css=='toast-black'){
	  const toast = this.toastCtrl.create({
	      message: msg,
	      showCloseButton: true,
	      closeButtonText: 'Ok',
	      cssClass:css,
	      duration: 5000,
	    });
	    toast.present();
	  }else{
		  const toast = this.toastCtrl.create({
		      message: msg,
		      showCloseButton: true,
		      closeButtonText: 'Ok',
		      cssClass:css,
		      duration: 5000,
		    });
		    toast.present();
	  }
  }

  presentAlert(title:any,msg:any) {
	  let alert = this.alertCtrl.create({
	    title: title,
	    subTitle: msg,
	    buttons: ['OK']
	  });
	  alert.present();
	}

  pleaseWait(){

  let loading = this.loadingCtrl.create({content : "Please wait...",
	  dismissOnPageChange:true});

	  loading.present();
	  setTimeout(() => {
	    loading.dismiss();
	  }, 5000);

  }

  shortWait(page:any){

	 let index = this.firstLoad.indexOf(page);
	  //alert(index+":"+page);
	 if(index<0){

		 this.firstLoad.push(page);

	  let loading = this.loadingCtrl.create({content : "Please wait...",
		  dismissOnPageChange:true});

		  loading.present();
		  setTimeout(() => {
		    loading.dismiss();
		  }, 1000);
	 }


	  }


}
