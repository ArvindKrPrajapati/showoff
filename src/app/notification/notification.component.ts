









import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  myid:any;
  data:any=[];
  loading:boolean=true;
  constructor(private _api:ApiService,
             private _router:Router) { }

  ngOnInit(): void {
    let mydata=localStorage.getItem('user');
    if(mydata){
      this.myid=JSON.parse(mydata).userid;
      this._api.notification(this.myid).subscribe((data:any)=>{
        this.data=data;
        this.loading=false;
      //  alert(JSON.stringify(data))
      });
    }
    
  }
  
  openLink(data:any){
    if(data.f_from){
      this._router.navigate(['/profile',data.f_from],{state:{refresh:false}});       
    }else if(data.comment){
      this._router.navigate(['/comment',data.post_id]);
    }else{
      this._router.navigate(['/showoff',data.post_id]);
    }
  }

}
