







import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error:string="";
  data:any=[];
  btnName:string="Login";
  btnDisable:boolean=false;

  constructor(private _api:ApiService,
              private _route:Router) { }


  ngOnInit(): void {
  }
  
  login(data:any){
  if(data.mobile && data.password){
      this.btnDisable=true;
      this.btnName="loging in.......";
      this.error="";
      this._api.login(data).subscribe((data)=>{
        this.data=data;
        if(this.data.status){
          //localStorage.setItem("user",this.data.userid); 
         localStorage.setItem('user',JSON.stringify(data));
         this._route.navigate(["/post"]);
        }else{
           this.error="Login was unsuccessful";
         }
         this.btnName="Login";
         this.btnDisable=false
      });
    }else{
      this.error="All fields are required";
    }
  }
}
