





import { Component, OnInit ,Input} from '@angular/core';
import { Event, NavigationStart ,NavigationEnd,Router } from '@angular/router';
import { ApiService } from '../../service/api.service';


@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  //image:string="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU";
  @Input() mydata:any;
  lazy:boolean;
  data:any=[];
  mystory:any;
  viewId:any='';
  addstory:boolean=false;
  start:number=0;
  constructor(private _router:Router,
              private _api:ApiService) { 
    this._router.events.subscribe((event:Event)=>{
      if(event instanceof NavigationStart){
        this.lazy=true;
      }else if(event instanceof NavigationEnd){
        this.lazy=false;
      }
    });
  }

  ngOnInit(): void {
    this._api.getStory(this.mydata.userid,this.start).subscribe((data:any)=>{
      this.data=data[1];
      this.mystory=data[0];
    },(error)=>{
      alert('error')
    });
  }

  //to redirect to story page
  go(){
    this.viewId='';
    this.addstory=true;
    this._router.navigate(["/story/add"]);
  }
  goView(id:any){
   // sessionStorage.setItem('seestory',JSON.stringify(story));
    this.addstory=false;
    this.viewId=id;
    this._router.navigate(["/story",id]);
  }
}
