





import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../stories.service';
import { HttpEventType } from '@angular/common/http';  


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  mydata:any;
  imgsrc:any='';
  uploading:boolean=false;
  file:File=null;
  ev:any;
  uploadingProgress:number=0;

  constructor(private _stories:StoriesService) {
    this.mydata=JSON.parse(localStorage.getItem('user'));
    }

  ngOnInit(): void {
  }
  
  storyUpload(event:any){
   this.file=event.target.files[0];
    if(event.target.files && event.target.files[0]){
      const file=event.target.files[0];
      const reader=new FileReader();
      reader.onload=e=> this.imgsrc=reader.result;
      reader.readAsDataURL(file);
    }
   }
  
  
  
  addStory(){
    this.uploading=true;
    const date=new Date();
    const now=date.getDate().toString()+date.getMonth().toString()+date.getFullYear().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
    const filename=now+'-'+this.file.name;
    const fd=new FormData();
    fd.append('myid',this.mydata.userid);
    fd.append('file',this.file,filename);
    this._stories.uploadStory(fd).subscribe((event)=>{
     this.ev=event;
         if (event.type === HttpEventType.UploadProgress) {
             let progress = Math.round(100 * this.ev.loaded / this.ev.total);
             this.uploadingProgress=progress;
             if(progress==100){
               this.imgsrc='';
               this.uploadingProgress=0;
               this.uploading=false;
               alert("uploaded..");
             }
           }
         },(error:any)=>{
           alert("error")
         });
  }
  
  
  

}
