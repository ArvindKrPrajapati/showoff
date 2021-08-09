






import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Location } from '@angular/common';
 
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  browserRefresh:any;   
  constructor(private _api:ApiService,
              private _location:Location) {
        this.browserRefresh=this._location.getState(); 
      }
              
image:any="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU";  
 
posts:any=[];
welcome:boolean=false;
 mydata:any;
  loading:boolean=false;
  myid:any;
  elem:any=[];
  action:boolean=true;
  start:number=0;
  deletingPostId:any;
  liked:boolean=false;
  nodata:any=[];
  status:any="";
   imgLoad:boolean=true;
   deleteMsg:string="";
   menu:boolean=false;
   showDeleteBtn:boolean=false;
   post_id:any;
   deleteImg:any;
   deleteResponse:any=[];
   
  ngOnInit(): void {
     this.mydata=JSON.parse(localStorage.getItem('user'));
    if(this.mydata){
      this.myid=this.mydata.userid;
    }
    if(this.action){
     this.loadData(); 
    }
   }
   
   onload():void{
     this.imgLoad=false;
   }
 loadData():void{
   this.loading=true;
   this.action=false;
   let catcheData=JSON.parse(localStorage.getItem('postdata'));
      let refresh=this.browserRefresh.refresh!=false;
    if(catcheData && !refresh){
      this.posts=catcheData;
      this.loading=false;
      this.browserRefresh=true;
    }else{
      if(this.start===0){
        this.posts=catcheData;
      }
     this._api.getPost(this.start,this.myid).subscribe((data:any)=>{
     this.nodata=data[0];
      if(this.start===0 && this.nodata.status===false)
       {
         this.showUsersToFollow();
       }
      if(this.nodata.status===false){
        this.status="no more data";
        this.loading=false;
        this.action=false;
      }else{
        if(this.start===0){
          this.posts=[];
        }
        
        this.posts.push(...data);
       localStorage.setItem('postdata',JSON.stringify(this.posts));
        this.loading=false;
       this.action=true;
      }
      
    },(error:any)=>{
      //  alert("unable to connect to server..")
    });
    }
 }
   

  handleScroll(event:any):void{
    let top=(event.target as Element).scrollTop;
    this.elem=document.querySelector("#container");
    let height=this.elem.offsetHeight;
 
     if(window.innerHeight+top>height && this.action){
       this.start+=5;
       this.loadData();
      }
  }
  
  like(id:any){
  this.posts.find((obj:any)=>{
     if(obj.id==id){
       obj.liked=!obj.liked;
       if(obj.liked){
         this.liked=true;
         obj.heart+=1;
         this.likeApi(id,true);
       }else{
         this.liked=false;
         obj.heart-=1;
         this.likeApi(id,false);
       }
     }
     localStorage.setItem('postdata',JSON.stringify(this.posts));
   });
    
    this.post_id=id;
    setTimeout(()=>{
      this.liked=false;
    },400);
  }
  
  likeApi(id:any,state:boolean){
      this._api.doLike(id,this.myid,state).subscribe((data:any)=>{
        //like successful
      });
  }
  
  showMenu(post_id:any,user_id:any,image:any){
   this.menu=!this.menu;
    this.deletingPostId=post_id;
    this.deleteImg=image;
    this.showDeleteBtn=(user_id==this.myid);

  }
  
  deletePost():void{
    this.deleteMsg="deleting..............";
     this._api.deletePost(this.deletingPostId,this.deleteImg).subscribe((data:any)=>{
      this.deleteMsg="deleted";
      this.deleteResponse=data;
      setTimeout(()=>{
      this.deleteMsg="";
      },1000);
     });
  this.posts= this.posts.filter(allpost=>allpost.id!=this.deletingPostId);
  localStorage.setItem('postdata',JSON.stringify(this.posts));
  }
  
  showUsersToFollow():void{
    this.posts=[];
    localStorage.removeItem('postdata');
    this.welcome=true;
  }
}
