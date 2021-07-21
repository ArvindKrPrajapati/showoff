









import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
 
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  myid:any;
  data:any=[];
  browserRefresh:any;   
  loading:boolean=true;
  constructor(private _api:ApiService,
             private _router:Router,
             private _location:Location) { 
            this.browserRefresh=this._location.getState(); 
      }

  ngOnInit(): void {
    let mydata=localStorage.getItem('user');
    if(mydata){
      let catcheData=JSON.parse(localStorage.getItem('notification'));
      let refresh=this.browserRefresh.refresh!=false;
    if(catcheData && !refresh){
      this.data=catcheData;
      this.loading=false;
      this.browserRefresh=true;
    }else{
      this.data=catcheData;
      this.myid=JSON.parse(mydata).userid;
      this._api.notification(this.myid).subscribe((data:any)=>{
        this.data=data;
        this.loading=false;
       localStorage.setItem('notification',JSON.stringify(data));
      });
    }
    }
  }
  
  openLink(data:any){
    if(data.f_from){
      this._router.navigate(['/profile',data.f_from],{state:{refresh:false}});       
    }else if(data.comment){
      this._router.navigate(['/comment',data.post_id],{state:{refresh:false}});
    }else{
      this._router.navigate(['/showoff',data.post_id]);
    }
  }

}
