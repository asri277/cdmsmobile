import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {SQLite} from 'ionic-native';
import { Platform } from '@ionic-angular';




/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class Database {

private storage: SQLite;
    private isOpen: boolean;
	private maxLine : any;
	statusSelaras : any = 1;


  public constructor(platform: Platform) {

	  platform.ready().then(() => {
	  if(!this.isOpen) {
            this.storage = new SQLite();
            this.storage.openDatabase({name: "data.db", location: "default"}).then(() => {

                this.storage.executeSql("CREATE TABLE IF NOT EXISTS ad_users (id INTEGER PRIMARY KEY AUTOINCREMENT," +
                		"adus_userid INTEGER,adus_nodeid INTEGER,adus_login TEXT, adus_password TEXT, adus_name TEXT,adus_position TEXT)", []);



                this.isOpen = true;
            });
        }

	  });

    }

  public getStorage(){
	  return this.storage;
  }

    public getUser() {
       return new Promise((resolve, reject) => {
    	let people = [];

            this.storage.executeSql("SELECT * FROM ad_users", []).then((data) => {

                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                    	//alert('login:'+data.rows.item(i).adus_login);
                        people.push({
                            id: data.rows.item(i).id,
                            adus_userid: data.rows.item(i).adus_userid,
                            adus_nodeid: data.rows.item(i).adus_nodeid,
                            adus_login:data.rows.item(i).adus_login,
                            adus_name:data.rows.item(i).adus_name,
                            adus_position:data.rows.item(i).adus_position
                        });
                    }
                }

                //return people;
                resolve(people);
            }, (error) => {
               // reject(error);
            	console.log(error);
            	//alert(error);
            	reject(error);
            	 //return people;
            });
        });
    }

    public createUser(data:any,password:any) {
    	//alert('create:'+data.adus_login);
        return new Promise((resolve, reject) => {
            this.storage.executeSql("INSERT INTO ad_users (adus_userid, adus_nodeid,adus_login,adus_password,adus_name,adus_position) VALUES (?, ?,?,?,?,?)",
            		[data.adus_userid, data.adus_nodeid,data.adus_login,password,data.adus_name,data.adus_position]).then((data) => {
                //alert(data);
                resolve(data);
            }, (error) => {
            	console.log(error);
            	//alert(error);
            	reject(error);
            });
        });
    }

    public getCount(sql:any,cond:any){

    	return new Promise((resolve, reject) => {
    	 let output = 0;

            this.storage.executeSql(sql, cond).then((data) => {

                if(data.rows.length > 0) {

                	output = data.rows.item(0).cnt;

                }
                //alert('count:'+sql+'=='+output);
            	//return output;
                resolve(output);
            }, (error) => {
            	console.log(error);
            	//alert(error);
            	reject(error);
            	//return output;
            });
        });

    }

    public resetData(user:any,password:any){
    	return new Promise((resolve, reject) => {
        this.storage.executeSql("delete from ad_users", []).then(()=>{
        	this.createUser(user,password).then((data)=>{
        		resolve(data);
        	},(error)=>{
        			console.log(error);
                	//alert(error);
                	reject(error);
        	});
        });
    	});

    }

    public runAllSQL(data:any,cnt:any,max:any){

    	this.maxLine = max;


    	//alert(cnt+":"+(max-1)+":"+data);

    	return new Promise((resolve, reject) => {
            this.storage.executeSql(data, []).then((dat)=>{

            	//alert("inner:"+cnt+":"+(max-1)+":"+data);
            	console.log(data);
        		resolve(cnt);

            },(error)=>{
            	reject(error);
            });
        	});

    }




    public displayDate(dt:any){
    	if(dt!=null && dt!=''){
    	let date = dt.split('-');
    	return date[2]+'/'+date[1]+'/'+date[0];
    	}else{
    		return '';
    	}
    }

    public displayDateISO(dt:any){
    	//alert('date:'+dt);
    	if(dt!=null && dt!=''){
    	let dt2 = dt.slice(0,10);
    	let date = dt2.split('-');
    	return date[2]+'/'+date[1]+'/'+date[0];
    	}else{
    		return '';
    	}
    }








    public dmlTable(sql:any,ids:any) {
          return new Promise((resolve, reject) => {
              this.storage.executeSql(sql,ids).then((data) => {
                  resolve(data);
              }, (error) => {
                  reject(error);
              });
          });
      }







public getCurrentDate(){
	let upddate = new Date().toISOString();
	return this.displayDateISO(upddate);
}

}
