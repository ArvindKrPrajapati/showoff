import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  myid:string;
  myImage:string;
  ngOnInit(): void {
    let data=localStorage.getItem('user');
    if(data){
     this.myImage=JSON.parse(data).image;
      this.myid=JSON.parse(data).userid;
    }
  }

}
