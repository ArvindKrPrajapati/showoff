


import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';    
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
   //url:string="/api/";
  
  url:string="http://localhost:8000/api/"
  


post:any=[{
  id:1,
  user_id:1,
  follow_id:1,
  name:"Arvind Kumar",
  liked:false,
  heart:400,
  last_comm_name:"akash hari",
  last_comm:"kya be",
  comm:40,
  post_img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU",
  date_time:"1 hr ago"
},{
  id:2,
  user_id:2,
  follow_id:2,
  name:"Arvind Kumar",
  liked:false,
  heart:33,
  last_comm_name:"madhu please",
  last_comm:"hiiiii hiiii",
  comm:5,
  post_img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU",
  date_time:"1 month ago"
},{
  id:3,
  user_id:2,
  follow_id:3,
  name:"Arvind Kumar",
  liked:false,
  heart:4,
  last_comm_name:"pari kumari",
  last_comm:"hehehehe",
  comm:6,
  post_img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU",
  date_time:"just now"
},{
  id:4,
  user_id:1,
  follow_id:4,
  name:"Arvind Kumar",
  liked:true,
  heart:559,
  last_comm_name:"komal",
  last_comm:"😂😂😂",
  comm:7,
  post_img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU",       
  date_time:"28 min ago"
},{
  id:5,
  user_id:2,
  follow_id:5,
  name:"Arvind Kumar",
  liked:true,
  heart:66,   
  last_comm_name:"Abhishek",
  last_comm:"kijiji",
  comm:609,
  post_img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU",
  date_time:"4 sec ago"
},{
  id:6,
  user_id:2,
  follow_id:6,
  name:"Arvind Kumar",
  liked:false,
  heart:6,
  last_comm_name:"anand",
  last_comm:"hello how are you",
  comm:67,
  post_img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU",  
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU",
  date_time:"5 years ago"
}
]

noti:any=[
  {
  user_id:1,
  name:"arvind",
  image:"abc.png",
  post_id:4
},
  {
  user_id:1,
  name:"arvind",
  image:"abc.png",
  post_id:4
},
  {
  user_id:1,
  name:"arvind",
  comment:"hihh I am not able to make",
  image:"abc.png",
  post_id:4
},
  {
  user_id:1,
  name:"arvind",
  comment:"hi i and I am not sure if you have any questions or concerns regarding the above positioni",
  image:"abc.png",
  post_id:4
},
  {
  user_id:1,
  name:"arvind",
  image:"abc.png",
  post_id:4,
  f_from:3
},
  {
  user_id:1,
  name:"arvind",
  image:"abc.png",
  post_id:4,
  f_from:3
},
  {
  user_id:1,
  name:"arvind",
  image:"abc.png",
  post_id:4,
  f_from:3
}

];
mypost:any=[[{status:false}]];
pro:any=[{
  id:1,
  name:"Arvind kumar",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU"
},this.mypost];

constructor(private _http:HttpClient) { }
  
   uploadPost(data:any){
    return this._http.post(this.url+"uploadPost.php",data,{reportProgress:true,observe:'events',headers: new HttpHeaders({ 'ngsw-bypass': 'true' }) });
  }
  
  getPost(start:number,myid:string){
   return this._http.post(this.url+"getPosts.php",{start:start,myid:myid});
    //return of(this.post);
     
  }
  signup(data:any){
    return this._http.post(this.url+"signup.php",{data:data});
  }
  login(data:any){
    return this._http.post(this.url+"login.php",{data:data});
  }
  
  getProfile(id:any,myid:any,start:number){
     return this._http.post(this.url+"profile.php",{id:id,myid:myid,start});
   // return of(this.pro)
  }
  
  uploadDp(data:any){
   return this._http.post(this.url+"uploadDp.php",data,{reportProgress:true,observe:'events',headers: new HttpHeaders({ 'ngsw-bypass': 'true' }) });
  }
  getComments(start:number,postid:any){
    return this._http.post(this.url+"getComments.php",{postid:postid,start:start});
   // return of(this.post);
  }
  doLike(id:any,myid:string,state:boolean){
    return this._http.post(this.url+"doLike.php",{id:id,myid:myid,state:state});
  }
  saveComm(comm:any,myid:any,id:any){
    return this._http.post(this.url+"saveComm.php",{comm:comm,myid:myid,id:id});
  }
  search(data:any){
    return this._http.post(this.url+"search.php",{search:data});
    //return of(this.post);
  }
  notification(myid:any){
    return this._http.post(this.url+"notification.php",{myid:myid});
   // return of(this.noti);
  }
  
  follow(to:any,from:any,state:boolean){
    return this._http.post(this.url+"follow.php",{to:to,from:from,state:state});
  }
  deletePost(post_id:any,image:any){
    return this._http.post(this.url+"deletePost.php",{post_id:post_id,image:image});
  }
  getSinglePost(post_id:any,myid:any){
    return this._http.post(this.url+"getSinglePost.php",{post_id:post_id,myid:myid});
  }
  getFollower(id:any,start:number){
   return this._http.post(this.url+"getFollower.php",{id:id,start:start});
    //return of(this.post);
  }
  getFollowing(id:any,start:number){
   return this._http.post(this.url+"following.php",{id:id,start:start});
    //return of(this.post);
  }
  
  changeDetails(name:string,mobile:number,id:number){
    return this._http.post(this.url+"changeDetails.php",{name:name,mobile: mobile,id:id});
  }
  changePassword(oldP:any,newP:any,id:number){
    return this._http.post(this.url+"changePassword.php",{oldP:oldP,newP:newP,id:id});
  }
  deleteAccount(id:number){
    return this._http.post(this.url+"deleteAccount.php",{id:id});
  }
  unfollow(id:number){
    return this._http.post(this.url+"unfollow.php",{id:id});
  }
}
