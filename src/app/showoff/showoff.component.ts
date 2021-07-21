






import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute ,Router}from '@angular/router';

@Component({
  selector: 'app-showoff',
  templateUrl: './showoff.component.html',
  styleUrls: ['./showoff.component.css']
})
export class ShowoffComponent implements OnInit {
 post_id:any;
 data:any=[];
 liked:boolean=false;
 myid:any;
 loading:boolean=true;
 deleting:boolean=false;
  constructor(private _api:ApiService,
              private _route:ActivatedRoute,
              private _router:Router) { }


  ngOnInit(): void {
    const userdata=localStorage.getItem('user');
    if(userdata){
      this.myid=JSON.parse(userdata).userid;
    }
    this._route.paramMap.subscribe((data)=>{
      this.post_id=data.get('post_id');
      this.getData();
    });
  }
   
  getData(){
    this._api.getSinglePost(this.post_id,this.myid).subscribe((data:any)=>{
      this.data=data;
      this.loading=false;
    });
   }
   
   like(type:number){
     if(type===1){
       if(!this.data.liked){
        this.data.liked=true;
        this._api.doLike(this.post_id,this.myid,true).subscribe((res:any)=>{
          this.data.heart++;
        });
       }
        this.liked=true;
        setTimeout(()=>{
         this.liked=false;
         },500);
    }else{
      this.data.liked=!this.data.liked;
      this._api.doLike(this.post_id,this.myid,this.data.liked).subscribe((data:any)=>{
        if(this.data.liked){
          this.data.heart++;
        }else{
          this.data.heart--;
        }
      });
     
     }
   }
   
   deletePost(post_img){
     this.deleting=true;
     this._api.deletePost(this.post_id,post_img).subscribe((data:any)=>{
      this._router.navigate(['/profile',this.myid],{state:{refresh:false}});
     });
   }
 }
