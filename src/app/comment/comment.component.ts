




import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute }from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
 comm:any="";
 data:any=[];
 mydata:any;
 id:any;
 empty:boolean=true;
 elem:any=[];
 action:boolean=true;
 loading:boolean=false;
 start:number=0;
 nodata:any=[];
 status:string="";
 
 routeData:any=[];
 poster_id:any;
  constructor(private _api:ApiService,
              private _route:ActivatedRoute) { }

  ngOnInit(): void {
    const userdata=localStorage.getItem('user');
    if(userdata){
      this.mydata=JSON.parse(userdata);
    }
    
    this.id=this._route.snapshot.params['id'];
   if(this.action){
     this.loadData();
   }
  }
  
  loadData():void{
    this.loading=true;
    this.action=false;
    this._api.getComments(this.start,this.id).subscribe((data:any)=>{
        this.nodata=data[0];
      if(this.nodata.status===false){
        this.status="no more data";
        this.loading=false;
        this.action=false;
      }else{
        this.data.push(...data);
        this.loading=false;
       this.action=true;
      }
      
    });
  }

 saveComm(){
   if(this.comm){
     this.empty=true;
     this.data.unshift({id:this.mydata.userid ,image:this.mydata.image,name:this.mydata.name,comment:this.comm});
     this._api.saveComm(this.comm,this.mydata.userid,this.id).subscribe((data:any)=>{
       //alert(JSON.stringify(data))
     });
   }else{
     this.empty=false;
   }
   this.comm="";
 }
 
handleScroll(event:any):void{
    let top=(event.target as Element).scrollTop;
    this.elem=document.querySelector(".container");
    let height=this.elem.offsetHeight;
      if(window.innerHeight+top>height && this.action){
         this.start+=20;
         this.loadData();
        }
    }
}
