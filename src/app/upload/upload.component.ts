






import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { HttpEventType } from '@angular/common/http';  
import { NgForm } from '@angular/forms';
import { ImageCroppedEvent,base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  

  fileName:any;
  data:any=[];
  ev:any=[];
  uploading:boolean=false;
  uploadingProgress:number=0;
  imgUploaded:any;
  myid:any;
  now:any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedImageFile:any='';
  constructor(private _api:ApiService) { }

  ngOnInit(): void {
    let data=localStorage.getItem('user');
      if(data){
       this.myid=JSON.parse(data).userid;
       
      }
  }
 
      postUpload(event:any){
        this.imgUploaded=null;
        this.imageChangedEvent=event;
       }
       
      imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        
        this.croppedImageFile = base64ToFile(this.croppedImage);
        this.croppedImageFile.lastModifiedDate = new Date();
        this.croppedImageFile.name =this.imageChangedEvent.target.files[0].name;
     }
/*
  postUpload(event:any){
    this.imgUploaded=null;
    if(event.target.files && event.target.files[0]){
      this.postEventObject=event;
      const file=event.target.files[0];
      const reader=new FileReader();
      reader.onload=e=> this.imgsrc=reader.result;
      reader.readAsDataURL(file);
    }

  }*/
  cancel():void{
    this.imageChangedEvent='';
  }
  share():void{
     this.uploading=true;
    const date=new Date();
    this.now=date.getDate().toString()+date.getMonth().toString()+date.getFullYear().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();

    let file=this.croppedImageFile;
    this.fileName=file.name;
    const fd=new FormData();
    fd.append('user',this.myid);
     fd.append("file",file,this.now+"-"+file.name);
    this._api.uploadPost(fd).subscribe((event)=>{
     this.ev=event;
       if (event.type === HttpEventType.UploadProgress) {
             let progress = Math.round(100 * this.ev.loaded / this.ev.total);
             this.uploadingProgress=progress;
               if(progress==100){
                this.cancel();
                this.uploading=false;
                this.uploadingProgress=0;
                this.imgUploaded="Shared successfully...";
               }
            }
         });
  }
}
