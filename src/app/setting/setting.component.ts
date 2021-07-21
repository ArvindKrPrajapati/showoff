





import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
 mydata:any=[];
 newName:any;
 newMobile:any;
 error:string="";
 oldP:any;
 newP:any;
 detailsUpdateStatus:any=[];
 errorP:string="";
 success:string="";
 passwordUpdateStatus:any=[];
 deleteStatus:any=[];
 updatingDetails:boolean=false;
 updatingPass:boolean=false;
 deleting:boolean=false;
  constructor(private _router:Router,
              private _api:ApiService,
              private _dailog:MatDialog) { }


  ngOnInit(): void {
    this.mydata=JSON.parse(localStorage.getItem('user'));
    this.newName=this.mydata.name;
    this.newMobile=this.mydata.mobile;
  }
  logout():void{
    localStorage.removeItem("user");
    this._router.navigate(['/']);
  }
  changeDetails(){
    if(this.newMobile && this.newName){
      this.error="";
      this.updatingDetails=true;
      this._api.changeDetails(this.newName,this.newMobile,this.mydata.userid).subscribe((data:any)=>{
        this.detailsUpdateStatus=data;
        if(this.detailsUpdateStatus.status){
          this.mydata.name=this.newName;
          this.mydata.mobile=this.newMobile;
          localStorage.removeItem('user');
          localStorage.setItem('user',JSON.stringify(this.mydata));
        }else{
          this.openDialog();
        }
        this.updatingDetails=false;
      });
    }else{
      this.error="both fields are required";
    }
  }
  changePassword(){
  if(this.oldP && this.newP)
   {
     this.errorP="";
     this.success="";
    if(this.oldP==this.newP){
      this.errorP="old password and new password must not be same";
    }
    else
    {
      this.errorP="";
      this.updatingPass=true;
      this._api.changePassword(this.oldP,this.newP,this.mydata.userid).subscribe((data:any)=>{
        this.passwordUpdateStatus=data;
        this.errorP="";
        this.success="";
        if(this.passwordUpdateStatus.status){
          this.success="password changes successfully";
          this.oldP="";
          this.newP="";
        }else{
          this.errorP="old password you entered is wrong";
          this.oldP="";
          this.newP="";
        }
        this.updatingPass=false;
      });
    }
   }else{
     this.success="";
     this.errorP="both fields are required";
   }
  }
  
  deleteAccount(){
    this.deleting=true;
    this._api.deleteAccount(this.mydata.userid).subscribe((data:any)=>{
      this.deleteStatus=data;
      if(this.deleteStatus.status)
       {
         this.logout();
         
       }else{
         this.openDialog();
       }
    });
  }
  
  
openDialog() {
    this._dailog.open(DialogElementsExampleDialog);
  }
  
}


@Component({
  selector: 'dialog-elements-example-dialog',
  template: '<small style="color:red;">something went wrong....</small>',
})
export class DialogElementsExampleDialog {}
