





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
           //alert(this.browserRefresh.refresh)
         }

  ngOnInit(): void {
    const mydata=localStorage.getItem('user');
    if(mydata){
     this.myid=JSON.parse(mydata).userid;
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
   localStorage.removeItem("postdata");
   localStorage.removeItem("profile");
    localStorage.removeItem("user");
    localStorage.removeItem('notification');
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
               }
            }
         });
  }
 
 
 doFollow():void{
   this.processing=true;
   this._api.follow(this.id,this.myid,this.data[0].followed).subscribe((data:any)=>{
     this.data[0].followed=!this.data[0].followed;
     this.processing=false;
     if(this.data[0].followed){
     this.data[0].follower+=1;
     }else{
       this.data[0].follower-=1;
     }
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
