



import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';    
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
 url:string="/api/";
  
 //urllstring="http://localhost:8000/api/"
  
post:any={
  id:1,
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU",
  name:"Arvind Kumar",
  story_count:4,
  story_img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU",
  date_time:"1 hr ago"
};
  constructor(private _http:HttpClient) { }
  
   uploadStory(data:any){
   return this._http.post(this.url+"addStory.php",data,{reportProgress:true,observe:'events',headers: new HttpHeaders({ 'ngsw-bypass': 'true' }) });
  //urlturn this._http.post(this.url+"addStory.php",data,{reportProgress:true,observe:'events'});
  }
  getStories(id:any,start:number){
    return this._http.post(this.url+"singleStory.php",{id:id,start:start});
    //return of(this.post);
  }
}
