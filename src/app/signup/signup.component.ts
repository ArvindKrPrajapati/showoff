



import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.css']
})
export class SignupComponent implements OnInit {
  error:string="";
  data:any=[];
  btnName:string="create account";
  btnDisable:boolean=false;
  constructor(private _api:ApiService,
              private _route:Router) { }

  ngOnInit(): void {
  }
 signup(data:any){
  // alert(data.fname+data.mobile+data.password)
   if(data.fname && data.mobile && data.password){
      this.btnDisable=true;
      this.btnName="signing up.......";
     this.error="";
     this._api.signup(data).subscribe((data)=>{
        this.data=data;
        if(this.data.status){
          localStorage.setItem("user",JSON.stringify(data));   
          this._route.navigate(["/post"]);
        }else{
          this.error="sign up was unsuccessful";
        }
        this.btnName="create account";
        this.btnDisable=false;
     });
   }else{
     this.error="All fields are required";
   }
 }
}
