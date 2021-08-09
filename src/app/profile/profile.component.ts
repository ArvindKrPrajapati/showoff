





import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ApiService } from '../service/api.service';
import { HttpEventType } from '@angular/common/http';  
import { ImageCroppedEvent,base64ToFile } from 'ngx-image-cropper';
import { Location } from '@angular/common';
 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  browserRefresh:any;
 showEditTab:boolean=false;
 id:any;
 data:any=[];
 myid:any;
 mydata:any;
 ev:any=[];
 uploadingProgress:number=0;
 processing:boolean=false;
 path:string="api/image/";
 loading:boolean=false;
 elem:any=[];
 action:boolean=true;
 start:number=0;
 mypost:any=[];
 nodata:any=[];
 status:string="";
 startUpload:boolean=false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  uploading:boolean=false;
  croppedImageFile:any='';
  constructor(private _router:Router,
              private _activatedRoute:ActivatedRoute,
              private _api:ApiService,
              private _location:Location) { 
           this.browserRefresh=this._location.getState(); 
          // alert(localStorage.getItem('user'))
         }

  ngOnInit(): void {
    this.mydata= JSON.parse(localStorage.getItem('user'));
    if(this.mydata){
     this.myid=this.mydata.userid;
    }
    this._activatedRoute.paramMap.subscribe((data)=>{
      this.id=data.get('id');
      if(this.action){
        this.getData();
      }
    });
  }
  
  
  getData():void{
    this.action=false;
    this.loading=true;
    let catcheData;
    if(this.myid==this.id){
       catcheData=JSON.parse(localStorage.getItem('profile'));
    }else{
      catcheData=JSON.parse(sessionStorage.getItem('pro_'+this.id));
    }
    let refresh=this.browserRefresh.refresh!=false;
    if(catcheData && !refresh){
      this.data=catcheData[0];
      this.mypost=catcheData[1];
      this.nodata=catcheData[1][0];
      if(this.nodata.status===false){
         this.status="No post";
         this.mypost=[];
      }
      this.loading=false;
      this.browserRefresh=true;
    }else{
      this._api.getProfile(this.id,this.myid,this.start).subscribe((data:any)=>{
      if(this.myid==this.id){
      localStorage.setItem('profile',JSON.stringify(data));
        }else{
          sessionStorage.setItem('pro_'+this.id,JSON.stringify(data));
        }
        if(this.start==0){
         this.data=data[0];
       }
       this.nodata=data[1][0];
        if(this.nodata.status===false){
         this.status="No post";
         this.loading=false;
         this.action=false;
        }else{
         this.mypost.push(...data[1]);
         this.loading=false;
         this.action=true;
        }
      });
    }
  }
  showEdit():void{
    this.showEditTab=true;
  }
 hideEdit():void{
   this.showEditTab=false;
 }
 logout():void{
   localStorage.clear();
   sessionStorage.clear(); 
    this._router.navigate(['/']);
  }
  
  imageUp(event:any){
    this.imageChangedEvent=event;
    this.startUpload=true;
  }
  
  imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.croppedImageFile = base64ToFile(this.croppedImage);
        this.croppedImageFile.lastModifiedDate = new Date();
        this.croppedImageFile.name =this.imageChangedEvent.target.files[0].name;
    
  }
  
  saveDp():void{
    this.startUpload=false;
    this.uploading=true;
    const date=new Date();
    const now=date.getDate().toString()+date.getMonth().toString()+date.getFullYear().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
    let file=this.croppedImageFile;
    const fd=new FormData();
      fd.append("id",this.myid);
      fd.append("file",file,now+"-"+file.name);
     this._api.uploadDp(fd).subscribe((event)=>{
     this.ev=event;
       if (event.type === HttpEventType.UploadProgress) {
             let progress = Math.round(100 * this.ev.loaded / this.ev.total);
             this.uploadingProgress=progress;
               if(progress==100){
                 this.uploadingProgress=0;
                 this.uploading=false;
                 this.path="";
                 this.data.image=this.croppedImage;
                 this.croppedImage='';
                 this.imageChangedEvent='';
                this.showEditTab=false;
             /*   this.mydata.image=now+"-"+file.name;
                localStorage.setItem('user',JSON.stringify(this.mydata));
               */}
            }
         });
  }
 
 
 doFollow():void{
   this.processing=true;
   let d=JSON.parse(localStorage.getItem('profile'));
   this._api.follow(this.id,this.myid,this.data.followed).subscribe((data:any)=>{
     this.data.followed=!this.data.followed;
     this.processing=false;
     if(this.data.followed){
       this.data.follower+=1;
       if(d){
        d[0].following=d[0].following+=1;
        }
     }else{
       this.data.follower-=1;
       if(d){
        d[0].following=d[0].following-=1;
        }
     }
     localStorage.setItem('profile',JSON.stringify(d));
     let x=[];
     x[0]=this.data;
     x[1]=this.mypost;
     sessionStorage.setItem('pro_'+this.id,JSON.stringify(x));
   });
 }
 
handleScroll(event:any):void{
    let top=(event.target as Element).scrollTop;
    this.elem=document.querySelector(".container");
    let height=this.elem.offsetHeight;
 
     if(window.innerHeight+top>height && this.action){
       this.start+=12;
       this.getData();
      }

  }
 
}
