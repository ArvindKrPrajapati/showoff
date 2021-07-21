






import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute }from '@angular/router';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
 id:any;
 mydata:any=[];
 data:any=[];
 elem:any=[];
 start:number=0;
 loading:boolean=false;
 action:boolean=true;
 nodata:any=[];
 status:string="";
 unfollowing:string="";
 
  constructor(private _api:ApiService,
              private _route:ActivatedRoute) { }


  ngOnInit(): void {
    this.mydata=JSON.parse(localStorage.getItem('user'));
    this.id=this._route.snapshot.params['id'];
    if(this.action){
     this.getData();
    }
  }
  
  
getData(){
   this.action=false;
   this.loading=true;
   this._api.getFollowing(this.id,this.start).subscribe((data:any)=>{
     this.nodata=data[0];
      if(this.nodata.status===false){
        this.status="no more follower";
        this.loading=false;
        this.action=false;
      }else{
        this.data.push(...data);
        this.loading=false;
       this.action=true;
      }
   });
 }
 
handleScroll(event:any):void{
    let top=(event.target as Element).scrollTop;
    this.elem=document.querySelector(".container");
    let height=this.elem.offsetHeight;
      if(window.innerHeight+top>height && this.action){
         this.start+=20;
         this.getData();
        }
        
    }
 handleClick(id:number){
   this.data.find((obj:any)=>{
       if(obj.follow_id==id)
       {
         obj.follow_id="";
         this.unfollowApi(id);
       }
   });
 }
 
 unfollowApi(id){
this.unfollowing="......";
   this._api.unfollow(id).subscribe((data:any)=>{
     this.unfollowing="unfollowed";
   });
 }
 
}
