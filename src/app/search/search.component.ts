







import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search:any;
  data:any=[];
  searchedData:any=[];
  constructor(private _api:ApiService,
              private _route:Router) { }

  ngOnInit(): void {
   //localStorage.removeItem('searched')
    let someData=JSON.parse(localStorage.getItem('searched'));
    if(someData){
      this.searchedData=someData;
    }
    this.data=someData;
  }

  onSearch(){
    this._api.search(this.search).subscribe((data:any)=>{
      this.data=data;
    });
  }
  
  searched(data:any){
    if(!this.searchedData.find(o=>o.id==data.id)){
      this.searchedData.unshift(data);
      localStorage.setItem('searched',JSON.stringify(this.searchedData));
    }
      this._route.navigate(["/profile",data.id],{state:{refresh:false}});
  }
}
