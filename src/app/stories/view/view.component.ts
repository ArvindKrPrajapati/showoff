





import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../stories.service';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  //image:string="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU";
  id:any;
  start:number=0;
  name:string;
  image:string;
  story_img:string;
  story_count:number;
  data:any=[];
  
  full:string="/api/story/";
  constructor(private stories:StoriesService,
              private _router:Router,
              private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((data)=>{
      this.id=data.get('id');
      this.getData();
    });
  }
  getData(){
    this.stories.getStories(this.id,this.start).subscribe((data:any)=>{
      this.data=data;
     // alert(JSON.stringify(this.data))
      this.name=this.data.name;
      this.image=this.data.image;
      this.story_img=this.data.story_img;
      this.story_count=+this.data.story_count;
      
     // alert(this.story_img)
    });
  }
 next(side:number){
   if(this.story_count===this.start+1){
    this._router.navigate(["/post"],{state:{refresh:false}});
  }
    if(side===0){
      if(this.start!=0){
      this.start-=1;
      }
     }else{
      this.start+=1;
      this.getData();
     }
 }
}
