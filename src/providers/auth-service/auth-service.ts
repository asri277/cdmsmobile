import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Database} from "../database/database";
import {ConnectionProvider} from "../connection/connection";
import { Http,URLSearchParams } from '@angular/http';

import { Platform,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


 
export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
 
@Injectable()
export class AuthService {
  currentUser: User;
  resp : any;
isLoading:boolean = true;


	constructor(public platform: Platform,
			private storage: Storage,
			private db: Database,
			private plt:ConnectionProvider,
			public http: Http,
			  public loadingCtrl: LoadingController
			  ) {
		/* this.platform.ready().then(() => {,
			  	this.db = new Database();
			  });*/
		this.currentUser = new User("","");
		this.storage.get('uid').then((val) => {
		    console.log('uid is', val);
		    if(val!=null)
		    this.currentUser.email=val;
		  });
		this.storage.get('name').then((val) => {
		    console.log('name is', val);
		    if(val!=null)
		    this.currentUser.name=val;
		  });
	}
	
	public login(credentials) {
		if(this.plt.isOnDevice()){
			return this.loginDB(credentials);
		}else{
			return this.loginWeb(credentials);
		}
	}
	
	public loginDB(credentials){
		
		 return new Promise((resolve, reject) => {
			 
		 
		if (credentials.email === null || credentials.password === null) {
		      reject(false);
		    } else {
		    
		    this.db.getCount('select count(*) as cnt from ad_users where adus_login=? and adus_password=?',[credentials.email,credentials.password])
		    .then((cntuser)=>{
	        //let access = (credentials.password === "pass" && credentials.email === "email");
	        let access:boolean = (cntuser>0);
	        //alert('access:'+access+',cnt:'+cntuser);
	        if(access){
	        	
	        	 //alert('access true');
	        	 
		        // At this point make a request to your backend to make a real check!
		        //alert('obs access true');
		        this.db.getUser().then((nuser)=>{
		        	//alert('get user true');
		    	this.currentUser = new User(nuser[0].adus_name,nuser[0].adus_login);
		        	resolve(true);
		        
	        	
		      });
		      
		    }else{
		   
	        	reject(false);
		    	
		    }
	        
		    });
	        		    
		    }
		
		 });
		
	}
	
	
 
  public loginWeb(credentials) {
	  
	  this.resp = {count:"0",msg:""};
	  return new Promise((resolve, reject) => {
		  
	  
    if (credentials.email === null || credentials.password === null) {
      reject("Please insert credentials");
    } else {
        // At this point make a request to your backend to make a real check!
        //let access = (credentials.password === "pass" && credentials.email === "admin.support");
    	
    	let suid = credentials.email;
    	let spwd = credentials.password;
    	    	
    	this.loginCDMS(suid,spwd,credentials.email).then((data)=>{
        	if(data==false){
  	  			reject("Cannot Fetch Data From Server");
  	  	  }else{
  	  		  this.resp = data;
  	  		  if(this.resp.count=="1"){
  	  			  
  	  	        this.currentUser = new User(credentials.email, credentials.email);
  	  	        this.storage.set('uid',this.currentUser.email);
  	  	        this.storage.set('name',this.currentUser.name);
  	  	        resolve(true);

  	  		  }else{
  	  			  
  	  			if(this.resp.count=="0"){
  	  				this.plt.presentAlert("Error",this.resp.msg);
  	  			}
  	  			resolve(false);
  	  		  }
  	  	  }
        });
        
      
    }
    
	  });
  }
  
  public loginCDMS(username:any,password:any,oriuser:any){ 
	  return new Promise((resolve, reject) => {
		  
		  let url = this.plt.getServerURL()+'json.jsp';
		  let loading:any;
		   if(this.isLoading){
		    loading = this.loadingCtrl.create({content : "Please wait..."});
		    loading.present();
		   }
		   
		   
		   let params = new URLSearchParams();
		   params.set('cmd', '2');
		   params.set('username', encodeURIComponent(username));
		   params.set('password', encodeURIComponent(password));
		   params.set('oriuser', oriuser);
		   
		   
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
 
  
  public getUserInfo() : User {
    return this.currentUser;
  }
  
  public getUsername() : string {
	  	if(this.currentUser!=null){
	    return this.currentUser.email;
	  	}else{
	  		return '';
	  	}
	  }
 
  public logout() {
	  return new Promise((resolve, reject) => {
      this.currentUser = null;
      this.storage.set('uid','');
      this.storage.set('name','');
      resolve(true);
    });
	  
  }
}