import { Component,ViewChild, ElementRef  } from '@angular/core';
import { NavController,App,NavParams,LoadingController, Loading,AlertController,Platform } from '@ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ConnectionProvider } from '../services/connection/connection';
import { PostdataProvider } from '../services/postdata/postdata';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

declare var google;

@IonicPage({
	name: 'AboutPage'
		})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

	@ViewChild('map') mapElement: ElementRef;
	  map: any;
	loading: Loading;
	katL:any;
	form: FormGroup;
isMain:any;
isSuccess:any;
isSignature:any;
isFail:any;
cnObject:any;
paramCnObject:any;
isCheck:any;
isValid:any;
	unregisterBackButtonAction:any;
	isPhoto:any;
	alert:any;
	allreason:any;

  constructor(public navCtrl: NavController,
		  public formBuilder: FormBuilder,
		  private app: App,
		  public navParams: NavParams,
		  public geolocation: Geolocation,
		  public loadingCtrl: LoadingController,
		  private barcodeScanner: BarcodeScanner,
		  private camera: Camera,
		  private alertCtrl: AlertController,
		  public conn:ConnectionProvider,
		  public post:PostdataProvider,
		  private transfer: FileTransfer,
		  public platform:Platform) {

	  this.katL = [
		  {id:3,desc:"Attempt delivery"},
		  {id:5,desc:"Delivery successful"},
		  {id:4,desc:"Delivery unsuccessful"}
	  ];

	  this.allreason = [
	  	{pofr_id:1,pofr_desc:""}
	  ];

	  //let dummyimage = "data:image/png;base64,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";

	  this.cnObject = {cnNumber:"",selectStatus:"",receivername:"",nric:"",signature:"",
			  reason:"",photo:"assets/images/signature.png",lat:"",lon:"",photofail:"assets/images/image.png",
			  photoquality:"100"};

	  //this.cnObject.photo = dummyimage;

	  this.paramCnObject = this.navParams.data;

	  if(this.paramCnObject!=null && this.paramCnObject.cnNumber!=null && this.paramCnObject.cnNumber!=""){
		  this.cnObject = { cnNumber:this.paramCnObject.cnNumber,
				  selectStatus:this.paramCnObject.selectStatus,
				  receivername:this.paramCnObject.receivername,
				  nric:this.paramCnObject.nric,
				  signature:this.paramCnObject.signature,
				  reason:"",photo:this.paramCnObject.photo,lat:"",lon:"",
				  photofail:"",photoquality:"100"
		  		};
	  }


	  this.form = formBuilder.group({
		  cnNumber:this.cnObject.cnNumber,
		  selectStatus : this.cnObject.selectStatus,
		  receivername:this.cnObject.receivername,
			 nric : this.cnObject.nric,
			 signature: this.cnObject.signature,
			 reason:this.cnObject.reason,
			 photo:this.cnObject.photo,
			 lat:this.cnObject.lat,
			 lon:this.cnObject.lon,
			 photofail:this.cnObject.photofail,
			 photoquality:this.cnObject.photoquality

	  });

	  this.isMain = true;
	  this.isSuccess = false;
	  this.isSignature = false;
	  this.isFail = false;
	  this.isCheck = false;
	  this.isValid = false;
	  this.isPhoto = false;

	  if(this.cnObject.photo==null){
		  this.cnObject.photo="assets/images/signature.png";
	  }else if(this.cnObject.photo==""){
		  this.cnObject.photo="assets/images/signature.png";
	  }

	  if(this.cnObject.photofail==null){
		  this.cnObject.photofail="assets/images/image.png";
	  }else if(this.cnObject.photofail==""){
		  this.cnObject.photofail="assets/images/image.png";
	  }

  }

  ionViewDidLoad(){
	  this.isMain = true;
	  this.isSuccess = false;
	  this.getReasons();
	  if(this.paramCnObject!=null && this.paramCnObject.cnNumber!=null && this.paramCnObject.cnNumber!=""){
		  this.changeSelectStatus();
	  }

  }

  getReasons(){
	  this.post.reasons().then((data)=>{
		  if(data==false){
	  		  this.conn.presentAlert("Error","Cannot Fetch Data From Server");
	  	  }else{
		  this.allreason = data;
		  if(this.allreason.length==0){
			  this.conn.presentAlert("Attention","No Reasons Found");
		  }
	  	  }
	  });
  }


  ionViewDidEnter(){
	  this.initializeBackButtonCustomHandler();
  }


  ionViewDidLeave() {
	    this.unregisterBackButtonAction && this.unregisterBackButtonAction();

	}


  initializeBackButtonCustomHandler() {
      this.unregisterBackButtonAction = this.platform.registerBackButtonAction(()=>{

    	  if(this.isPhoto){
    		  this.isPhoto = false;
    		  this.alert.dismiss();
    	  }else if(this.isSignature){
    		  this.isSignature = false;
      	  }else if(!this.isMain){
    		  this.isMain = true;
    		  this.isSuccess = false;
    		  this.isSignature = false;
    		  this.isFail = false;
      	  }else{
    		  this.navCtrl.parent.select(0);
    	  }
      }, 2);
  }

 public changeSelectStatus(){

	 //alert(this.cnObject.selectStatus);

	  if(this.cnObject.selectStatus=="5"){
		  this.isMain=false;
		  this.isSuccess=true;
		  this.isSignature = false;
		  this.isFail = false;
	  }else if(this.cnObject.selectStatus=="4"){
		  this.isMain=false;
		  this.isSuccess=false;
		  this.isSignature = false;
		  this.isFail = true;
	  }else if(this.cnObject.selectStatus=="3"){
		  this.updateAttempt();
	  }else{
		  this.conn.presentAlert("Attention","Please select status");
	  }
  }

 public updateAttempt(){
	 this.post.updateAttempt(this.cnObject.cnNumber,this.cnObject.selectStatus).then((data)=>{
		 if(data==false){
	  		  this.conn.presentAlert("Error","Cannot Fetch Data From Server");
	  	  }else{
	  		  this.conn.presentAlert("Success","CN has been updated");
	  		  this.clear();
	  	  }
	 });
 }

 public cancelSuccess(){
	  /*this.isMain = true;
	  this.isSuccess = false;
	  this.isSignature = false;
	  this.isFail = false;*/
	 this.clear();
 }

 public updateCN(){
	 this.changeSelectStatus();
 }


 /*public fullscreen(){
	 if(!this.isSignature){
	 this.isSignature = true;
	 this.isMain = false;
	  this.isSuccess = false;
	 }else{
		 this.isSignature = false;
		 this.isMain = false;
		 this.isSuccess = true;
	 }
 }*/

 public openSignaturePage(){
	 //alert(this.cnObject.selectStatus);
	 this.app.getRootNav().push('SignaturePage',{cnObject:this.cnObject});
 }

 public clear(){
	 this.cnObject = {cnNumber:"",selectStatus:"",receivername:"",nric:"",signature:"",
			  reason:"",photo:"assets/images/signature.png",lat:"",lon:"",photofail:"assets/images/image.png",photoquality:"100"};
	 this.isMain = true;
	  this.isSuccess = false;
	  this.isSignature = false;
	  this.isFail = false;
	  this.isValid = false;
	  this.isCheck = false;
 }

 check(){
	 //alert(this.cnObject.cnNumber);
	 if(this.cnObject.cnNumber!=null && this.cnObject.cnNumber==''){
		 this.conn.presentAlert("Attention","Please enter/scan CN No");
	 }else{
		 this.checkRemote();
	 }
 }

 checkRemote(){
	 //085575 - valid
	 //103209 - not assigned
	 //117529 - attemp delivery
	 let data = {runsheet:"",status:""};

	 this.post.checkCN(this.cnObject.cnNumber).then((dataresp)=>{
	  	  if(dataresp==false){
	  		  this.conn.presentAlert("Error","Cannot Fetch Data From Server");
	  	  }else{
	  		  data = dataresp;
	  		  if(data.runsheet=="-1"){
	  			this.conn.presentAlert("Attention",data.status);
	  			this.isCheck = false;
	  			this.isValid = false;
	  		  }else if(data.runsheet=="0"){
	  			this.conn.presentAlert("Attention",data.status);
	  			 this.katL = [
	  				  {id:3,desc:"Attempt delivery"}
	  			  ];
	  			this.isCheck = true;
	  			this.isValid = true;
	  		  }else if(data.runsheet=="1"){
	  			this.conn.presentAlert("Attention",data.status);
	  			this.katL = [
	  			  {id:3,desc:"Attempt delivery"},
	  			  {id:5,desc:"Delivery successful"},
	  			  {id:4,desc:"Delivery unsuccessful"}
	  			  ];
		  			this.isCheck = true;
		  			this.isValid = true;
		  	  }

	  	  }
  });

 }

 public save(){

	 if(this.cnObject.receivername=='' ||
			 this.cnObject.nric=='' ||
			 this.cnObject.photo=="assets/images/signature.png"){
		 this.conn.presentAlert("Attention","All fields are mandatory");
	 }else{
		 this.post.updateSuccess(this.cnObject.cnNumber,this.cnObject.selectStatus,
				 this.cnObject.receivername,
				 this.cnObject.nric,this.cnObject.photo).then((data)=>{

			 let resp:any;// = {status:"0"};
			 if(data==false){
		  		  this.conn.presentAlert("Error","Cannot Fetch Data From Server");
		  	  }else{
		  		  resp = data;
		  		  if(resp.status=="ok"){
		  		  this.conn.presentAlert("Success","CN has been updated");
		  		  this.clear();
		  		  }else{
		  			this.conn.presentAlert("Error","CN failed to be updated");
		  		  }
		  	  }
		 });
	 }

 }

public saveFail(){
	 if(this.cnObject.reason=='' //||
			 //this.cnObject.lat=='' ||
			 //this.cnObject.lon=='' ||
			 //this.cnObject.photofail=="assets/images/image.png"
		 ){
		 this.conn.presentAlert("Attention","Please enter reason");
	 }else{
		 if(this.cnObject.photofail=="assets/images/image.png"){
			 this.saveFailNext2();
		 }else{
		 this.saveFailNext();
		 }
	 }
}

public saveFailNext2(){

	this.post.updateFail(this.cnObject.cnNumber,this.cnObject.selectStatus,
			this.cnObject.reason,this.cnObject.lat,this.cnObject.lon).then((data)=>{

				let resp:any;//{status:"0"};
				 if(data==false){
			  		  this.conn.presentAlert("Error","Cannot Fetch Data From Server");
			  	  }else{
			  		  resp = data;
			  		  if(resp.status=="ok"){
			  		  this.conn.presentAlert("Success","CN has been updated");
			  		  this.clear();
			  		  }else{
			  			this.conn.presentAlert("Error","CN failed to be updated");
			  		  }
			  	  }

			});

}

public saveFailNext(){

	const fileTransfer: FileTransferObject = this.transfer.create();
	let options: FileUploadOptions = {
	    fileKey: 'file',
	    fileName: this.cnObject.cnNumber,
	    chunkedMode: false,
	    mimeType: "image/jpeg",
	    headers: {}
	  }

let url = this.conn.getServerURL()+'upload.jsp';

this.showLoading();
fileTransfer.upload(this.cnObject.photofail, url, options)
.then((datafile) => {
console.log(datafile+" Uploaded Successfully");
this.loading.dismiss();
//this.conn.presentAlert("Success","Image uploaded successfully");

this.post.updateFail(this.cnObject.cnNumber,this.cnObject.selectStatus,
		this.cnObject.reason,this.cnObject.lat,this.cnObject.lon).then((data)=>{

			let resp:any;//{status:"0"};
			 if(data==false){
		  		  this.conn.presentAlert("Error","Cannot Fetch Data From Server");
		  	  }else{
		  		  resp = data;
		  		  if(resp.status=="ok"){
		  		  this.conn.presentAlert("Success","CN has been updated");
		  		  this.clear();
		  		  }else{
		  			this.conn.presentAlert("Error","CN failed to be updated");
		  		  }
		  	  }

		});


}, (err) => {
console.log(err);
this.loading.dismiss();
this.conn.presentAlert("Error","Image failed to be uploaded");
});



 }

 loadMap(){

	 this.showLoading();

	    this.geolocation.getCurrentPosition({ timeout: 60000, enableHighAccuracy: true }).then((position) => {

	      console.log("done getting coordinates");

	      try{
	      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	      this.cnObject.lat = position.coords.latitude;
	      this.cnObject.lon = position.coords.longitude;

	      let mapOptions = {
	        center: latLng,
	        zoom: 15,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        zoomControl: true,
	        mapTypeControl: false,
	        scaleControl: false,
	        streetViewControl: false,
	        rotateControl: false,
	        fullscreenControl: false
	      }

	      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
	      this.addMarker();

	      this.loading.dismiss();

	      }catch(err){
	    	    console.log(err);
		    	this.loading.dismiss();
		    	alert(err.message);
	      }

	    }, (err) => {
	        console.log(err);
	    	this.loading.dismiss();
	    	alert(err.message);

	    });

	  }


 addMarker(){

	  let marker = new google.maps.Marker({
	    map: this.map,
	    animation: google.maps.Animation.DROP,
	    position: this.map.getCenter()
	  });

 }

 showLoading() {
	    this.loading = this.loadingCtrl.create({
	      content: 'Please wait...',
	      dismissOnPageChange: true
	    });
	    this.loading.present();
	  }


 scanBarcode(){
	 this.barcodeScanner.scan().then(barcodeData => {
		 console.log('Barcode data', barcodeData);
		 this.cnObject.cnNumber=barcodeData.text;
		 this.scanSuccess();
		}).catch(err => {
		    console.log('Error', err);
		});
 }

 scanSuccess(){
	 //this.cnObject.receivername="Mohd Rizam";
	 //this.cnObject.nric="780720086595";
	 this.check();
}

takePhoto(sourcetype){


	 const options: CameraOptions = {
			    quality: this.cnObject.photoquality,
			    destinationType: this.camera.DestinationType.FILE_URI,
			    sourceType: sourcetype,
			    targetWidth:300,
			    targetHeight:300,
			    correctOrientation:true
			  };

 this.camera.getPicture(options).then((imageData) => {
	    this.cnObject.photofail = imageData;

	  }, (err) => {
	    console.log(err);
	    alert(err);
	  });


 }


deletePhoto(){
	this.isPhoto = true;
	 this.alert = this.alertCtrl.create({
		    title: 'Remove Picture',
		    enableBackdropDismiss:false,
		    /*inputs: [
		      {
		        name: 'photoquality',
		        placeholder: 'Photo Quality',
		        type: 'number',
		        value : this.cnObject.photoquality
		      }
		    ],*/
		    message: 'Dou you want to remove this picture',
		    buttons: [
		      {
		        text: 'Cancel',
		        handler: data => {
		          //this.cnObject.photoquality = data.photoquality;
		          this.isPhoto = false;
		        }
		      },
		      {
		        text: 'Yes',
		        handler: data => {
		        	//this.cnObject.photoquality = data.photoquality;
		        	this.isPhoto = false;
		        	this.cnObject.photofail="assets/images/image.png";
		        }
		      }
		    ]
		  });
		  this.alert.present();
		}

photo() {

	this.isPhoto = true;

	  this.alert = this.alertCtrl.create({
	    title: 'Take Picture',
	    enableBackdropDismiss:false,
	    /*inputs: [
	      {
	        name: 'photoquality',
	        placeholder: 'Photo Quality',
	        type: 'number',
	        value : this.cnObject.photoquality
	      }
	    ],*/
	    message: 'Choose from',
	    buttons: [
	      {
	        text: 'Gallery',
	        handler: data => {
	          //this.cnObject.photoquality = data.photoquality;
	          this.isPhoto = false;
	          this.takePhoto(0);
	        }
	      },
	      {
	        text: 'Camera',
	        handler: data => {
	        	//this.cnObject.photoquality = data.photoquality;
	        	this.isPhoto = false;
	        	this.takePhoto(1);
	        }
	      }
	    ]
	  });
	  this.alert.present();
	}



}
