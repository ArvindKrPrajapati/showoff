







import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  elem:any=[];
  mydata:any;
  action:boolean=true;
  start:number=0;
  data:any=[];
  loading:boolean=true;
  
  constructor(private _api:ApiService,
             private _route:Router) { 
    this.mydata=JSON.parse(localStorage.getItem('user'));     
  }

  ngOnInit(): void {
    if(this.action){
     this.getData(); 
    }
  }
  
  getData():void{ 
    this.action=false;
    this.loading=true;
   this._api.getPeople(this.mydata.userid,this.start).subscribe((data:any)=>{
     this.data.push(...data);
     this.loading=false;
     this.action=true;
   });
  }
  
  
  handleScroll(event:any):void{
    let top=(event.target as Element).scrollTop;
    this.elem=document.querySelector(".container");
    let height=this.elem.offsetHeight;
     if(window.innerHeight+top>height && this.action){
       this.start+=15;
      this.getData();
      }
  }
  
  go(id:any){
     this._route.navigate(["/profile",id],{state:{refresh:false}});
  }
}
